const navigationToggler = document.querySelector('.navigation__lines');
const navigationBackground = document.querySelector('.navigation__background');
const navigationLink = document.querySelectorAll('.navigation__link');

const navigationActive = () => {
    gsap.to('.navigation__background', {
        width: '125vw',
        height: '200vh',
        duration: 0.8,
        ease: 'power4.out',
    });
    gsap.to('.navigation__line--1', {
        top: '5rem',
        rotate: '135deg',
        duration: 0.3,
    });
    gsap.to('.navigation__line--2', {
        opacity: 0,
        duration: 0.3,
    });
    gsap.to('.navigation__line--3', {
        top: '5rem',
        rotate: '-135deg',
        duration: 0.3,
    });
    gsap.to('.navigation__item', {
        x: '70vw',
        opacity: 1,
        pointerEvents: 'all',
        stagger: 0.1,
        duration: 0.5,
    });
};

const navigationInactive = () => {
    gsap.to('.navigation__background', {
        width: 0,
        height: 0,
        duration: 0.8,
        ease: 'power2.in',
    });
    gsap.to('.navigation__line--1', {
        top: '3.5rem',
        rotate: '0',
        duration: 0.3,
    });
    gsap.to('.navigation__line--2', {
        opacity: 1,
        duration: 0.3,
    });
    gsap.to('.navigation__line--3', {
        top: '6.5rem',
        rotate: '0',
        duration: 0.3,
    });
    gsap.to('.navigation__item', {
        x: '160rem',
        opacity: 0,
        pointerEvents: 'none',
        stagger: -0.1,
        duration: 0.5,
    });
};

navigationToggler.addEventListener('click', () => {
    gsap.to('.navigation__tool-tip', { opacity: 0, x: -100, duration: 0.5 });
    navigationBackground.classList.toggle('navigation--active');
    if (navigationBackground.classList.contains('navigation--active')) navigationActive();
    else navigationInactive();
});

document.body.addEventListener('click', event => {
    if (navigationBackground.classList.contains('navigation--active')) {
        if (
            event.target.classList.contains('navigation--active') ||
            event.target.classList.contains('navigation__lines') ||
            event.target.classList.contains('navigation__line')
        ) {
        } else {
            navigationBackground.classList.remove('navigation--active');
            navigationInactive();
        }
    }
});
