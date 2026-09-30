(function () {
  var IMAGENET = [88, 42, 105, 263, 269, 282, 291, 483, 504, 511, 933, 949];

  // Prompts from Figure/t2i_prompts.txt and Figure/t2i_prompts_1024.txt.
  var PROMPTS = {
    "512": [
      "A cup of matcha latte by the window.",
      "A watercolor bookshop on a rainy night.",
      "A red panda astronaut in a space station.",
      "A snowy Japanese village at night.",
      "A portrait of an elderly Maasai woman.",
      "Pixel art of a floating island village.",
      "An ukiyo-e whale leaping over Mount Fuji.",
      "A silver sports car on a salt flat at sunset.",
      "Hot air balloons over Cappadocia at sunrise."
    ],
    "1024": [
      "A lighthouse in a storm.",
      "A corgi in sunglasses on the beach.",
      "A bowl of ramen with an egg.",
      "A foggy autumn forest path.",
      "A steampunk owl made of gears.",
      "Northern lights over a lakeside cabin.",
      "A woman reading in a greenhouse, oil painting.",
      "A cyberpunk city with flying cars.",
      "A mossy terrarium with mushrooms."
    ]
  };

  function renderMath(el) {
    if (window.renderMathInElement) {
      window.renderMathInElement(el, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false }
        ],
        throwOnError: false
      });
    }
  }

  function selectTab(container, btn) {
    container.querySelectorAll("button").forEach(function (b) {
      b.setAttribute("aria-selected", b === btn ? "true" : "false");
    });
  }

  // ImageNet gallery
  var inTabs = document.getElementById("in-tabs");
  var inImg = document.getElementById("in-img");
  var inCap = document.getElementById("in-cap");
  IMAGENET.forEach(function (c, i) {
    var b = document.createElement("button");
    b.type = "button";
    b.setAttribute("role", "tab");
    b.setAttribute("aria-selected", i === 0 ? "true" : "false");
    b.textContent = "Class " + c;
    b.addEventListener("click", function () {
      selectTab(inTabs, b);
      inImg.style.opacity = 0.35;
      var next = new Image();
      next.onload = function () {
        inImg.src = next.src;
        inImg.alt = "Uncurated RG-XL/16 samples, class " + c;
        inImg.style.opacity = 1;
      };
      next.src = "static/img/imagenet/" + c + ".jpg";
      inCap.textContent = "Uncurated ImageNet $256\\times256$ and $512\\times512$ RG-XL/16 samples. Class " + c + ".";
      renderMath(inCap);
    });
    inTabs.appendChild(b);
  });

  // Text-to-image gallery
  var grid = document.getElementById("t2i-grid");
  var t2iTabs = document.getElementById("t2i-tabs");
  function showT2I(res) {
    grid.innerHTML = "";
    PROMPTS[res].forEach(function (p, i) {
      var n = String(i + 1).padStart(2, "0");
      var fig = document.createElement("figure");
      fig.className = "t2i-item";
      var img = document.createElement("img");
      img.loading = "lazy";
      img.src = "static/img/t2i/" + res + "_" + n + ".jpg";
      img.alt = p;
      var cap = document.createElement("figcaption");
      cap.textContent = p;
      fig.appendChild(img);
      fig.appendChild(cap);
      grid.appendChild(fig);
    });
  }
  t2iTabs.querySelectorAll("button").forEach(function (b) {
    b.addEventListener("click", function () {
      selectTab(t2iTabs, b);
      showT2I(b.dataset.res);
    });
  });
  showT2I("512");

  // BibTeX copy
  var copyBtn = document.querySelector(".copy");
  copyBtn.addEventListener("click", function () {
    var text = document.getElementById("bib-code").textContent;
    var done = function () {
      copyBtn.textContent = "Copied";
      setTimeout(function () { copyBtn.textContent = "Copy"; }, 1500);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(done, function () {});
    }
  });

  // Pending links
  document.querySelectorAll('.btn[aria-disabled="true"]').forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); });
  });

  renderMath(document.body);
})();
