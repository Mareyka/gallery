document.addEventListener("DOMContentLoaded", function () {

  // ── Списки регистрации (день / месяц / год) ──────────────────

  const daysInput = document.querySelector('input[placeholder="День"]');
  const monthsInput = document.querySelector('input[placeholder="Месяц"]');
  const yearsInput = document.querySelector('input[placeholder="Год"]');
  const daysList = document.getElementById("days");
  const monthsList = document.getElementById("months");
  const yearsList = document.getElementById("years");

  if (daysInput && daysList) {
    for (let i = 1; i <= 31; i++) {
      const div = document.createElement("div");
      div.textContent = i;
      div.addEventListener("click", () => { daysInput.value = i; daysList.style.display = "none"; });
      daysList.appendChild(div);
    }
    daysInput.addEventListener("click", () => {
      daysList.style.display = daysList.style.display === "block" ? "none" : "block";
    });
  }

  if (monthsInput && monthsList) {
    ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"].forEach(month => {
        const div = document.createElement("div");
        div.textContent = month;
        div.addEventListener("click", () => { monthsInput.value = month; monthsList.style.display = "none"; });
        monthsList.appendChild(div);
      });
    monthsInput.addEventListener("click", () => {
      monthsList.style.display = monthsList.style.display === "block" ? "none" : "block";
    });
  }

  if (yearsInput && yearsList) {
    for (let y = 2020; y <= 2030; y++) {
      const div = document.createElement("div");
      div.textContent = y;
      div.addEventListener("click", () => { yearsInput.value = y; yearsList.style.display = "none"; });
      yearsList.appendChild(div);
    }
    yearsInput.addEventListener("click", () => {
      yearsList.style.display = yearsList.style.display === "block" ? "none" : "block";
    });
  }

  // ── Дропдаун сортировки в профиле ────────────────────────────

  const sortInput = document.getElementById("sortInput");
  const sortList = document.getElementById("sortList");

  if (sortInput && sortList) {
    ["Автору", "Цене", "Дате"].forEach(option => {
      const item = document.createElement("div");
      item.textContent = option;
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        sortInput.value = option;
        sortList.classList.remove("open");
      });
      sortList.appendChild(item);
    });
    sortInput.addEventListener("click", (e) => {
      e.stopPropagation();
      sortList.classList.toggle("open");
    });
  }

  // ── Закрываем все дропдауны при клике вне ────────────────────

  document.addEventListener("click", (e) => {
    if (daysInput && daysList && !daysInput.contains(e.target) && !daysList.contains(e.target)) daysList.style.display = "none";
    if (monthsInput && monthsList && !monthsInput.contains(e.target) && !monthsList.contains(e.target)) monthsList.style.display = "none";
    if (yearsInput && yearsList && !yearsInput.contains(e.target) && !yearsList.contains(e.target)) yearsList.style.display = "none";
    if (sortInput && sortList && !sortInput.contains(e.target) && !sortList.contains(e.target)) sortList.classList.remove("open");
  });

  // ── Бургер-меню ───────────────────────────────────────────────

  const header = document.querySelector("header");
  if (!header) return;

  // 1. Overlay
  const overlay = document.createElement("div");
  overlay.className = "side-menu-overlay";
  document.body.appendChild(overlay);

  // 2. Боковое меню
  const sideMenu = document.createElement("nav");
  sideMenu.className = "side-menu";

  header.querySelectorAll(".header_element").forEach(link => {
    const clone = link.cloneNode(true);
    clone.className = "side-menu-link";
    sideMenu.appendChild(clone);
  });

  // Ссылка «Профиль» — ищем иконку аккаунта
  const accountImg = header.querySelector("a img.header_account");
  if (accountImg) {
    const profileLink = document.createElement("a");
    profileLink.className = "side-menu-link side-menu-profile";
    profileLink.href = accountImg.closest("a").getAttribute("href") || "#";
    profileLink.textContent = "Профиль";
    sideMenu.appendChild(profileLink);
  }

  // Переключатель темы — ищем sun.svg или moon.svg
  const themeImg = header.querySelector('a img[src*="sun.svg"], a img[src*="moon.svg"]');
  if (themeImg) {
    const themeLink = document.createElement("a");
    themeLink.className = "side-menu-link side-menu-theme";
    themeLink.href = themeImg.closest("a").getAttribute("href") || "#";
    const isDark = themeImg.getAttribute("src").includes("sun.svg");
    themeLink.textContent = isDark ? "Светлая тема" : "Темная тема";
    sideMenu.appendChild(themeLink);
  }

  document.body.appendChild(sideMenu);

  // 3. Кнопка бургера
  const burgerBtn = document.createElement("button");
  burgerBtn.className = "burger-btn";
  burgerBtn.setAttribute("aria-label", "Открыть меню");
  burgerBtn.innerHTML = "<span></span><span></span><span></span>";
  header.appendChild(burgerBtn);

  // 4. Логика открытия/закрытия

  function openMenu() {
    sideMenu.classList.add("open");
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    burgerBtn.classList.add("active");
  }

  function closeMenu() {
    sideMenu.classList.remove("open");
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    burgerBtn.classList.remove("active");
  }

  burgerBtn.addEventListener("click", () => {
    sideMenu.classList.contains("open") ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  sideMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMenu));

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) closeMenu();
  });

});


// ── Таймер аукциона ───────────────────────────────────────────

const auctionTimerEl = document.getElementById("auction_timer");
if (auctionTimerEl) {
  const auctionDate = new Date("2026-03-08T23:00:00");

  function addZero(n) { return n < 10 ? "0" + n : n; }

  function updateTimer() {
    const diff = auctionDate - new Date();
    if (diff <= 0) { auctionTimerEl.textContent = "00:00:00:00"; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff / 3600000) % 24);
    const m = Math.floor((diff / 60000) % 60);
    const s = Math.floor((diff / 1000) % 60);
    auctionTimerEl.textContent = `${addZero(d)}:${addZero(h)}:${addZero(m)}:${addZero(s)}`;
  }

  setInterval(updateTimer, 1000);
  updateTimer();
}


// ── Слайдер ───────────────────────────────────────────────────

const slider = document.getElementById("slider_image");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

if (slider && next && prev) {
  const images = [
    "/photo/auctuion_peace_1.png",
    "/photo/auctuion_peace_2.png",
    "/photo/auctuion_peace_3.png"
  ];
  let current = 0;

  // заглушка — переопределится ниже если телефон
  let updateDots = function () { };

  next.onclick = () => { current = (current + 1) % images.length; slider.src = images[current]; updateDots(); };
  prev.onclick = () => { current = (current - 1 + images.length) % images.length; slider.src = images[current]; updateDots(); };

  // ── Точки и свайп (только на телефоне ≤420px) ────────────────
  const photoSlider = document.querySelector('.photo_slider');
  if (photoSlider && window.innerWidth <= 420) {

    // Контейнер точек
    const dotsContainer = document.createElement('div');
    dotsContainer.style.cssText = `
      display: flex;
      justify-content: center;
      gap: 8px;
      margin-top: 12px;
    `;

    const dots = [];
    for (let i = 0; i < images.length; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        width: 8px; height: 8px;
        border-radius: 50%;
        background: rgba(0,0,0,0.25);
        transition: background 0.2s;
        cursor: pointer;
      `;
      dot.addEventListener('click', () => {
        current = i;
        slider.src = images[current];
        updateDots();
      });
      dots.push(dot);
      dotsContainer.appendChild(dot);
    }

    dotsContainer.style.position = 'absolute';
    dotsContainer.style.bottom = '40px';
    dotsContainer.style.left = '0';
    dotsContainer.style.right = '0';
    dotsContainer.style.marginTop = '0';
    dotsContainer.style.background = 'none';
    photoSlider.style.position = 'relative';
    photoSlider.appendChild(dotsContainer);

    updateDots = function () {
      dots.forEach((d, i) => {
        d.style.background = i === current ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.25)';
      });
    };

    updateDots();

    // Свайп
    let touchStartX = 0;
    slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
    }, { passive: true });

    slider.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) next.click();
        else prev.click();
      }
    }, { passive: true });
  }
}


// ── Модальное окно ────────────────────────────────────────────

const modal = document.getElementById("modal");
const openBtn = document.getElementById("openModalBtn");
const closeBtn = document.getElementById("closeModalBtn");

if (modal && openBtn && closeBtn) {
  openBtn.addEventListener("click", () => { modal.style.display = "flex"; modal.classList.add("show"); });
  closeBtn.addEventListener("click", () => { modal.style.display = "none"; modal.classList.remove("show"); });
  modal.addEventListener("click", (e) => {
    if (e.target === modal) { modal.style.display = "none"; modal.classList.remove("show"); }
  });
}


// ── Профиль — переключение табов ─────────────────────────────

function openTab(tabNumber) {
  document.querySelectorAll(".content_block").forEach(tab => tab.classList.remove("active"));
  document.getElementById("tab" + tabNumber).classList.add("active");
}