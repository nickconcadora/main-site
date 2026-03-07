// Universal header for TTW Enterprises
// Include this file in any page with: <script src="header.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    // Create header HTML
    const headerHTML = `
        <style>
            /* Navigation */
            nav {
                background: rgba(10, 10, 10, 0.95);
                border-bottom: 2px solid #c41e3a;
                padding: 1rem;
                position: sticky;
                top: 0;
                z-index: 100;
                backdrop-filter: blur(10px);
            }

            .nav-container {
                max-width: 1200px;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            .logo {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: clamp(1.1rem, 4vw, 1.5rem);
                font-weight: bold;
                color: #ffd700;
                text-decoration: none;
            }

            .logo span {
                color: #c41e3a;
            }

            .nav-links {
                display: flex;
                gap: 1.5rem;
                list-style: none;
            }

            .nav-links a {
                color: #f5f5f5;
                text-decoration: none;
                font-weight: 500;
                font-size: clamp(0.9rem, 2vw, 1rem);
                transition: all 0.3s ease;
                position: relative;
                white-space: nowrap;
            }

            .nav-links a:hover {
                color: #ffd700;
            }

            .nav-links a::after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 0;
                width: 0;
                height: 2px;
                background: #c41e3a;
                transition: width 0.3s ease;
            }

            .nav-links a:hover::after {
                width: 100%;
            }

            /* Hamburger Menu */
            .hamburger {
                display: none;
                flex-direction: column;
                gap: 5px;
                background: none;
                border: none;
                cursor: pointer;
                padding: 5px;
            }

            .hamburger span {
                width: 25px;
                height: 3px;
                background: #ffd700;
                transition: all 0.3s ease;
            }

            .hamburger.active span:nth-child(1) {
                transform: rotate(45deg) translate(8px, 8px);
            }

            .hamburger.active span:nth-child(2) {
                opacity: 0;
            }

            .hamburger.active span:nth-child(3) {
                transform: rotate(-45deg) translate(7px, -6px);
            }

            @media (max-width: 768px) {
                .hamburger {
                    display: flex;
                }

                .nav-links {
                    position: fixed;
                    top: 70px;
                    right: -100%;
                    flex-direction: column;
                    background: rgba(10, 10, 10, 0.98);
                    width: 100%;
                    max-width: 300px;
                    padding: 2rem;
                    gap: 1.5rem;
                    border-left: 2px solid #c41e3a;
                    transition: right 0.3s ease;
                    box-shadow: -5px 0 20px rgba(0, 0, 0, 0.5);
                }

                .nav-links.active {
                    right: 0;
                }

                .nav-links a {
                    font-size: 1.1rem;
                    padding: 0.5rem 0;
                }
            }

            @media (max-width: 480px) {
                nav {
                    padding: 0.75rem;
                }

                .logo {
                    font-size: 1rem;
                }

                .nav-links {
                    top: 60px;
                }
            }
        </style>
        <nav>
            <div class="nav-container">
                <a href="index.html" class="logo">
                    <span>TTW</span> ENTERPRISES
                </a>
                <button class="hamburger" id="hamburger" aria-label="Toggle menu">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <ul class="nav-links" id="navLinks">
                    <li><a href="index.html#audit">Discovery Call</a></li>
                    <li><a href="email-subject-lines.html">Free Guide</a></li>
                    <li><a href="reviews.html">Reviews</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </div>
        </nav>
    `;

    // Insert header at the beginning of body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);

    // Add mobile menu functionality
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }
});
