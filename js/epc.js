/* EPC | Eco Partner Co.,Ltd — site script (no dependencies) */
(function () {
  "use strict";

  const LINE_URL = "https://line.me/ti/p/~171odetw";

  /* ---------- Header: solid on scroll + mobile menu ---------- */
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".nav");
  const toggle = document.querySelector(".menu-toggle");

  const onScroll = () => {
    if (header && !header.classList.contains("is-light")) {
      header.classList.toggle("is-solid", window.scrollY > 40);
    }
    if (toTop) toTop.classList.toggle("show", window.scrollY > 500);
  };

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      header.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.innerHTML = open ? '<i class="bi bi-x-lg"></i>' : '<i class="bi bi-list"></i>';
    });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      nav.classList.remove("open");
      header.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = '<i class="bi bi-list"></i>';
    }));
  }

  /* ---------- Back to top ---------- */
  const toTop = document.querySelector(".to-top");
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add("in"));
  }

  /* ---------- Hero slideshow ---------- */
  const slides = document.querySelectorAll(".hero-photo .slide");
  if (slides.length > 1 && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let i = 0;
    setInterval(() => {
      slides[i].classList.remove("on");
      i = (i + 1) % slides.length;
      slides[i].classList.add("on");
    }, 4500);
  }

  /* ---------- Year ---------- */
  document.querySelectorAll("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));

  /* =========================================================
     Course catalog
     ========================================================= */
  const CATS = {
    iso:        { label: "ISO Training",        dot: "#12a99e" },
    management: { label: "Management Training", dot: "#e0a526" },
    safety:     { label: "Safety & Carbon",     dot: "#e2643a" }
  };

  const COURSES = [
    // ISO
    { cat: "iso", code: "ISO 9001:2015", title: "ข้อกำหนดระบบการจัดการคุณภาพ (Requirement & Implementation)", img: "images/courses/iso/ISO9001.png", link: "courses/iso9001.html" },
    { cat: "iso", code: "ISO 9001:2015", title: "การตรวจติดตามภายในระบบการจัดการคุณภาพ (Internal Audit)", img: "images/courses/iso/ISO9001-2.jpg", link: "courses/iso9001-internal-audit.html" },
    { cat: "iso", code: "ISO 14001:2015", title: "ข้อกำหนดระบบการจัดการสิ่งแวดล้อม (Requirement & Implementation)", img: "images/courses/iso/ISO14001.png", link: "courses/iso14001.html" },
    { cat: "iso", code: "ISO 14001:2015", title: "การตรวจติดตามภายในระบบการจัดการสิ่งแวดล้อม (Internal Audit)", img: "images/courses/iso/ISO14001-2.png", link: "courses/iso14001-internal-audit.html" },
    { cat: "iso", code: "ISO 45001:2018", title: "ข้อกำหนดระบบการจัดการอาชีวอนามัยและความปลอดภัย (Requirement & Implementation)", img: "images/courses/iso/ISO45001.png", link: "courses/iso45001.html" },
    { cat: "iso", code: "ISO 45001:2018", title: "การตรวจติดตามภายในระบบการจัดการอาชีวอนามัยและความปลอดภัย (Internal Audit)", img: "images/courses/iso/ISO45001-2.png" },
    { cat: "iso", code: "IATF 16949:2016", title: "ข้อกำหนดระบบการจัดการคุณภาพยานยนต์ (Requirement & Implementation)", img: "images/courses/iso/IATF16949.jpg" },
    { cat: "iso", code: "ISO/IEC 17025:2017", title: "ข้อกำหนดมาตรฐานความสามารถห้องปฏิบัติการทดสอบและสอบเทียบ", img: "images/courses/iso/ISO17025.png" },
    { cat: "iso", code: "ISO/IEC 17025:2017", title: "การตรวจติดตามภายใน (Internal Audit)", img: "images/courses/iso/ISO17025-2.png" },
    { cat: "iso", code: "Measurement", title: "การประเมินค่าความไม่แน่นอนของการวัด (Uncertainty of Measurement)", img: "images/courses/iso/ISO001.jpg" },

    // Management
    { cat: "management", code: "Improvement", title: "Process Improvement & Problem Solving", img: "images/courses/management/PI-PS.png" },
    { cat: "management", code: "Lean", title: "TPS System (Toyota Production System)", img: "images/courses/management/TPS.png" },
    { cat: "management", code: "Kaizen", title: "Process Improvement (Kaizen)", img: "images/courses/management/kaizen.png" },
    { cat: "management", code: "People", title: "Human Improvement", img: "images/courses/management/HPI_Image.jpg" },
    { cat: "management", code: "Strategy", title: "Marketing Strategy & Supply Chain Improvement", img: "images/courses/management/MS-SC.png" },
    { cat: "management", code: "KPI", title: "KPI Improvement", img: "images/courses/management/kpi.png" },
    { cat: "management", code: "Poka-yoke", title: "Process Improvement (Poka-yoke & Stop-Call-Wait)", img: "images/courses/management/poka.png" },
    { cat: "management", code: "Kaizen", title: "KAIZEN — การปรับปรุงอย่างต่อเนื่อง", img: "images/courses/management/kaizen2.jpg" },

    // Safety & Carbon
    { cat: "safety", code: "CFO", title: "การจัดทำคาร์บอนฟุตพริ้นท์องค์กร (Carbon Footprint of Organization)", img: "images/courses/safety/CFO.jpeg" },
    { cat: "safety", code: "CFP", title: "การจัดทำคาร์บอนฟุตพริ้นท์ผลิตภัณฑ์ (Carbon Footprint of Products)", img: "images/courses/safety/CFP.png" },
    { cat: "safety", code: "จป. / OHS", title: "ความปลอดภัย อาชีวอนามัยและสภาพแวดล้อมในการทำงาน สำหรับลูกจ้างทั่วไปและหัวหน้างาน", img: "images/courses/safety/train.png" },
    { cat: "safety", code: "Crane", title: "ความปลอดภัยในการทำงานกับปั้นจั่น", img: "images/courses/safety/train2.png" },
    { cat: "safety", code: "Chemical", title: "ความปลอดภัยในการทำงานกับสารเคมี และการระงับเหตุ", img: "images/courses/safety/train3.png" },
    { cat: "safety", code: "Radiation", title: "ความปลอดภัยในการทำงานกับรังสี และการระงับเหตุ", img: "images/courses/safety/train6.png" },
    { cat: "safety", code: "Work at Height", title: "ความปลอดภัยในการทำงานบนที่สูง", img: "images/courses/safety/train4.png" },
    { cat: "safety", code: "Electrical", title: "ความปลอดภัยในการทำงานเกี่ยวกับไฟฟ้า และการจัดการความปลอดภัยผู้ปฏิบัติงาน", img: "images/courses/safety/train5.png" },
    { cat: "safety", code: "Confined Space", title: "ความปลอดภัยในการทำงานในที่อับอากาศ", img: "images/courses/safety/train7.png" },
    { cat: "safety", code: "Scaffolding", title: "ความปลอดภัยในการทำงานกับนั่งร้าน", img: "images/courses/safety/train8.jpg" },
    { cat: "safety", code: "Forklift", title: "การขับรถยก (Forklift) อย่างปลอดภัยและถูกวิธี", img: "images/courses/safety/Forklift.png" }
  ];

  const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = s => s.toLowerCase().replace(/[\s:\/\-().]/g, "");

  const grid = document.getElementById("courseGrid");
  if (grid) {
    const input = document.getElementById("courseSearch");
    const searchBox = input.closest(".search");
    const clearBtn = searchBox.querySelector(".clear");
    const chips = document.querySelectorAll(".chip[data-cat]");
    const metaTitle = document.getElementById("resultTitle");
    const metaCount = document.getElementById("resultCount");

    // Support old hashes (#section_2/3/4) and new ones (#iso/#management/#safety)
    const hashMap = { section_2: "iso", section_3: "management", section_4: "safety" };
    let cat = "all";
    const h = location.hash.replace("#", "");
    if (CATS[h]) cat = h; else if (hashMap[h]) cat = hashMap[h];

    chips.forEach(c => {
      const k = c.dataset.cat;
      const n = k === "all" ? COURSES.length : COURSES.filter(x => x.cat === k).length;
      c.querySelector(".count").textContent = n;
      c.addEventListener("click", () => { cat = k; render(); history.replaceState(null, "", k === "all" ? location.pathname : "#" + k); });
    });

    const card = (c, i) => {
      const href = c.link || LINE_URL;
      const ext = c.link ? "" : ' target="_blank" rel="noopener"';
      const cta = c.link ? "ดูรายละเอียด" : "สอบถามหลักสูตร";
      return `
      <a class="course" href="${href}"${ext} style="animation-delay:${Math.min(i, 9) * 40}ms">
        <div class="course-media">
          <img src="${esc(c.img)}" alt="" loading="lazy">
          <span class="course-tag" style="--dot:${CATS[c.cat].dot}">${CATS[c.cat].label}</span>
        </div>
        <div class="course-body">
          <div class="course-code">${esc(c.code)}</div>
          <h3>${esc(c.title)}</h3>
          <div class="course-foot">
            <small><i class="bi bi-mortarboard"></i> หลักสูตรอบรม</small>
            <span class="link-arrow">${cta} <i class="bi bi-arrow-right"></i></span>
          </div>
        </div>
      </a>`;
    };

    function render() {
      const q = norm(input.value.trim());
      searchBox.classList.toggle("has-value", input.value.length > 0);
      chips.forEach(c => c.classList.toggle("active", c.dataset.cat === cat));

      const list = COURSES.filter(c =>
        (cat === "all" || c.cat === cat) &&
        (!q || norm(c.title + " " + c.code + " " + CATS[c.cat].label).includes(q))
      );

      metaTitle.textContent = cat === "all" ? "หลักสูตรทั้งหมด" : CATS[cat].label;
      metaCount.textContent = `${list.length} หลักสูตร`;

      grid.innerHTML = list.length
        ? list.map(card).join("")
        : `<div class="empty"><i class="bi bi-search"></i><h3>ไม่พบหลักสูตรที่ค้นหา</h3>
           <p>ลองใช้คำค้นอื่น หรือสอบถามหลักสูตรที่ต้องการกับทีมงานได้โดยตรง</p>
           <a class="btn btn-line" href="${LINE_URL}" target="_blank" rel="noopener"><i class="bi bi-line"></i> สอบถามทาง LINE</a></div>`;
    }

    input.addEventListener("input", render);
    clearBtn.addEventListener("click", () => { input.value = ""; input.focus(); render(); });
    render();
  }
})();
