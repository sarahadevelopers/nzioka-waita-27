// ============================================================
// NAVBAR SCROLL EFFECT
// ============================================================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
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
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    navLinks.classList.toggle('active');
    const isOpen = navLinks.classList.contains('active');
    mobileMenu.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu when clicking on a link
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
// STATS COUNTER ANIMATION
// ============================================================
const statNumbers = document.querySelectorAll('.stat-number');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const target = parseInt(statNumber.getAttribute('data-count'));

            if (target) {
                let count = 0;
                const increment = target / 40;

                const updateCount = () => {
                    if (count < target) {
                        count += increment;
                        statNumber.textContent = Math.ceil(count);
                        setTimeout(updateCount, 50);
                    } else {
                        statNumber.textContent = target;
                    }
                };
 
                updateCount();
            }
            observer.unobserve(statNumber);
        }
    });
}, observerOptions);

statNumbers.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-count'));
    if (target) {
        stat.textContent = '0';
        observer.observe(stat);
    }
});

// ============================================================
// COUNTDOWN TIMER TO 2027 ELECTIONS
// ============================================================
function updateCountdown() {
    const electionDate = new Date('August 9, 2027 00:00:00').getTime();
    const now = new Date().getTime();
    const timeLeft = electionDate - now;

    if (timeLeft < 0) {
        document.querySelector('.countdown').innerHTML = '<h3 style="color: var(--gold);">The 2027 Elections Have Arrived!</h3>';
        return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(3, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown();

// ============================================================
// HERO BACKGROUND SLIDESHOW
// ============================================================
const heroBg = document.querySelector('.hero-bg');

const heroImages = [
    'image - 2026-01-25T151321.227.webp',
    'image - 2026-01-25T152034.791.webp',
    'image - 2026-01-25T152312.671.webp',
];

let currentIndex = 0;

function changeHeroBackground() {
    heroBg.style.backgroundImage = `
        linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.6)),
        url('${heroImages[currentIndex]}')
    `;
    currentIndex = (currentIndex + 1) % heroImages.length;
}

changeHeroBackground();
setInterval(changeHeroBackground, 8000);

// ============================================================
// SCROLL ANIMATIONS — All Cards & Sections
// ============================================================
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
}, { threshold: 0.1 });

// Observe all animated elements
document.querySelectorAll('.vision-card, .policy-card, .news-card, .voice-card, .impact-slide, .meet-grid').forEach(el => {
    scrollObserver.observe(el);
});

// ============================================================
// IMPACT SECTION SWIPER — Premium Swipeable Cards
// ============================================================
const impactSwiper = new Swiper('.impactSwiper', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: false,
    grabCursor: true,
    loop: false,
    autoplay: {
        delay: 5000,
        disableOnInteraction: true,
    },
    pagination: {
        el: '.impactSwiper .swiper-pagination',
        clickable: true,
        dynamicBullets: false,
    },
    navigation: {
        nextEl: '.impactSwiper .swiper-button-next',
        prevEl: '.impactSwiper .swiper-button-prev',
    },
    breakpoints: {
        640: {
            slidesPerView: 1.5,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 2.2,
            spaceBetween: 24,
        },
        1024: {
            slidesPerView: 3.2,
            spaceBetween: 28,
        },
        1200: {
            slidesPerView: 3.5,
            spaceBetween: 30,
        },
    },
});

// Pause autoplay on hover (desktop)
document.querySelector('.impactSwiper')?.addEventListener('mouseenter', function() {
    impactSwiper.autoplay.stop();
});

document.querySelector('.impactSwiper')?.addEventListener('mouseleave', function() {
    impactSwiper.autoplay.start();
});

// ============================================================
// DONATE MODAL
// ============================================================
document.querySelectorAll('a[href="#donate"]').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();

        // Create a modal for donation
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
                        <p style="margin-bottom: 10px; font-weight: 600;">Paybill Number: <span style="color: #179847; font-size: 1.2rem;">247247</span></p>
                        <p style="margin-bottom: 10px; font-weight: 600;">Account Number: <span style="color: #179847; font-size: 1.2rem;">NZIOKAWAITA</span></p>
                        <p style="color: #6b7280; font-size: 0.95rem;">Send any amount via M-Pesa to support our campaign</p>
                    </div>
                </div>

                <div style="margin-bottom: 30px;">
                    <h3 style="color: #111827; margin-bottom: 15px; font-size: 1.2rem; display: flex; align-items: center; gap: 10px;"><i class="fas fa-university" style="color: #fcb900;"></i> Bank Transfer</h3>
                    <div style="background: #f8fafc; padding: 18px; border-radius: 12px; border-left: 4px solid #fcb900;">
                        <p style="margin-bottom: 8px;"><strong>Bank:</strong> Equity Bank</p>
                        <p style="margin-bottom: 8px;"><strong>Account Name:</strong> Nzioka Waita Campaign Fund</p>
                        <p style="margin-bottom: 8px;"><strong>Account Number:</strong> 0760 1234 5678</p>
                        <p style="margin-bottom: 8px;"><strong>Branch:</strong> Machakos Town</p>
                        <p style="margin-bottom: 8px;"><strong>Swift Code:</strong> EQBLKENA</p>
                    </div>
                </div>

                <p style="color: #6b7280; font-size: 0.85rem; text-align: center; padding-top: 20px; border-top: 1px solid #e5e7eb;">All donations are recorded and reported in accordance with Kenyan election laws. We are committed to transparency in campaign financing.</p>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Close modal when X is clicked
        document.getElementById('closeModal').addEventListener('click', function() {
            document.body.removeChild(modal);
            document.body.style.overflow = 'auto';
        });

        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            }
        });
    });
});