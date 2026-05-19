/* ===================================
   WEDDING WEBSITE — index.js
=================================== */

// ── 1. Loader
window.addEventListener('load', () => {

  setTimeout(() => {

    document
      .getElementById('loader')
      .classList.add('hidden');

    spawnPetals();

  }, 1800);

});


// ── 2. Progress Bar
const progressBar = document.getElementById('progressBar');

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

  progressBar.style.width = pct + '%';

});


// ── 3. Floating petals
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

    const el = document.createElement('span');

    el.classList.add('petal');

    el.textContent =
      symbols[
        Math.floor(
          Math.random() * symbols.length
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


// ── 4. Countdown Timer
(function startCountdown() {

  const target =
    new Date(
      'June 14, 2026 00:00:00'
    ).getTime();

  const elDays =
    document.getElementById('days');

  const elHrs =
    document.getElementById('hours');

  const elMins =
    document.getElementById('minutes');

  const elSecs =
    document.getElementById('seconds');

  function pad(n) {

    return String(
      Math.max(0, n)
    ).padStart(2, '0');

  }

  function tick() {

    const diff = target - Date.now();

    if (diff <= 0) {

      elDays.textContent =
      elHrs.textContent =
      elMins.textContent =
      elSecs.textContent =
      '00';

      return;

    }

    elDays.textContent = pad(
      Math.floor(diff / 86400000)
    );

    elHrs.textContent = pad(
      Math.floor(
        (diff % 86400000) / 3600000
      )
    );

    elMins.textContent = pad(
      Math.floor(
        (diff % 3600000) / 60000
      )
    );

    elSecs.textContent = pad(
      Math.floor(
        (diff % 60000) / 1000
      )
    );

  }

  tick();

  setInterval(tick, 1000);

})();


// ── 5. Scroll reveal
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

revealEls.forEach((el) =>
  revealObserver.observe(el)
);


// ── 6. RSVP FORM + PREMIUM POPUP
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


// Submit form
form.addEventListener('submit', (e) => {

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


  // Validation
  if (
    !name ||
    !phone ||
    !attendance
  ) {

    shakeForm();

    return;

  }


  // Loading button
  btnText.style.display = 'none';
  btnLoader.style.display = 'inline';


  // Simulate API submit
  setTimeout(() => {

    // Reset button
    btnText.style.display = 'inline';
    btnLoader.style.display = 'none';


    // Show popup
    popupOverlay.classList.add('active');


    // Vibrate mobile
    navigator.vibrate?.(100);


    // Popup particles
    createPopupParticles();


    // Reset form
    form.reset();


    // Auto close popup
    setTimeout(() => {

      popupOverlay
        .classList.remove('active');

    }, 7000);

  }, 1400);

});


// ── Close popup button
closePopup.addEventListener('click', () => {

  popupOverlay
    .classList.remove('active');

});


// ── Close popup outside click
popupOverlay.addEventListener('click', (e) => {

  if (e.target === popupOverlay) {

    popupOverlay
      .classList.remove('active');

  }

});


// ── Shake form animation
function shakeForm() {

  form.style.animation = 'none';

  form.offsetHeight;

  form.style.animation =
    'shake 0.4s ease';

}


// ── Popup floating particles
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
          Math.random() * symbols.length
        )
      ];

    particle.style.position = 'fixed';

    particle.style.left =
      (window.innerWidth / 2) + 'px';

    particle.style.top =
      (window.innerHeight / 2) + 'px';

    particle.style.fontSize =
      (Math.random() * 18 + 12) + 'px';

    particle.style.pointerEvents = 'none';

    particle.style.zIndex = '999999';

    document.body.appendChild(particle);


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


// ── 7. Cursor glow (desktop only)
if (
  window.matchMedia('(pointer: fine)')
    .matches
) {

  document.addEventListener(
    'mousemove',
    (e) => {

      const glow =
        document.createElement('div');

      glow.classList.add('cursor-glow');

      glow.style.left =
        e.pageX + 'px';

      glow.style.top =
        e.pageY + 'px';

      document.body.appendChild(glow);

      setTimeout(() => {

        glow.remove();

      }, 600);

    }
  );

}


// ── 8. Floating romantic sparkles
setInterval(() => {

  const sparkle =
    document.createElement('div');

  sparkle.innerHTML = '✨';

  sparkle.style.position = 'fixed';

  sparkle.style.left =
    Math.random() * 100 + 'vw';

  sparkle.style.top = '-20px';

  sparkle.style.fontSize =
    (Math.random() * 10 + 10) + 'px';

  sparkle.style.pointerEvents = 'none';

  sparkle.style.zIndex = '999';

  sparkle.style.opacity = '0.8';

  document.body.appendChild(sparkle);


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

      easing: 'linear'
    }

  );


  setTimeout(() => {

    sparkle.remove();

  }, 7000);

}, 900);

// ── 9. Romantic Background Music

const bgMusic =
  document.getElementById('bgMusic');

const musicToggle =
  document.getElementById('musicToggle');

const musicIcon =
  document.getElementById('musicIcon');

let isPlaying = false;


// Auto play after first interaction
document.addEventListener(
  'click',
  () => {

    if (!isPlaying) {

      bgMusic.volume = 0.4;

      bgMusic.play();

      isPlaying = true;

      musicToggle.classList.add('playing');

      musicIcon.innerHTML = '🎶';

    }

  },

  { once: true }

);


// Toggle button
musicToggle.addEventListener('click', () => {

  if (isPlaying) {

    bgMusic.pause();

    isPlaying = false;

    musicToggle.classList.remove('playing');

    musicIcon.innerHTML = '🎵';

  }

  else {

    bgMusic.play();

    isPlaying = true;

    musicToggle.classList.add('playing');

    musicIcon.innerHTML = '🎶';

  }

});