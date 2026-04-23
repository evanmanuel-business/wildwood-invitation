# 🌿 Wildwood Paper — Culinary Invitation

A mobile-first interactive web invitation for an intimate forest-themed fine dining experience. Three courses, one immersive journey.

---

## ✨ Features

- **Invitation Opening Page** — Animated forest scene with wax seal and "Open Invitation" CTA
- **Main Menu Page** — Three dish cards (Appetizer, Main Course, Dessert) with smooth entrance animations
- **Course Detail Pages** — Reusable template with hero image, wine pairing, description, and interactive ingredient lab
- **Ingredient Modal** — Tap any ingredient to reveal a bottom-sheet popup with full description
- **Swipe Navigation** — Swipe left/right on detail pages to move between courses
- **Ambient Leaf Animation** — Floating leaves in the background
- **SPA Navigation** — No page reloads; smooth curtain transitions between views
- **Grain Texture Overlay** — Watercolor paper aesthetic throughout

---

## 🗂️ Folder Structure

```
/
├── index.html                  # Single-page app entry point
├── README.md                   # This file
├── css/
│   └── style.css               # All styles, design tokens, animations
├── js/
│   └── script.js               # SPA logic, data, animations, interactions
└── assets/
    ├── images/                 # Hero dish images (from Menu_Image.zip)
    │   ├── snapper.png
    │   ├── lamb.png
    │   └── chocolate.png
    ├── ingredients/            # Ingredient illustration images (from Menu_Image.zip)
    │   ├── snapper-ingredients.png
    │   ├── lamb-ingredients.png
    │   └── chocolate-ingredients.png
    └── icons/                  # Reserved for custom icon assets
```

---

## 🚀 Setup & Local Development

### Prerequisites
- Any modern browser (Chrome, Safari, Firefox, Edge)
- A local server (to avoid CORS issues with `file://` paths)

### Quick Start (Python)
```bash
# Clone or download the repository
cd wildwood-invitation

# Start a local server (Python 3)
python3 -m http.server 8080

# Open in browser
open http://localhost:8080
```

### Quick Start (Node.js / npx)
```bash
npx serve .
```

### Quick Start (VS Code)
Install the **Live Server** extension, then right-click `index.html` → **Open with Live Server**.

---

## 🖼️ Replacing Assets from ZIP Files

All images come from **Menu_Image.zip**. Replace them by copying your files into the correct location:

| ZIP File Content | → Destination |
|---|---|
| `Indonesian Two Ways of Snapper.png` | `assets/images/snapper.png` |
| `Indonesian Two Ways of Lamb Shank.png` | `assets/images/lamb.png` |
| `Symphony of Valrhona Sakanti Chocolate.png` | `assets/images/chocolate.png` |
| `Indonesian Two Ways of Snapper - Ingredients.png` | `assets/ingredients/snapper-ingredients.png` |
| `Indonesian Two Ways of Lamb Shank - Ingredients.png` | `assets/ingredients/lamb-ingredients.png` |
| `Symphony of Valrhona Sakanti Chocolate - Ingredients.png` | `assets/ingredients/chocolate-ingredients.png` |

**Important:** Keep the exact filenames listed above, or update the `image` and `ingredientsImage` paths inside the `COURSES` array in `js/script.js`.

---

## ✏️ Customising Content

All dish content is hardcoded in the `COURSES` array at the top of `js/script.js`. Each course object has:

```js
{
  id: 'snapper',                // Unique identifier (used for routing)
  course: 'Appetizer',          // Course label shown on cards
  stage: 'Chapter I — First Light',  // Chapter badge
  name: 'Indonesian Two Ways of Snapper',  // Full dish name
  description: '...',           // Short description paragraph
  wine: 'Sparkling Tunjung',    // Wine pairing name
  image: 'assets/images/snapper.png',   // Hero image path
  ingredientsImage: 'assets/ingredients/snapper-ingredients.png',
  labTitle: 'Specimen Lab — ...',  // Ingredient section heading
  labQuote: '"..."',            // Italicised lab footer quote
  ingredients: [                // Exactly 4 ingredients
    {
      id: 'snapper-fish',
      specimen: 'Specimen A',   // Label (A, B, C, D)
      name: 'Snapper',
      description: '...',       // Shown in ingredient modal
    },
    // ...
  ],
}
```

---

## 🐙 GitHub Repository Setup

### Step 1 — Initialise Git
```bash
cd wildwood-invitation
git init
git add .
git commit -m "Initial commit: Wildwood Paper culinary invitation"
```

### Step 2 — Create GitHub Repository
1. Go to [github.com/new](https://github.com/new)
2. Name the repository (e.g. `wildwood-invitation`)
3. Leave it **public** (required for free GitHub Pages)
4. Do **not** initialise with a README (you already have one)
5. Click **Create repository**

### Step 3 — Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/wildwood-invitation.git
git branch -M main
git push -u origin main
```

---

## 🌐 Deploy with GitHub Pages

### Option A — Via GitHub Settings (Recommended)
1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **Deploy from a branch**
4. Choose **Branch: main** / **Folder: / (root)**
5. Click **Save**
6. Wait ~60 seconds, then visit:
   ```
   https://YOUR_USERNAME.github.io/wildwood-invitation/
   ```

### Option B — GitHub CLI
```bash
gh repo create wildwood-invitation --public --source=. --push
gh api repos/YOUR_USERNAME/wildwood-invitation/pages -X POST -f source='{"branch":"main","path":"/"}'
```

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| HTML5 | Single-page application shell |
| CSS3 | Design tokens, animations, layout |
| Vanilla JavaScript (ES2020) | SPA routing, rendering, interactions |
| Google Fonts | Epilogue, Plus Jakarta Sans, Space Grotesk |
| Material Symbols | Icon system |
| SVG (inline) | Forest background, botanical illustrations |

No build tools, no frameworks, no dependencies to install. Works entirely from the filesystem.

---

## 📱 Browser Support

| Browser | Support |
|---|---|
| Chrome / Edge 90+ | ✅ Full |
| Safari 14+ | ✅ Full |
| Firefox 90+ | ✅ Full |
| iOS Safari 14+ | ✅ Full (safe-area insets supported) |

---

## 🎨 Design System

This project implements the **Wildwood Paper** design system:

- **Primary colour:** `#556349` (Forest Green)
- **Secondary CTA:** `#C48A64` (Terracotta)
- **Tertiary accent:** `#3f6375` (Misty Blue)
- **Background:** `#fcf9f1` (Parchment)
- **Typefaces:** Epilogue (display) · Plus Jakarta Sans (body) · Space Grotesk (mono/labels)

---

## 📝 License

Created for private event use. All dish names, descriptions, and wine pairings are fictional event content. Photography belongs to respective owners.
