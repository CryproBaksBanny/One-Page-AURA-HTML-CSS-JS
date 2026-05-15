tsParticles.load("tsparticles", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#d4af37" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#d4af37",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" }, /* Частинки тягнуться до мишки */
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            grab: { distance: 200, line_linked: { opacity: 1 } }
        }
    },
    retina_detect: true
});

window.addEventListener('scroll', () => {
    const section = document.querySelector('.process-section');
    const line = document.querySelector('.line-progress');
    const steps = document.querySelectorAll('.step-item');
    
    if (!section || !line) return;

    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const center = windowHeight / 2;

    // Рахуємо шлях від центру екрана до верху секції
    let currentScroll = center - rect.top;
    
    // Щоб лінія доходила до кінця точно, рахуємо прогрес відносно 
    // відстані між першою та останньою точкою
    let totalHeight = rect.height - 100; // невеликий відступ знизу
    let progress = (currentScroll / totalHeight) * 100;

    progress = Math.min(Math.max(progress, 0), 100);
    line.style.height = progress + '%';

    steps.forEach((step) => {
        const stepRect = step.getBoundingClientRect();
        // Крок стає активним, коли його середина перетинає лінію центру екрана
        if (stepRect.top + (stepRect.height / 2) < center) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.testi-card-v2');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // 1. Знайти поточну активну карту і прибрати клас
            const currentActive = document.querySelector('.testi-card-v2.active');
            if (currentActive && currentActive !== card) {
                currentActive.classList.remove('active');
            }

            // 2. Додати клас до карти, на яку клікнули
            card.classList.add('active');
        });
    });
});

const burgerBtn = document.querySelector('.burger-btn');
const navMenu = document.querySelector('.nav-menu');

burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Забороняємо скрол фону, коли меню відкрите
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
});

// Закриваємо меню при натисканні на посилання
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        burgerBtn.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

function handleModal(element) {
    console.log("Функція працює!"); 
    
    const modal = document.getElementById('project-modal');
    if (!modal) {
        console.error("Помилка: Елемент project-modal не знайдено!");
        return;
    }

    // Заповнюємо дані
    document.getElementById('modal-img').src = element.getAttribute('data-img');
    document.getElementById('modal-title').innerText = element.getAttribute('data-title');
    document.getElementById('modal-desc').innerText = element.getAttribute('data-desc');

    // Показуємо
    modal.style.display = 'flex';
}

function closeModal() {
    document.getElementById('project-modal').style.display = 'none';
}