// api/subscribe.js
// Place this file in your /api folder in your Vercel project

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { firstName, email } = req.body;

  // Validate input
  if (!firstName || !email) {
    return res.status(400).json({ error: 'First name and email are required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // MailerLite API configuration
    const MAILERLITE_API_KEY = process.env.MAILERLITE_API_KEY;
    const MAILERLITE_GROUP_ID = process.env.MAILERLITE_GROUP_ID; // Your group ID
    
    if (!MAILERLITE_API_KEY) {
      console.error('MAILERLITE_API_KEY not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    if (!MAILERLITE_GROUP_ID) {
      console.error('MAILERLITE_GROUP_ID not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // MailerLite API endpoint - Using the NEW API v2
    const apiUrl = `https://connect.mailerlite.com/api/subscribers`;

    const subscriberData = {
      email: email,
      fields: {
        name: firstName
      },
      groups: [MAILERLITE_GROUP_ID], // This assigns to your group AND triggers automation
      status: 'active' // Make sure they're active
    };

    console.log('Sending to MailerLite:', { email, firstName, groupId: MAILERLITE_GROUP_ID });

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(subscriberData)
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error('MailerLite error:', responseData);
      
      // Check if subscriber already exists
      if (response.status === 422 || responseData.message?.includes('already exists')) {
        // Try to update existing subscriber and add to group
        const updateUrl = `https://connect.mailerlite.com/api/subscribers/${email}`;
        
        const updateResponse = await fetch(updateUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${MAILERLITE_API_KEY}`,
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            fields: {
              name: firstName
            },
            groups: [MAILERLITE_GROUP_ID]
          })
        });

        if (updateResponse.ok) {
          console.log('Subscriber updated successfully');
          return res.status(200).json({ 
            success: true, 
            message: 'Subscription updated successfully' 
          });
        } else {
          const updateError = await updateResponse.json();
          console.error('Update error:', updateError);
          return res.status(500).json({ error: 'Failed to update subscription' });
        }
      }
      
      return res.status(response.status).json({ 
        error: responseData.message || 'Failed to subscribe' 
      });
    }

    console.log('MailerLite success:', responseData);

    return res.status(200).json({ 
      success: true, 
      message: 'Subscription successful',
      data: responseData 
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
}
