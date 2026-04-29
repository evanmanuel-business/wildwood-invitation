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
        id: 'torch-ginger',
        specimen: 'Nature\’s Selection I',
        name: 'Torch Ginger',
        description:
          'A forest bloom, sharp and slightly wild. It cuts through cleanly, lifting the snapper and setting the tone of the dish.',
      },
      {
        id: 'tomato',
        specimen: 'Nature\’s Selection II',
        name: 'Tomato',
        description:
          'Soft and quietly expressive. Its acidity settles the sharper edges without taking focus.',
      },
      {
        id: 'cucumber',
        specimen: 'Nature\’s Selection III',
        name: 'Cucumber',
        description:
          'Cool and composed, like water in shade. It keeps the palate clear and resets each bite.',
      },
      {
        id: 'jicama',
        specimen: 'Nature\’s Selection IV',
        name: 'Jicama',
        description:
          'Crisp and steady, drawn from the earth. It gives structure without adding weight.',
      },
      {
        id: 'snake-fruit',
        specimen: 'Nature\’s Selection V',
        name: 'Snake Fruit',
        description:
          'Firm with a gentle tartness. An unexpected bite that keeps the dish from feeling too familiar.',
      },
      {
        id: 'kaffir-lime',
        specimen: 'Nature\’s Selection IV',
        name: 'Kaffir Lime',
        description:
          'Bright and precise. A clean finish that sharpens everything before it fades.',
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
        id: 'maranggi-spice',
        specimen: 'Nature\’s Selection I',
        name: 'Maranggi Spice',
        description:
          'From West Java, built slowly from shallots, garlic, coriander, galangal, ginger, and tamarind. Sweet soy and palm sugar deepen as they cook, settling into a warm, caramelized base.',
      },
      {
        id: 'cassava-leaves',
        specimen: 'Nature\’s Selection II',
        name: 'Cassava Leaves',
        description:
          'Slightly bitter and grounded. They hold the richness in place, preventing it from becoming too soft.',
      },
      {
        id: 'sweet-potato',
        specimen: 'Nature\’s Selection III',
        name: 'Sweet Potato',
        description:
          'Gentle and steady. Its natural sweetness rounds the intensity and carries the deeper flavors forward.',
      },
      {
        id: 'gulai-spices',
        specimen: 'Nature\’s Selection IV',
        name: 'Gulai',Slow and layered. Spice and richness come together over time, forming a depth that moves through the dish rather than sitting on top of it.',
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
        id: 'sakanti-chocolate',
        specimen: 'Nature\’s Selection I',
        name: 'Sakanti Chocolate',
        description:
          "The base note. Deep and composed, holding everything together without becoming heavy.",
      },
      {
        id: 'fermented-cassava',
        specimen: 'Nature\’s Selection II',
        name: 'Fermented Cassava',
        description:
          'A quiet contrast. Lightly tangy, it keeps the chocolate from settling too deeply.',
      },
      {
        id: 'lemongrass',
        specimen: 'Nature\’s Selection III',
        name: 'Lemongrass',
        description:
          'Subtle and aromatic. It moves through gently, connecting each element without drawing attention.',
      },
      {
        id: 'orange',
        specimen: 'Nature\’s Selection IV',
        name: 'Orange',
        description:
          'Clear and direct. A bright note that cuts through and brings everything into focus.',
      },
      {
        id: 'passion-fruit',
        specimen: 'Nature\’s Selection V',
        name: 'Passion Fruit',
        description:
          'More vibrant in tone. It introduces energy, keeping the composition from slowing.',
      },
      {
        id: 'kaffir-lime-dessert',
        specimen: 'Nature\’s Selection VI',
        name: 'Kaffir Lime',
        description:
          'The final lift. Clean and precise, leaving a light, lasting impression.',
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
        // Slight delay so the page is painted before observing
        setTimeout(initForestReveal, 120);
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
    // Desktop label (left/right columns — first 2 left, rest right)
    const label = document.createElement('div');
    label.className = 'ingredient-label';
    label.innerHTML = `
      <span class="ingredient-specimen">${ing.specimen}</span>
      <span class="ingredient-name">${ing.name}</span>
    `;
    label.addEventListener('click', () => openIngredientModal(ing));

    if (i < 2) {
      leftContainer.appendChild(label);
    } else if (i < 4) {
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
        const currentIdx = COURSES.findIndex((c) => c.id === AppState.currentCourse);
        const nextIdx = COURSES.findIndex((c) => c.id === course.id);
        const direction = nextIdx > currentIdx ? 'right' : 'left';
        AppState.currentCourse = course.id;
        renderDetail(course.id);
        DOM.pages.detail.scrollTop = 0;
        animateDetailTransition(direction);
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
      const currentIdx = COURSES.findIndex((c) => c.id === AppState.currentCourse);
      const nextIdx = COURSES.findIndex((c) => c.id === course.id);
      const direction = nextIdx > currentIdx ? 'right' : 'left';
      AppState.currentCourse = course.id;
      renderDetail(course.id);
      DOM.pages.detail.scrollTop = 0;
      animateDetailTransition(direction);
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
   SWIPE ANIMATION HELPER
   ============================================================ */

/**
 * Animate the detail swipe content wrapper when navigating courses.
 * @param {string} direction - 'left' (enter from left) or 'right' (enter from right)
 */
function animateDetailTransition(direction) {
  const swipeContent = DOM.pages.detail?.querySelector('.detail-swipe-content');
  if (!swipeContent) return;

  swipeContent.classList.remove('swipe-enter-right', 'swipe-enter-left');
  void swipeContent.offsetWidth; // force reflow
  swipeContent.classList.add(direction === 'right' ? 'swipe-enter-right' : 'swipe-enter-left');
  swipeContent.addEventListener('animationend', () => {
    swipeContent.classList.remove('swipe-enter-right', 'swipe-enter-left');
  }, { once: true });
}



function bindSwipeGestures(el) {
  // Helper to get the animated content wrapper
  const getSwipeContent = () => el.querySelector('.detail-swipe-content');

  el.addEventListener('touchstart', (e) => {
    AppState.swipeStartX = e.touches[0].clientX;
    AppState.swipeStartY = e.touches[0].clientY;
  }, { passive: true });

  el.addEventListener('touchmove', (e) => {
    if (AppState.swipeStartX === null) return;
    const dx = e.touches[0].clientX - AppState.swipeStartX;
    const dy = e.touches[0].clientY - AppState.swipeStartY;

    // Only show drag hint on predominantly horizontal swipes
    if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy) * 1.2) {
      el.classList.remove('swiping-left', 'swiping-right');
      if (dx < 0) {
        el.classList.add('swiping-left');
      } else {
        el.classList.add('swiping-right');
      }
    }
  }, { passive: true });

  el.addEventListener('touchend', (e) => {
    // Clear live-drag hint classes immediately
    el.classList.remove('swiping-left', 'swiping-right');

    if (AppState.swipeStartX === null) return;

    const dx = e.changedTouches[0].clientX - AppState.swipeStartX;
    const dy = e.changedTouches[0].clientY - AppState.swipeStartY;

    // Only trigger on predominantly horizontal swipe with enough distance
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      const currentIdx = COURSES.findIndex((c) => c.id === AppState.currentCourse);
      let nextIdx;
      let direction; // 'left' or 'right'

      if (dx < 0) {
        // Swipe left → next course
        nextIdx = (currentIdx + 1) % COURSES.length;
        direction = 'right'; // content enters from the right
      } else {
        // Swipe right → prev course
        nextIdx = (currentIdx - 1 + COURSES.length) % COURSES.length;
        direction = 'left'; // content enters from the left
      }

      AppState.currentCourse = COURSES[nextIdx].id;

      // Animate content out, update, then animate in
      const swipeContent = getSwipeContent();
      if (swipeContent) {
        // Remove any lingering animation classes
        swipeContent.classList.remove('swipe-enter-right', 'swipe-enter-left');

        // Render new content
        renderDetail(COURSES[nextIdx].id);
        DOM.pages.detail.scrollTop = 0;

        // Force reflow so the animation triggers fresh
        void swipeContent.offsetWidth;

        // Apply enter animation
        swipeContent.classList.add(direction === 'right' ? 'swipe-enter-right' : 'swipe-enter-left');

        // Clean up after animation completes
        swipeContent.addEventListener('animationend', () => {
          swipeContent.classList.remove('swipe-enter-right', 'swipe-enter-left');
        }, { once: true });
      } else {
        renderDetail(COURSES[nextIdx].id);
        DOM.pages.detail.scrollTop = 0;
      }
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

/* ============================================================
   FOREST TABLE SECTION — Scroll-reveal observer
   Fires when the menu page becomes active (visible)
   ============================================================ */

/**
 * Initialise IntersectionObserver for .forest-reveal elements.
 * Called once the menu page is shown so elements are in the DOM flow.
 */
function initForestReveal() {
  const reveals = document.querySelectorAll('.forest-reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // fire once
        }
      });
    },
    {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  reveals.forEach((el) => observer.observe(el));
}
