/**
 * WILDWOOD PAPER — CULINARY INVITATION
 * Main JavaScript: SPA navigation, animations, interactions
 *
 * Architecture:
 * - State management via `AppState` object
 * - Page routing via `showPage()`
 * - Ingredient modal via `openIngredientModal()` / `closeIngredientModal()`
 * - Leaf animation via `LeafSystem`
 * - Swipe gesture detection for course navigation
 */

'use strict';

/* ============================================================
   DATA — Course Content
   ============================================================ */

const COURSES = [
  {
    id: 'snapper',
    course: 'Appetizer',
    stage: 'First Course',
    name: 'Indonesian Snapper, Two Ways',
    description:
      'The first step into the forest brings you close to water. A quiet stream runs through it, steady and clear, feeding everything around it. This is where the course begins. Here, snapper mirrors that clarity, clean and delicate, taking on what surrounds it. One is lightly cured with torch ginger to lift its freshness, while the other is wrapped in crisp rice, adding warmth and texture. The same ingredient, expressed in two ways, revealing more than one side of itself.',
    wine: 'Hatten Tunjung Brut Sparkling',
    wineInfo: {
      type: 'Sparkling Wine',
      region: 'Bali, Indonesia',
      notes: 'Bright citrus and orchard fruit move easily alongside the snapper, lifting its natural freshness. The bubbles keep everything light and in motion, echoing the clarity of the dish. A gentle creaminess settles at the end, softening the crisp rice and bringing the elements into balance.',
      servingTemp: '6–10°C',
    },
    image: 'assets/images/snapper.png',
    ingredientsImage: 'assets/ingredients/snapper-ingredients.png',
    labTitle: 'Inside the Dish',
    labQuote:
      '"The sea meets the forest: bright citrus and torch ginger lift the cool, clean snapper, while crisp rice adds warmth and texture."',
    ingredients: [
      {
        id: 'snapper-fish',
        specimen: 'Specimen A',
        name: 'Snapper',
        description:
          'Ruby snapper sourced from pristine Indonesian waters. Its delicate, flaky white flesh absorbs aromatics beautifully, making it ideal for two distinct preparations — raw cure and crispy fry.',
      },
      {
        id: 'torch-ginger',
        specimen: 'Specimen B',
        name: 'Torch Ginger',
        description:
          'Known locally as Bunga Kecombrang, this floral rhizome carries a complex fragrance — simultaneously tart, spiced, and floral. It is the defining aromatic signature of this dish.',
      },
      {
        id: 'snake-fruit',
        specimen: 'Specimen C',
        name: 'Snake Fruit',
        description:
          'Salak — named for its reptilian scales — delivers a sweet-tart crunch unique to Southeast Asia. Its astringency bridges the gap between the cured fish and the bright citrus coulis.',
      },
      {
        id: 'kaffir-lime',
        specimen: 'Specimen D',
        name: 'Kaffir Lime',
        description:
          'Both zest and leaf are used to craft the vibrant coulis that finishes each plate. The double-lobed leaves release an intensely aromatic, floral citrus oil that elevates every element.',
      },
    ],
  },
  {
    id: 'lamb',
    course: 'Main Course',
    stage: 'Second Course',
    name: 'Indonesian Lamb Shank, Two Ways',
    description:
      'Deeper in, the forest shifts. The air is warmer, carrying the scent of fire and slow cooking, where time takes over and ingredients are not rushed but allowed to develop. Lamb moves easily in this space, holding up to heat, spice, and time. One is braised, building depth and tenderness, while the other is rolled, more controlled, holding its structure while concentrating its flavor. A course shaped by patience, where richness forms gradually, layer by layer.',
    wine: 'Hatten Aga Red',
    wineInfo: {
      type: 'Red Wine, Light-Bodied',
      region: 'Bali, Indonesia',
      notes: 'Juicy berries and soft spice move easily alongside the lamb, echoing the warmth of the maranggi and gulai. Its lighter structure keeps the dish from feeling heavy, allowing the flavors to stay open and balanced. A gentle savory edge lingers, tying the richness together without weight.',
      servingTemp: '13°C',
    },
    image: 'assets/images/lamb.png',
    ingredientsImage: 'assets/ingredients/lamb-ingredients.png',
    labTitle: 'Inside the Dish',
    labQuote:
      '"Slow fire and ancient spice transform humble shank into something primordial — the soul of the Indonesian kitchen."',
    ingredients: [
      {
        id: 'lamb-shank',
        specimen: 'Specimen A',
        name: 'Lamb Shank',
        description:
          'Slow-braised for hours until the collagen transforms into a rich, silky gelatin. Presented two ways — as a tightly rolled roulade and as meranggi, a compressed braised form with intense, concentrated flavour.',
      },
      {
        id: 'cassava-leaves',
        specimen: 'Specimen B',
        name: 'Cassava Leaves',
        description:
          'Young cassava leaves, slow-cooked into buntil — a traditional Javanese preparation in which the leaves enclose a spiced coconut filling. They contribute a vegetal depth that balances the richness of the lamb.',
      },
      {
        id: 'sweet-potato',
        specimen: 'Specimen C',
        name: 'Sweet Potato',
        description:
          'Local sweet potato forms the croquette alongside ground lamb — its natural sweetness cutting through the savouriness of the gulai spice emulsion and providing textural contrast as a crisp exterior yields to a creamy centre.',
      },
      {
        id: 'gulai-spices',
        specimen: 'Specimen D',
        name: 'Gulai Spices',
        description:
          'A complex archipelago spice blend of turmeric, galangal, lemongrass, coriander and candlenut, slow-bloomed in coconut milk. The gulai emulsion that crowns the plate is the distilled essence of centuries of Indonesian culinary tradition.',
      },
    ],
  },
  {
    id: 'chocolate',
    course: 'Dessert',
    stage: 'Third Course',
    name: 'Symphony of Valrhona, Sakanti Chocolate',
    description:
      'The forest begins to open, and the path comes to an end. The air feels lighter as what was deep and layered settles into place, like the final notes of a composition. Chocolate closes the experience as a quiet symphony, each element moving with intention, balanced with brightness and gentle acidity, carrying the depth of what came before. A final harmony that lingers, leaving a lasting impression.',
    wine: 'Hatten Sweet Alexandria',
    wineInfo: {
      type: 'White Wine, Semi-Sweet',
      region: 'Bali, Indonesia',
      notes: 'Tropical fruit and soft floral notes move easily through the dessert, echoing the brightness of citrus and passion fruit. Its gentle sweetness lifts the chocolate without weighing it down, while a fresh acidity keeps everything in balance. It lingers lightly, carrying the final notes of the dish into a clean, lasting finish.',
      servingTemp: '7–10°C',
    },
    image: 'assets/images/chocolate.png',
    ingredientsImage: 'assets/ingredients/chocolate-ingredients.png',
    labTitle: 'Inside the Dish',
    labQuote:
      '"A study of the earth\'s deepest treasures: intense cocoa bodies paired with the acidic brightness of the forest canopy."',
    ingredients: [
      {
        id: 'chocolate',
        specimen: 'Specimen A',
        name: 'Valrhona Sakanti',
        description:
          "Valrhona's Sakanti origin chocolate brings a distinctive Indonesian terroir to the dessert — notes of dried fruit, spice and forest floor, expressing the unique flavour profile of East Java's cacao.",
      },
      {
        id: 'cassava',
        specimen: 'Specimen B',
        name: 'Cassava',
        description:
          'Fermented cassava (tape singkong) introduces a subtle tang and complexity beneath the chocolate mousse. The fermentation process generates natural sugars and acids that create a counterpoint to the Sakanti\'s bitterness.',
      },
      {
        id: 'lemongrass',
        specimen: 'Specimen C',
        name: 'Lemongrass',
        description:
          'Infused into the cremieux, lemongrass contributes a herbal, floral brightness — an aromatic bridge between the earthiness of the chocolate and the tropical acidity of the passion fruit component.',
      },
      {
        id: 'passion-fruit',
        specimen: 'Specimen D',
        name: 'Passion Fruit',
        description:
          'Passion fruit provides the final aromatic lift — its bold tropical acidity and floral perfume cutting through the richness of the mousse and bringing the dessert to a vivid, sunlit finish.',
      },
    ],
  },
];

/* Nav icon mapping per course */
const NAV_ICONS = {
  snapper: 'set_meal',
  lamb: 'restaurant',
  chocolate: 'icecream',
};

/* ============================================================
   APPLICATION STATE
   ============================================================ */

const AppState = {
  currentPage: 'loading',   // 'loading' | 'invitation' | 'menu' | 'detail'
  currentCourse: null,       // course id string
  modalOpen: false,
  swipeStartX: null,
  swipeStartY: null,
};

/* ============================================================
   DOM REFERENCES
   ============================================================ */

const DOM = {
  pages: {},
  transition: null,
  modal: null,
  modalOverlay: null,
  wineModal: null,
  wineModalOverlay: null,
  bottomNav: null,
};

/* ============================================================
   INITIALIZATION
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  cacheDOMRefs();
  LeafSystem.init();
  bindGlobalEvents();

  // Show loading briefly, then reveal invitation
  setTimeout(() => showPage('invitation'), 600);
});

function cacheDOMRefs() {
  DOM.pages = {
    loading: document.getElementById('page-loading'),
    invitation: document.getElementById('page-invitation'),
    menu: document.getElementById('page-menu'),
    detail: document.getElementById('page-detail'),
  };
  DOM.transition = document.getElementById('page-transition');
  DOM.modal = document.getElementById('ingredient-modal');
  DOM.modalOverlay = document.getElementById('ingredient-modal-overlay');
  DOM.wineModal = document.getElementById('wine-modal');
  DOM.wineModalOverlay = document.getElementById('wine-modal-overlay');
  DOM.bottomNav = document.getElementById('bottom-nav');
}

/* ============================================================
   PAGE NAVIGATION
   ============================================================ */

/**
 * Navigate to a page by name.
 * @param {string} pageId - One of: 'invitation', 'menu', 'detail'
 * @param {object} [opts] - Options (e.g. { courseId: 'snapper' })
 */
function showPage(pageId, opts = {}) {
  const prevPage = AppState.currentPage;

  // Run transition animation
  pageTransitionRun(() => {
    // Deactivate all pages
    Object.values(DOM.pages).forEach((el) => {
      if (el) {
        el.classList.remove('active');
        el.classList.add('exit');
      }
    });

    const targetPage = DOM.pages[pageId];
    if (!targetPage) return;

    setTimeout(() => {
      // Clean up exit class from all pages
      Object.values(DOM.pages).forEach((el) => {
        if (el) el.classList.remove('exit');
      });

      // Activate target
      targetPage.classList.add('active');
      AppState.currentPage = pageId;

      // Page-specific setup
      if (pageId === 'menu') {
        renderMenu();
        animateMenuCards();
      } else if (pageId === 'detail') {
        const courseId = opts.courseId || AppState.currentCourse || 'snapper';
        AppState.currentCourse = courseId;
        renderDetail(courseId);
      }

      // Show/hide bottom nav
      DOM.bottomNav.style.display = pageId === 'detail' ? 'flex' : 'none';

      // Scroll the page element itself to top (each page is its own scroll container)
      targetPage.scrollTop = 0;
    }, 50);
  });
}

/**
 * Run the curtain transition animation.
 * @param {Function} callback - Called at the midpoint of the transition
 */
function pageTransitionRun(callback) {
  const el = DOM.transition;
  el.classList.remove('entering', 'leaving');

  // Phase 1: sweep in
  el.classList.add('entering');
  el.style.pointerEvents = 'all';

  setTimeout(() => {
    callback();

    // Phase 2: sweep out
    el.classList.remove('entering');
    el.classList.add('leaving');

    setTimeout(() => {
      el.classList.remove('leaving');
      el.style.pointerEvents = 'none';
    }, 450);
  }, 450);
}

/* ============================================================
   MENU PAGE — RENDER
   ============================================================ */

function renderMenu() {
  const container = document.getElementById('menu-cards-container');
  if (!container) return;

  container.innerHTML = '';

  COURSES.forEach((course, index) => {
    const card = createDishCard(course, index);
    container.appendChild(card);
  });
}

function createDishCard(course, index) {
  const card = document.createElement('article');
  card.className = 'dish-card';
  card.setAttribute('data-course-id', course.id);
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');
  card.setAttribute('aria-label', `View ${course.name}`);
  card.style.transitionDelay = `${index * 100}ms`;

  card.innerHTML = `
    <div class="dish-card-image-wrap">
      <img
        class="dish-card-img"
        src="${course.image}"
        alt="${course.name}"
        loading="${index === 0 ? 'eager' : 'lazy'}"
      />
      <div class="dish-chapter-badge">${course.stage}</div>
    </div>
    <div class="dish-card-body">
      <span class="dish-course-label">${course.course}</span>
      <h3 class="dish-name">${course.name}</h3>
      <span class="dish-wine">
        <svg class="dish-wine-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M8 3h8l-1.5 8.5A4 4 0 0 1 8 11.5h0A4 4 0 0 1 5.5 8L8 3z"/>
          <line x1="12" y1="11.5" x2="12" y2="20"/>
          <line x1="8" y1="20" x2="16" y2="20"/>
        </svg>
        ${course.wine}
      </span>
    </div>
    <div class="dish-card-cta">
      <span>Explore Course</span>
      <span class="dish-card-cta-arrow">→</span>
    </div>
  `;

  // Click / keyboard nav
  const navigate = () => showPage('detail', { courseId: course.id });
  card.addEventListener('click', navigate);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      navigate();
    }
  });

  return card;
}

function animateMenuCards() {
  const cards = document.querySelectorAll('.dish-card');
  // Intersection Observer for staggered entrance
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  cards.forEach((card) => observer.observe(card));
}

/* ============================================================
   DETAIL PAGE — RENDER
   ============================================================ */

function renderDetail(courseId) {
  const course = COURSES.find((c) => c.id === courseId);
  if (!course) return;

  const detail = DOM.pages.detail;

  // Stage tag
  detail.querySelector('[data-detail="stage-tag"]').textContent = course.stage;

  // Title
  detail.querySelector('[data-detail="title"]').textContent = course.name;

  // Hero image
  const heroImg = detail.querySelector('[data-detail="hero-img"]');
  heroImg.src = course.image;
  heroImg.alt = course.name;

  // Wine pairing — make pill clickable
  detail.querySelector('[data-detail="wine"]').textContent = course.wine;
  const winePill = detail.querySelector('.wine-pairing-pill');
  if (winePill) {
    winePill.style.cursor = 'pointer';
    winePill.onclick = () => openWineModal(course);
  }

  // Description
  detail.querySelector('[data-detail="description"]').textContent = course.description;

  // Lab title
  detail.querySelector('[data-detail="lab-title"]').textContent = course.labTitle;

  // Lab quote
  detail.querySelector('[data-detail="lab-quote"]').textContent = course.labQuote;

  // Ingredient center image
  const ingImg = detail.querySelector('[data-detail="ingredient-img"]');
  ingImg.src = course.ingredientsImage;
  ingImg.alt = `Ingredients for ${course.name}`;

  // Render ingredient labels (desktop: left 2 / right 2)
  const leftContainer = detail.querySelector('[data-detail="ingredients-left"]');
  const rightContainer = detail.querySelector('[data-detail="ingredients-right"]');
  const mobileGrid = detail.querySelector('[data-detail="ingredients-mobile"]');

  leftContainer.innerHTML = '';
  rightContainer.innerHTML = '';
  mobileGrid.innerHTML = '';

  course.ingredients.forEach((ing, i) => {
    // Desktop label
    const label = document.createElement('div');
    label.className = 'ingredient-label';
    label.innerHTML = `
      <span class="ingredient-specimen">${ing.specimen}</span>
      <span class="ingredient-name">${ing.name}</span>
    `;
    label.addEventListener('click', () => openIngredientModal(ing));

    if (i < 2) {
      leftContainer.appendChild(label);
    } else {
      rightContainer.appendChild(label);
    }

    // Mobile chip
    const chip = document.createElement('div');
    chip.className = 'ingredient-mobile-chip';
    chip.innerHTML = `
      <span class="ingredient-mobile-specimen">${ing.specimen}</span>
      <span class="ingredient-mobile-name">${ing.name}</span>
    `;
    chip.addEventListener('click', () => openIngredientModal(ing));
    mobileGrid.appendChild(chip);
  });

  // Update bottom nav active state
  updateBottomNav(courseId);

  // Update course nav dots
  updateCourseDots(courseId);
}

/* ============================================================
   BOTTOM NAVIGATION
   ============================================================ */

function updateBottomNav(activeCourseId) {
  const navItems = DOM.bottomNav.querySelectorAll('.nav-item');
  navItems.forEach((item) => {
    const itemId = item.getAttribute('data-course-id');
    if (itemId === activeCourseId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

function buildBottomNav() {
  const nav = document.getElementById('bottom-nav');
  if (!nav) return;

  nav.innerHTML = '';

  COURSES.forEach((course) => {
    const item = document.createElement('div');
    item.className = 'nav-item';
    item.setAttribute('data-course-id', course.id);
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', course.course);

    item.innerHTML = `
      <span class="material-symbols-outlined nav-icon">${NAV_ICONS[course.id]}</span>
      <span class="nav-label">${course.course}</span>
    `;

    const navigate = () => {
      if (AppState.currentPage === 'detail') {
        AppState.currentCourse = course.id;
        renderDetail(course.id);
        DOM.pages.detail.scrollTop = 0;
      } else {
        showPage('detail', { courseId: course.id });
      }
    };

    item.addEventListener('click', navigate);
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        navigate();
      }
    });

    nav.appendChild(item);
  });
}

/* ============================================================
   COURSE NAV DOTS
   ============================================================ */

function buildCourseDots() {
  const dotsContainer = document.getElementById('course-nav-dots');
  if (!dotsContainer) return;

  dotsContainer.innerHTML = '';

  COURSES.forEach((course) => {
    const dot = document.createElement('div');
    dot.className = 'course-nav-dot';
    dot.setAttribute('data-course-id', course.id);
    dot.setAttribute('role', 'button');
    dot.setAttribute('aria-label', course.course);

    dot.addEventListener('click', () => {
      AppState.currentCourse = course.id;
      renderDetail(course.id);
      DOM.pages.detail.scrollTop = 0;
    });

    dotsContainer.appendChild(dot);
  });
}

function updateCourseDots(activeCourseId) {
  const dots = document.querySelectorAll('.course-nav-dot');
  dots.forEach((dot) => {
    dot.classList.toggle('active', dot.getAttribute('data-course-id') === activeCourseId);
  });
}

function openWineModal(course) {
  if (!DOM.wineModal || !DOM.wineModalOverlay) return;

  DOM.wineModal.querySelector('[data-wine-modal="name"]').textContent = course.wine;
  DOM.wineModal.querySelector('[data-wine-modal="type"]').textContent = course.wineInfo.type;
  DOM.wineModal.querySelector('[data-wine-modal="region"]').textContent = course.wineInfo.region;
  DOM.wineModal.querySelector('[data-wine-modal="temp"]').textContent = course.wineInfo.servingTemp;
  DOM.wineModal.querySelector('[data-wine-modal="notes"]').textContent = course.wineInfo.notes;

  DOM.wineModalOverlay.classList.add('open');
  DOM.wineModal.querySelector('.btn-modal-close').focus();
  DOM.pages.detail.style.overflow = 'hidden';
}

function closeWineModal() {
  if (!DOM.wineModalOverlay) return;
  DOM.wineModalOverlay.classList.remove('open');
  DOM.pages.detail.style.overflow = '';
}

/* ============================================================
   INGREDIENT MODAL
   ============================================================ */

function openIngredientModal(ingredient) {
  if (!DOM.modal || !DOM.modalOverlay) return;

  DOM.modal.querySelector('[data-modal="specimen"]').textContent = ingredient.specimen;
  DOM.modal.querySelector('[data-modal="name"]').textContent = ingredient.name;
  DOM.modal.querySelector('[data-modal="desc"]').textContent = ingredient.description;

  DOM.modalOverlay.classList.add('open');
  AppState.modalOpen = true;

  // Trap focus
  DOM.modal.querySelector('.btn-modal-close').focus();

  // Prevent page scroll while modal is open
  DOM.pages.detail.style.overflow = 'hidden';
}

function closeIngredientModal() {
  if (!DOM.modalOverlay) return;
  DOM.modalOverlay.classList.remove('open');
  AppState.modalOpen = false;
  DOM.pages.detail.style.overflow = '';
}

/* ============================================================
   SWIPE GESTURE (course navigation)
   ============================================================ */

function bindSwipeGestures(el) {
  el.addEventListener('touchstart', (e) => {
    AppState.swipeStartX = e.touches[0].clientX;
    AppState.swipeStartY = e.touches[0].clientY;
  }, { passive: true });

  el.addEventListener('touchend', (e) => {
    if (AppState.swipeStartX === null) return;

    const dx = e.changedTouches[0].clientX - AppState.swipeStartX;
    const dy = e.changedTouches[0].clientY - AppState.swipeStartY;

    // Only trigger on predominantly horizontal swipe with enough distance
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      const currentIdx = COURSES.findIndex((c) => c.id === AppState.currentCourse);
      let nextIdx;

      if (dx < 0) {
        // Swipe left → next course
        nextIdx = (currentIdx + 1) % COURSES.length;
      } else {
        // Swipe right → prev course
        nextIdx = (currentIdx - 1 + COURSES.length) % COURSES.length;
      }

      AppState.currentCourse = COURSES[nextIdx].id;
      renderDetail(COURSES[nextIdx].id);
      DOM.pages.detail.scrollTop = 0;
    }

    AppState.swipeStartX = null;
    AppState.swipeStartY = null;
  }, { passive: true });
}

/* ============================================================
   GLOBAL EVENTS
   ============================================================ */

function bindGlobalEvents() {
  // Open invitation button
  document.getElementById('btn-open-invitation')?.addEventListener('click', () => {
    showPage('menu');
  });

  // Back button from detail to menu
  document.getElementById('btn-back-to-menu')?.addEventListener('click', () => {
    showPage('menu');
  });

  // Modal close
  document.getElementById('btn-modal-close')?.addEventListener('click', closeIngredientModal);

  DOM.modalOverlay?.addEventListener('click', (e) => {
    if (e.target === DOM.modalOverlay) closeIngredientModal();
  });

  // Wine modal close
  document.getElementById('btn-wine-modal-close')?.addEventListener('click', closeWineModal);

  DOM.wineModalOverlay?.addEventListener('click', (e) => {
    if (e.target === DOM.wineModalOverlay) closeWineModal();
  });

  // Escape key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (AppState.modalOpen) closeIngredientModal();
      closeWineModal();
    }
  });

  // Build bottom nav and course dots
  buildBottomNav();
  buildCourseDots();

  // Swipe on detail page
  const detailPage = DOM.pages.detail;
  if (detailPage) bindSwipeGestures(detailPage);
}

/* ============================================================
   LEAF SYSTEM — Ambient Animation
   ============================================================ */

const LeafSystem = {
  container: null,
  leaves: [],
  leafColors: ['#7a9e6b', '#556349', '#a7b698', '#8fad80', '#c5d4b8'],

  // SVG leaf shapes
  leafShapes: [
    // Oval leaf
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 60">
      <path d="M20 2 C30 15 35 35 20 58 C5 35 10 15 20 2Z" fill="FILL_COLOR" opacity="0.7"/>
    </svg>`,
    // Fern frond
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 60">
      <path d="M15 58 Q5 40 8 20 Q15 5 15 2 Q15 5 22 20 Q25 40 15 58Z" fill="FILL_COLOR" opacity="0.6"/>
      <path d="M15 30 Q5 25 3 20" stroke="FILL_COLOR" stroke-width="1" fill="none" opacity="0.4"/>
      <path d="M15 40 Q25 35 27 30" stroke="FILL_COLOR" stroke-width="1" fill="none" opacity="0.4"/>
    </svg>`,
    // Round leaf
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
      <ellipse cx="25" cy="25" rx="20" ry="15" fill="FILL_COLOR" opacity="0.5" transform="rotate(-30 25 25)"/>
    </svg>`,
  ],

  init() {
    this.container = document.getElementById('leaf-container');
    if (!this.container) return;

    // Create leaf elements
    for (let i = 0; i < 8; i++) {
      this.createLeaf(i * 1200);
    }
  },

  createLeaf(initialDelay = 0) {
    const leafDiv = document.createElement('div');
    leafDiv.className = 'leaf';

    const shape = this.leafShapes[Math.floor(Math.random() * this.leafShapes.length)];
    const color = this.leafColors[Math.floor(Math.random() * this.leafColors.length)];
    const size = 16 + Math.random() * 20;
    const leftPos = Math.random() * 100;
    const duration = 12000 + Math.random() * 10000;
    const delay = initialDelay + Math.random() * 5000;

    leafDiv.style.cssText = `
      left: ${leftPos}%;
      top: -60px;
      width: ${size}px;
      height: ${size}px;
      animation-duration: ${duration}ms;
      animation-delay: ${delay}ms;
    `;

    leafDiv.innerHTML = shape.replace(/FILL_COLOR/g, color);

    this.container.appendChild(leafDiv);

    // Restart after animation completes
    leafDiv.addEventListener('animationend', () => {
      leafDiv.remove();
      this.createLeaf(0);
    });
  },
};
