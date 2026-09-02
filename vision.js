// ============================================================
// NAVBAR SCROLL EFFECT
// ============================================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================================
// MOBILE MENU TOGGLE
// ============================================================
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    mobileMenu.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        navLinks.classList.remove('active');
        mobileMenu.setAttribute('aria-expanded', 'false');
    });
});

// ============================================================
// SET CURRENT YEAR IN FOOTER
// ============================================================
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ============================================================
// SCROLL ANIMATIONS — Vision Stats & Pillar Features
// ============================================================
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Animate vision stats
document.querySelectorAll('.vision-stat').forEach(stat => {
    observer.observe(stat);
});

// Animate pillar features
document.querySelectorAll('.pillar-feature').forEach(feature => {
    observer.observe(feature);
});

// ============================================================
// DONATE MODAL
// ============================================================
document.querySelectorAll('a[href="#donate"]').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.85);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            padding: 20px;
            backdrop-filter: blur(10px);
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
        document.body.style.overflow = 'hidden';

        document.getElementById('closeModal').addEventListener('click', function() {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }
        });
    });
});