document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('sort-select');
    const cards = document.querySelectorAll('.provider-card');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    // Close mobile menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
        });
    });

    // Filter
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            cards.forEach(card => {
                if (filter === 'all') {
                    card.classList.remove('hidden');
                } else {
                    const categories = card.dataset.categories.split(',');
                    card.classList.toggle('hidden', !categories.includes(filter));
                }
            });
        });
    });

    // Sort
    sortSelect.addEventListener('change', () => {
        const value = sortSelect.value;
        const container = document.querySelector('.providers .container');
        const cardsArray = Array.from(cards);

        cardsArray.sort((a, b) => {
            if (value === 'rank') {
                return parseInt(a.dataset.rank) - parseInt(b.dataset.rank);
            } else if (value === 'price-asc') {
                return parseInt(a.dataset.price) - parseInt(b.dataset.price);
            } else if (value === 'price-desc') {
                return parseInt(b.dataset.price) - parseInt(a.dataset.price);
            }
            return 0;
        });

        cardsArray.forEach(card => container.appendChild(card));
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') return;

            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 16;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // Animate cards on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});
