/* ===================================
   WEDDING WEBSITE — index.js
=================================== */


/* ===================================
   1. LOADER
=================================== */

window.addEventListener('load', () => {

  setTimeout(() => {

    document
      .getElementById('loader')
      .classList.add('hidden');

    spawnPetals();

  }, 1800);

});


/* ===================================
   2. PROGRESS BAR
=================================== */

const progressBar =
  document.getElementById('progressBar');

window.addEventListener('scroll', () => {

  const scrollTop =
    document.documentElement.scrollTop;

  const docHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  const pct =
    docHeight > 0
      ? (scrollTop / docHeight) * 100
      : 0;

  progressBar.style.width =
    pct + '%';

});


/* ===================================
   3. FLOATING PETALS
=================================== */

function spawnPetals() {

  const container =
    document.querySelector('.petals-bg');

  const symbols = [
    '🌸',
    '🌺',
    '❤',
    '🌷',
    '✨'
  ];

  const count =
    window.innerWidth < 480 ? 6 : 12;

  for (let i = 0; i < count; i++) {

    const el =
      document.createElement('span');

    el.classList.add('petal');

    el.textContent =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];

    el.style.left =
      Math.random() * 100 + 'vw';

    el.style.fontSize =
      (Math.random() * 14 + 12) + 'px';

    el.style.animationDuration =
      (Math.random() * 10 + 10) + 's';

    el.style.animationDelay =
      (Math.random() * 10) + 's';

    container.appendChild(el);

  }

}


/* ===================================
   4. DYNAMIC COUNTDOWN
=================================== */

(function dynamicCountdown() {

  const weddingDate =
    new Date(2026, 5, 14, 11, 0, 0);

  const elDays =
    document.getElementById('days');

  const elHours =
    document.getElementById('hours');

  const elMinutes =
    document.getElementById('minutes');

  const elSeconds =
    document.getElementById('seconds');


  function formatNumber(num) {

    return String(num)
      .padStart(2, '0');

  }


  function updateCountdown() {

    const now = new Date();

    const difference =
      weddingDate - now;


    if (difference <= 0) {

      elDays.textContent = '00';
      elHours.textContent = '00';
      elMinutes.textContent = '00';
      elSeconds.textContent = '00';

      const title =
        document.querySelector(
          '.countdown-section .section-title'
        );

      if (title) {

        title.innerHTML =
          '🎉 Wedding Celebration Started ✨';

      }

      return;

    }


    const days =
      Math.floor(
        difference /
        (1000 * 60 * 60 * 24)
      );

    const hours =
      Math.floor(
        (
          difference /
          (1000 * 60 * 60)
        ) % 24
      );

    const minutes =
      Math.floor(
        (
          difference /
          (1000 * 60)
        ) % 60
      );

    const seconds =
      Math.floor(
        (
          difference / 1000
        ) % 60
      );


    elDays.textContent =
      formatNumber(days);

    elHours.textContent =
      formatNumber(hours);

    elMinutes.textContent =
      formatNumber(minutes);

    elSeconds.textContent =
      formatNumber(seconds);

  }


  updateCountdown();

  setInterval(updateCountdown, 1000);

})();


/* ===================================
   5. SCROLL REVEAL
=================================== */

const revealEls =
  document.querySelectorAll('.reveal');

const revealObserver =
  new IntersectionObserver(

    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target
            .classList.add('active');

          revealObserver.unobserve(
            entry.target
          );

        }

      });

    },

    {
      threshold: 0.12
    }

  );

revealEls.forEach((el) => {

  revealObserver.observe(el);

});


/* ===================================
   6. RSVP FORM + GOOGLE SHEETS
=================================== */

const form =
  document.getElementById('rsvpForm');

const btnText =
  form.querySelector('.btn-text');

const btnLoader =
  form.querySelector('.btn-loader');

const popupOverlay =
  document.getElementById('popupOverlay');

const closePopup =
  document.getElementById('closePopup');


// Google Apps Script URL
const SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzlA7BRgyAS7E-3Hqpu3dPBm66nA2rJmXDWq_v48wAUQW1UzfKv93fhM0kec1JRZmWZ9w/exec';


// Submit form
form.addEventListener('submit', async (e) => {

  e.preventDefault();


  const name =
    document
      .getElementById('guestName')
      .value
      .trim();

  const phone =
    document
      .getElementById('phone')
      .value
      .trim();

  const attendance =
    document
      .getElementById('attendance')
      .value;

  const guests =
    document
      .getElementById('guests')
      .value;

  const message =
    document
      .getElementById('message')
      .value
      .trim();


  // Validation
  if (
    !name ||
    !phone ||
    !attendance
  ) {

    shakeForm();

    return;

  }


  // Loading
  btnText.style.display =
    'none';

  btnLoader.style.display =
    'inline';


  // Form data
  const formData = {

    name,

    phone,

    attendance,

    guests: guests || 1,

    message: message || '-',

    createdAt:
      new Date().toLocaleString()

  };


  try {

    // Send to Google Sheets
    await fetch(SCRIPT_URL, {

      method: 'POST',

      mode: 'no-cors',

      headers: {
        'Content-Type':
          'application/json'
      },

      body:
        JSON.stringify(formData)

    });


    // Reset loading
    btnText.style.display =
      'inline';

    btnLoader.style.display =
      'none';


    // Success popup
    popupOverlay
      .classList.add('active');


    // Vibration
    navigator.vibrate?.(100);


    // Particles
    createPopupParticles();


    // Reset form
    form.reset();


    // Auto close popup
    setTimeout(() => {

      popupOverlay
        .classList.remove('active');

    }, 7000);

  }

  catch (err) {

    console.error(err);

    alert(
      'Something went wrong!'
    );


    btnText.style.display =
      'inline';

    btnLoader.style.display =
      'none';

  }

});


// Close popup button
closePopup.addEventListener('click', () => {

  popupOverlay
    .classList.remove('active');

});


// Close popup outside
popupOverlay.addEventListener('click', (e) => {

  if (e.target === popupOverlay) {

    popupOverlay
      .classList.remove('active');

  }

});


// Shake animation
function shakeForm() {

  form.style.animation =
    'none';

  form.offsetHeight;

  form.style.animation =
    'shake 0.4s ease';

}


/* ===================================
   7. POPUP PARTICLES
=================================== */

function createPopupParticles() {

  const symbols = [
    '❤',
    '✨',
    '🌸',
    '💖',
    '🌷'
  ];

  for (let i = 0; i < 20; i++) {

    const particle =
      document.createElement('span');

    particle.innerHTML =
      symbols[
        Math.floor(
          Math.random() *
          symbols.length
        )
      ];

    particle.style.position =
      'fixed';

    particle.style.left =
      (window.innerWidth / 2) + 'px';

    particle.style.top =
      (window.innerHeight / 2) + 'px';

    particle.style.fontSize =
      (Math.random() * 18 + 12) + 'px';

    particle.style.pointerEvents =
      'none';

    particle.style.zIndex =
      '999999';

    document.body.appendChild(
      particle
    );


    const x =
      (Math.random() - 0.5) * 320;

    const y =
      (Math.random() - 0.5) * 320;


    particle.animate(

      [
        {
          transform:
            'translate(0,0) scale(1)',

          opacity: 1
        },

        {
          transform:
            `translate(${x}px, ${y}px) scale(1.8)`,

          opacity: 0
        }
      ],

      {
        duration: 1800,

        easing:
          'cubic-bezier(.2,.8,.2,1)'
      }

    );


    setTimeout(() => {

      particle.remove();

    }, 1800);

  }

}


/* ===================================
   8. CURSOR GLOW
=================================== */

if (
  window.matchMedia('(pointer:fine)')
    .matches
) {

  document.addEventListener(
    'mousemove',
    (e) => {

      const glow =
        document.createElement('div');

      glow.classList.add(
        'cursor-glow'
      );

      glow.style.left =
        e.pageX + 'px';

      glow.style.top =
        e.pageY + 'px';

      document.body.appendChild(
        glow
      );

      setTimeout(() => {

        glow.remove();

      }, 600);

    }
  );

}


/* ===================================
   9. FLOATING SPARKLES
=================================== */

setInterval(() => {

  const sparkle =
    document.createElement('div');

  sparkle.innerHTML =
    '✨';

  sparkle.style.position =
    'fixed';

  sparkle.style.left =
    Math.random() * 100 + 'vw';

  sparkle.style.top =
    '-20px';

  sparkle.style.fontSize =
    (Math.random() * 10 + 10) + 'px';

  sparkle.style.pointerEvents =
    'none';

  sparkle.style.zIndex =
    '999';

  sparkle.style.opacity =
    '0.8';

  document.body.appendChild(
    sparkle
  );


  sparkle.animate(

    [
      {
        transform:
          'translateY(0px) rotate(0deg)',

        opacity: 0
      },

      {
        opacity: 1
      },

      {
        transform:
          'translateY(100vh) rotate(360deg)',

        opacity: 0
      }
    ],

    {
      duration:
        Math.random() * 3000 + 4000,

      easing:
        'linear'
    }

  );


  setTimeout(() => {

    sparkle.remove();

  }, 7000);

}, 900);


/* ===================================
   10. ROMANTIC MUSIC
=================================== */

const bgMusic =
  document.getElementById('bgMusic');

const musicToggle =
  document.getElementById('musicToggle');

const musicIcon =
  document.getElementById('musicIcon');


// Volume
bgMusic.volume = 0.4;


// Auto play
window.addEventListener(
  'load',
  async () => {

    try {

      await bgMusic.play();

      musicToggle.classList.add(
        'playing'
      );

      musicIcon.innerHTML =
        '🎶';

    }

    catch (err) {

      console.log(
        'Autoplay blocked'
      );

    }

  }
);


// Mobile support
document.addEventListener(

  'click',

  () => {

    if (bgMusic.paused) {

      bgMusic.play();

      musicToggle.classList.add(
        'playing'
      );

      musicIcon.innerHTML =
        '🎶';

    }

  },

  { once: true }

);


// Toggle music
musicToggle.addEventListener(
  'click',

  () => {

    if (bgMusic.paused) {

      bgMusic.play();

      musicToggle.classList.add(
        'playing'
      );

      musicIcon.innerHTML =
        '🎶';

    }

    else {

      bgMusic.pause();

      musicToggle.classList.remove(
        'playing'
      );

      musicIcon.innerHTML =
        '🎵';

    }

  }

);
