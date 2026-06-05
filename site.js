(function () {
  'use strict';

  var prefersReduced =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    var baseOpacity = 0.9;
    var fadeDistance = 520;
    var heroTicking = false;
    var updateHeroBg = function () {
      var progress = Math.min(window.scrollY / fadeDistance, 1);
      heroBg.style.opacity = (baseOpacity * (1 - progress)).toFixed(3);
      heroTicking = false;
    };
    window.addEventListener(
      'scroll',
      function () {
        if (!heroTicking) {
          window.requestAnimationFrame(updateHeroBg);
          heroTicking = true;
        }
      },
      { passive: true }
    );
    updateHeroBg();
  }

  var toTop = document.getElementById('to-top');
  if (toTop) {
    var toggleTop = function () {
      if (window.scrollY > 380) {
        toTop.hidden = false;
      } else {
        toTop.hidden = true;
      }
    };
    window.addEventListener('scroll', toggleTop, { passive: true });
    toggleTop();
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: prefersReduced ? 'auto' : 'smooth' });
    });
  }

  /**
   * Portrait “diffusion denoise” demo: x_t ≈ sqrt(α̅)·x_0 + sqrt(1-α̅)·ε in normalized [-1,1] space.
   */
  function gaussianPair() {
    var u = 0;
    var v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    var mag = Math.sqrt(-2.0 * Math.log(u));
    return [mag * Math.cos(2.0 * Math.PI * v), mag * Math.sin(2.0 * Math.PI * v)];
  }

  function clamp(v, lo, hi) {
    return Math.max(lo, Math.min(hi, v));
  }

  /** Strong noise early, resolves smoothly toward the end (reverse diffusion feel). */
  function alphaBarAt(progress) {
    var t = clamp(progress, 0, 1);
    var eased = 1 - Math.pow(1 - t, 2.4);
    return eased;
  }

  function initPortraitDenoise() {
    if (prefersReduced) return;

    var link = document.querySelector('.photo-link--denoise');
    if (!link || typeof document.createElement('canvas').getContext !== 'function') return;

    var canvas = link.querySelector('.prof-canvas');
    var img = link.querySelector('.prof-pic');
    if (!canvas || !img) return;

    var ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    var duration = 3200;

    function startDraw() {
      var nw = img.naturalWidth;
      var nh = img.naturalHeight;
      if (!nw || !nh) return;

      var rect = img.getBoundingClientRect();
      var dispW = Math.max(2, Math.round(rect.width));
      var dispH = Math.max(2, Math.round((nh / nw) * dispW));

      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var bufW = Math.round(dispW * dpr);
      var bufH = Math.round(dispH * dpr);

      var maxPx = 380000;
      if (bufW * bufH > maxPx) {
        var shrink = Math.sqrt(maxPx / (bufW * bufH));
        bufW = Math.max(96, Math.floor(bufW * shrink));
        bufH = Math.max(96, Math.floor(bufH * shrink));
      }

      var w = bufW;
      var h = bufH;

      canvas.width = w;
      canvas.height = h;
      canvas.style.width = dispW + 'px';
      canvas.style.height = dispH + 'px';

      ctx.setTransform(1, 0, 0, 1, 0, 0);

      var work = document.createElement('canvas');
      work.width = w;
      work.height = h;
      var wctx = work.getContext('2d');
      wctx.drawImage(img, 0, 0, w, h);
      var clean = wctx.getImageData(0, 0, w, h);
      var cd = clean.data;
      var pxCount = w * h;

      var epsR = new Float32Array(pxCount);
      var epsG = new Float32Array(pxCount);
      var epsB = new Float32Array(pxCount);
      var i;
      var p;
      for (i = 0; i < pxCount; i++) {
        p = gaussianPair();
        epsR[i] = p[0];
        epsG[i] = p[1];
        p = gaussianPair();
        epsB[i] = p[0];
      }

      img.setAttribute('aria-hidden', 'true');
      canvas.removeAttribute('aria-hidden');
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', 'Portrait: simulated diffusion denoising');
      link.classList.add('photo-link--denoise-running');

      var out = ctx.createImageData(w, h);
      var od = out.data;

      var t0 = performance.now();

      function frame(now) {
        var elapsed = now - t0;
        var progress = clamp(elapsed / duration, 0, 1);
        var ab = alphaBarAt(progress);
        var sn = Math.sqrt(ab);
        var snm = Math.sqrt(Math.max(0, 1 - ab));

        var idx;
        for (idx = 0; idx < pxCount; idx++) {
          var base = idx * 4;
          var x0r = (cd[base] / 255) * 2 - 1;
          var x0g = (cd[base + 1] / 255) * 2 - 1;
          var x0b = (cd[base + 2] / 255) * 2 - 1;

          var xr = sn * x0r + snm * epsR[idx];
          var xg = sn * x0g + snm * epsG[idx];
          var xb = sn * x0b + snm * epsB[idx];

          od[base] = clamp(Math.round(((xr + 1) / 2) * 255), 0, 255);
          od[base + 1] = clamp(Math.round(((xg + 1) / 2) * 255), 0, 255);
          od[base + 2] = clamp(Math.round(((xb + 1) / 2) * 255), 0, 255);
          od[base + 3] = 255;
        }

        ctx.putImageData(out, 0, 0);

        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          canvas.classList.remove('prof-canvas--animating');
          canvas.classList.add('prof-canvas--done');
          canvas.setAttribute('aria-hidden', 'true');
          canvas.removeAttribute('role');
          canvas.removeAttribute('aria-label');
          img.removeAttribute('aria-hidden');
          link.classList.remove('photo-link--denoise-running');
          link.classList.add('photo-link--denoise-finished');
        }
      }

      canvas.classList.add('prof-canvas--animating');
      requestAnimationFrame(frame);
    }

    if (img.complete && img.naturalWidth) {
      startDraw();
    } else {
      img.addEventListener('load', startDraw, { once: true });
      img.addEventListener('error', function () {
        img.removeAttribute('aria-hidden');
      });
    }
  }

  initPortraitDenoise();

  if (prefersReduced || typeof IntersectionObserver === 'undefined') {
    return;
  }

  var blocks = document.querySelectorAll('.block, .site-footer');
  blocks.forEach(function (el) {
    el.classList.add('reveal');
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  );

  blocks.forEach(function (el) {
    observer.observe(el);
  });
})();
