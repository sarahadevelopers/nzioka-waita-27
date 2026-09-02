// Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        
        // Mobile menu toggle
        const mobileMenu = document.getElementById('mobile-menu');
        const navLinks = document.querySelector('.nav-links');
        
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
        
        // Set current year in footer
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        
        // Contact form submission handling
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            
            // In a real implementation, you would send this data to a server
            // For this demo, we'll just show a success message
            
            formMessage.style.display = 'block';
            formMessage.innerHTML = `
                <div style="background-color: #d1fae5; color: #065f46; padding: 15px; border-radius: 5px; border-left: 4px solid var(--emerald);">
                    <h4 style="margin-bottom: 10px; color: #065f46;">Message Sent Successfully!</h4>
                    <p>Thank you, ${name}. Your message about "${subject}" has been received. We'll respond to you at ${email} within 24-48 hours.</p>
                    <p style="margin-top: 10px; font-size: 0.9rem;">For urgent matters, please call us directly at <a href="tel:+254727329860" style="color: #065f46; font-weight: bold;">+254 727 329 860</a>.</p>
                </div>
            `;
            
            // Reset form
            contactForm.reset();
            
            // Scroll to show message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide message after 10 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 10000);
        });
        
        // Add animation to contact details when they come into view
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Animate contact details
        document.querySelectorAll('.contact-detail').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            observer.observe(item);
        });
        
        // Animate social link items
        document.querySelectorAll('.social-link-item').forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            const itemObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);
            
            itemObserver.observe(item);
        });
        
        // Donate button functionality
        document.querySelector('a[href="#donate"]').addEventListener('click', function(e) {
            e.preventDefault();
            
            // Create a modal for donation
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 2000;
            `;
            
            modal.innerHTML = `
            <div style="background: white; padding: 40px; border-radius: 20px; max-width: 550px; width: 100%; position: relative; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);">
                <button id="closeModal" style="position: absolute; top: 15px; right: 20px; background: none; border: none; font-size: 2rem; cursor: pointer; color: #6b7280; transition: color 0.3s ease;">&times;</button>
                <h2 style="color: #111827; margin-bottom: 20px; font-size: 1.8rem; text-align: center;">Support Our Campaign</h2>
                <p style="color: #6b7280; margin-bottom: 25px; text-align: center; font-size: 1.05rem; line-height: 1.6;">Your contribution helps us reach more voters, organize events, and build a better Machakos. Every shilling makes a difference.</p>

                <div style="margin-bottom: 25px;">
                    <h3 style="color: #111827; margin-bottom: 15px; font-size: 1.2rem; display: flex; align-items: center; gap: 10px;"><i class="fas fa-mobile-alt" style="color: #179847;"></i> M-Pesa Payment</h3>
                    <div style="background: #f8fafc; padding: 18px; border-radius: 12px; border-left: 4px solid #179847;">
                        <p style="margin-bottom: 10px; font-weight: 600;">Paybill Number: <span style="color: #179847; font-size: 1.2rem;">XXXXXX</span></p>
                        <p style="margin-bottom: 10px; font-weight: 600;">Account Number: <span style="color: #179847; font-size: 1.2rem;">NZIOKAWAITA</span></p>
                        <p style="color: #6b7280; font-size: 0.95rem;">Send any amount via M-Pesa to support our campaign</p>
                    </div>
                </div>

                <div style="margin-bottom: 30px;">
                    <h3 style="color: #111827; margin-bottom: 15px; font-size: 1.2rem; display: flex; align-items: center; gap: 10px;"><i class="fas fa-university" style="color: #fcb900;"></i> Bank Transfer</h3>
                    <div style="background: #f8fafc; padding: 18px; border-radius: 12px; border-left: 4px solid #fcb900;">
                        <p style="margin-bottom: 8px;"><strong>Bank:</strong> Equity Bank</p>
                        <p style="margin-bottom: 8px;"><strong>Account Name:</strong> Nzioka Waita Campaign Fund</p>
                        <p style="margin-bottom: 8px;"><strong>Account Number:</strong> xxxx xxxx xxxx</p>
                        <p style="margin-bottom: 8px;"><strong>Branch:</strong> Machakos Town</p>
                        <p style="margin-bottom: 8px;"><strong>Swift Code:</strong> EQBLKENA</p>
                    </div>
                </div>

                <p style="color: #6b7280; font-size: 0.85rem; text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">All donations are recorded and reported in accordance with Kenyan election laws. We are committed to transparency in campaign financing.</p>
            </div>
        `;
            
            document.body.appendChild(modal);
            
            // Close modal when X is clicked
            document.getElementById('closeModal').addEventListener('click', function() {
                document.body.removeChild(modal);
            });
            
            // Close modal when clicking outside
            modal.addEventListener('click', function(e) {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
        });