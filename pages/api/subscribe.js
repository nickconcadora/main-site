export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { firstName, email, recaptcha_token } = req.body

  if (!firstName?.trim() || !email?.trim()) {
    return res.status(400).json({ error: 'First name and email are required' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' })
  }

  // Verify reCAPTCHA - required, not optional
  if (!recaptcha_token) {
    return res.status(400).json({ error: 'Verification required' })
  }

  const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY
  if (!RECAPTCHA_SECRET_KEY) {
    console.error('RECAPTCHA_SECRET_KEY not configured')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  try {
    const verifyResponse = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptcha_token}`,
      { method: 'POST' }
    )
    const verifyData = await verifyResponse.json()

    if (!verifyData.success || verifyData.score < 0.5) {
      return res.status(400).json({ error: 'Verification failed. Please try again.' })
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return res.status(500).json({ error: 'Verification service error' })
  }

  const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY
  const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID

  if (!MAILERLITE_API_KEY || !MAILERLITE_GROUP_ID) {
    console.error('MailerLite not configured')
    return res.status(500).json({ error: 'Server configuration error' })
  }

  try {
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        fields: { name: firstName },
        groups: [MAILERLITE_GROUP_ID],
        status: 'active',
      }),
    })

    const responseData = await response.json()

    if (!response.ok) {
      // Handle "already subscribed" gracefully
      if (response.status === 422 || responseData.message?.includes('already exists')) {
        const updateResponse = await fetch(`https://connect.mailerlite.com/api/subscribers/${email}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            fields: { name: firstName },
            groups: [MAILERLITE_GROUP_ID],
          }),
        })

        if (updateResponse.ok) {
          return res.status(200).json({ success: true, message: 'Subscription updated successfully' })
        }
        return res.status(500).json({ error: 'Failed to update subscription' })
      }
      return res.status(response.status).json({ error: responseData.message || 'Failed to subscribe' })
    }

    return res.status(200).json({ success: true, message: 'Subscription successful' })
  } catch (error) {
    console.error('Subscription error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
