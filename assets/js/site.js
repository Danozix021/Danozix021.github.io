/*
  Builds the shared parts of every page from projects.js:
  header, footer, project cards, filters and project page details.
  You should not need to edit this file to add projects.
*/
(function () {
  var app = document.getElementById("app");
  if (!app) return;
  var root = app.getAttribute("data-root") || "";
  var page = app.getAttribute("data-page") || "";
  var projects = window.PROJECTS || [];
  var site = window.SITE || {};

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function link(path) { return /^https?:\/\//.test(path) ? path : root + path; }
  function youtubeId(url) { var m = (url || "").match(/(?:youtu\.be\/|v=|embed\/)([\w-]{11})/); return m ? m[1] : ""; }
  function projectUrl(p) { return link(p.slug + "/index.html"); }
  function initials(t) {
    return t.split(/\s+/).filter(function (w) { return /^[A-Z0-9]/i.test(w) && !/^(of|a|the)$/i.test(w); })
      .slice(0, 2).map(function (w) { return w[0].toUpperCase(); }).join("");
  }
  function hue(slug) {
    var h = 0;
    for (var i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) % 360;
    return 170 + (h % 80); // keep placeholders in the cool teal-to-blue range
  }

  /* ---------- Header ---------- */
  var nav = [
    { id: "home", label: "Home", href: link("index.html") },
    { id: "projects", label: "Projects", href: link("projects.html") },
    { id: "about", label: "About", href: link("about.html") }
  ];
  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<div class="wrap header-inner">' +
      '<a class="brand" href="' + link("index.html") + '" aria-label="' + esc(site.name) + ', home">' +
        '<span class="brand-mark" aria-hidden="true">DA</span>' +
        '<span class="brand-name">' + esc(site.name) + '</span>' +
      '</a>' +
      '<button class="menu-btn" id="menu-btn" aria-expanded="false" aria-controls="main-nav">Menu</button>' +
      '<nav class="main-nav" id="main-nav" aria-label="Main">' +
        nav.map(function (n) {
          var cur = (n.id === page || (n.id === "projects" && page === "project")) ? ' aria-current="page"' : "";
          return '<a href="' + n.href + '"' + cur + '>' + n.label + '</a>';
        }).join("") +
        '<a href="' + link(site.resume) + '" target="_blank" rel="noopener">Resume</a>' +
        '<a class="nav-gh" href="' + esc(site.github) + '" target="_blank" rel="noopener">GitHub</a>' +
      '</nav>' +
    '</div>';
  app.insertBefore(header, app.firstChild);
  var menuBtn = header.querySelector("#menu-btn");
  menuBtn.addEventListener("click", function () {
    var open = header.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  /* ---------- Footer ---------- */
  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    '<div class="wrap footer-inner">' +
      '<div><strong>' + esc(site.name) + '</strong><span class="muted"> · ' + esc(site.title) + '</span></div>' +
      '<div class="footer-links">' +
        '<a href="' + link("projects.html") + '">Projects</a>' +
        '<a href="' + link("about.html") + '">About</a>' +
        '<a href="' + esc(site.github) + '" target="_blank" rel="noopener">GitHub</a>' +
        '<span class="mono">' + esc(site.email) + '</span>' +
      '</div>' +
    '</div>';
  app.appendChild(footer);

  /* ---------- Project cards ---------- */
  function thumb(p) {
    if (p.thumbnail) {
      return '<img src="' + link(p.thumbnail) + '" alt="" loading="lazy">';
    }
    // No thumbnail set: use the YouTube video's own thumbnail if there is one
    if (youtubeId(p.video)) {
      return '<img src="https://img.youtube.com/vi/' + youtubeId(p.video) + '/hqdefault.jpg" alt="" loading="lazy">';
    }
    return '<div class="thumb-ph" style="--h:' + hue(p.slug) + '"><span>' + esc(initials(p.title)) + '</span></div>';
  }
  function card(p, i) {
    return '<a class="card" href="' + projectUrl(p) + '" data-tags="' + esc(p.tags.join("|")) + '">' +
      '<div class="card-thumb">' + thumb(p) +
        '<span class="slot mono">' + String(i + 1).padStart(2, "0") + '</span>' +
      '</div>' +
      '<div class="card-body">' +
        '<h3>' + esc(p.title) + '</h3>' +
        '<p>' + esc(p.pitch) + '</p>' +
        '<dl class="card-meta mono">' +
          '<div><dt>Role</dt><dd>' + esc(p.role) + '</dd></div>' +
          '<div><dt>Made with</dt><dd>' + esc(p.engine) + '</dd></div>' +
          '<div><dt>Team</dt><dd>' + esc(p.team) + '</dd></div>' +
        '</dl>' +
        '<ul class="tags">' + p.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") + '</ul>' +
      '</div>' +
    '</a>';
  }
  document.querySelectorAll("[data-project-grid]").forEach(function (grid) {
    var list = grid.getAttribute("data-project-grid") === "featured"
      ? projects.filter(function (p) { return p.featured; })
      : projects;
    grid.innerHTML = list.map(function (p) { return card(p, projects.indexOf(p)); }).join("");
  });

  /* ---------- Filters (Projects page) ---------- */
  var filterBar = document.querySelector("[data-filters]");
  if (filterBar) {
    var tags = [];
    projects.forEach(function (p) { p.tags.forEach(function (t) { if (tags.indexOf(t) < 0) tags.push(t); }); });
    filterBar.innerHTML = ["All"].concat(tags).map(function (t, i) {
      return '<button type="button" class="chip" aria-pressed="' + (i === 0) + '" data-tag="' + esc(t) + '">' + esc(t) + '</button>';
    }).join("");
    var countEl = document.querySelector("[data-count]");
    function apply(tag) {
      var shown = 0;
      document.querySelectorAll(".card").forEach(function (c) {
        var match = tag === "All" || c.getAttribute("data-tags").split("|").indexOf(tag) >= 0;
        c.hidden = !match;
        if (match) shown++;
      });
      if (countEl) countEl.textContent = shown + (shown === 1 ? " project" : " projects");
    }
    filterBar.addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      filterBar.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", c === b ? "true" : "false"); });
      apply(b.getAttribute("data-tag"));
    });
    apply("All");
  }

  /* ---------- Project page ---------- */
  var slug = app.getAttribute("data-slug");
  if (page === "project" && slug) {
    var idx = -1;
    projects.forEach(function (p, i) { if (p.slug === slug) idx = i; });
    var p = projects[idx];
    var head = document.querySelector("[data-project-head]");
    if (!p) {
      if (head) head.innerHTML = '<h1>Project not found</h1><p>Add an entry with slug "' + esc(slug) + '" to assets/js/projects.js.</p>';
      return;
    }
    document.title = p.title + " | " + site.name;

    var topNav = "";
    if (projects.length > 1) {
      var tPrev = projects[(idx - 1 + projects.length) % projects.length];
      var tNext = projects[(idx + 1) % projects.length];
      topNav = '<nav class="top-pager mono" aria-label="Switch project">' +
        '<a href="' + projectUrl(tPrev) + '" title="' + esc(tPrev.title) + '" aria-label="Previous project: ' + esc(tPrev.title) + '">&larr; <span>' + esc(tPrev.title) + '</span></a>' +
        '<a href="' + projectUrl(tNext) + '" title="' + esc(tNext.title) + '" aria-label="Next project: ' + esc(tNext.title) + '"><span>' + esc(tNext.title) + '</span> &rarr;</a>' +
      '</nav>';
    }
    head.innerHTML =
      '<div class="head-bar"><nav class="crumbs mono" aria-label="Breadcrumb"><a href="' + link("projects.html") + '">Projects</a><span aria-hidden="true">/</span><span>' + esc(p.title) + '</span></nav>' + topNav + '</div>' +
      '<p class="eyebrow mono">Project ' + String(idx + 1).padStart(2, "0") + ' of ' + String(projects.length).padStart(2, "0") + '</p>' +
      '<h1>' + esc(p.title) + '</h1>' +
      '<p class="lede">' + esc(p.pitch) + '</p>';

    var media = document.querySelector("[data-project-media]");
    if (media) {
      var yt = youtubeId(p.video);
      if (yt) {
        media.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + yt + '" title="' + esc(p.title) + ' gameplay video" allowfullscreen></iframe>';
      } else if (p.video) {
        media.innerHTML = '<video controls preload="metadata" src="' + link(p.video) + '"></video>';
      } else {
        media.innerHTML = '<div class="media-ph"><span class="play" aria-hidden="true"></span><span class="mono">Video coming soon</span></div>';
      }
    }

    var info = document.querySelector("[data-project-info]");
    if (info) {
      var rows = [["Role", p.role], ["Made with", p.engine], ["Team", p.team], ["Duration", p.duration], ["Status", p.status], ["Year", p.year]]
        .filter(function (r) { return r[1]; });
      info.innerHTML = '<h2 class="panel-title mono">Project file</h2><dl>' +
        rows.map(function (r) { return '<div><dt class="mono">' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>'; }).join("") +
        '</dl><ul class="tags">' + p.tags.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") + '</ul>';
    }

    var pager = document.querySelector("[data-project-pager]");
    if (pager && projects.length > 1) {
      var prev = projects[(idx - 1 + projects.length) % projects.length];
      var next = projects[(idx + 1) % projects.length];
      pager.innerHTML =
        '<a class="pager-link" href="' + projectUrl(prev) + '"><span class="mono">&larr; Previous project</span><strong>' + esc(prev.title) + '</strong></a>' +
        '<a class="pager-all mono" href="' + link("projects.html") + '">All projects</a>' +
        '<a class="pager-link next" href="' + projectUrl(next) + '"><span class="mono">Next project &rarr;</span><strong>' + esc(next.title) + '</strong></a>';
    }
  }

  /* ---------- Copy email buttons ---------- */
  document.querySelectorAll("[data-email]").forEach(function (el) { el.textContent = site.email; });
  document.querySelectorAll("[data-copy-email]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var done = function () { btn.textContent = "Copied"; setTimeout(function () { btn.textContent = "Copy email"; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(site.email).then(done, function () { selectEmail(); });
      } else { selectEmail(); }
    });
  });
  function selectEmail() {
    var el = document.querySelector("[data-email]");
    if (!el) return;
    var r = document.createRange(); r.selectNodeContents(el);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
  }
  document.querySelectorAll("[data-github]").forEach(function (a) { a.href = site.github; });
  document.querySelectorAll("[data-resume]").forEach(function (a) { a.href = link(site.resume); });
  document.querySelectorAll("[data-photo]").forEach(function (fig) {
    if (!site.photo) return;
    fig.innerHTML = '<img src="' + link(site.photo) + '" alt="Photo of ' + esc(site.name) + '">';
    fig.hidden = false;
    fig.parentNode.classList.add("has-photo");
  });
  document.querySelectorAll("[data-project-count]").forEach(function (el) { el.textContent = String(projects.length).padStart(2, "0"); });
})();
