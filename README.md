# 🛍️ Shopify Product Page Clone

# 📖 Overview

This project is a Shopify Product Page Clone built using HTML, CSS, and JavaScript as part of an assignment.
It replicates the design and interactive features of a real Shopify product page — including product image gallery, variant selection, size chart modal, bundle suggestions, and related product recommendations.
The layout is fully responsive, optimized for desktop and mobile screens, and uses modular, well-commented code.

#✨ Features Implemented

✅ 1. Scrollable Product Image Gallery

Main image area with side thumbnails.

Clicking a thumbnail updates the main image dynamically.

Thumbnails scroll horizontally when there are more than 4 images.

✅ 2. Size Chart Modal

“Size Chart” button opens a popup modal displaying size details.

The modal can be closed using the close button, clicking outside the box, or pressing the ESC key.

✅ 3. Product Variants

Colour swatches and Size dropdown for selecting variants.

Selected variant updates the product state (e.g., image preview or label).

✅ 4. Compare Colours Button

Opens a modal displaying side-by-side colour swatches for visual comparison.

✅ 5. Pairs Well With Section

A scrollable horizontal row of complementary product cards (image, title, price, and “Add to Cart” button).

✅ 6. Product Bundle Suggestion

Displays a static “Buy These Together” bundle with itemized prices and combined total.

Includes an Add Bundle to Cart button.

✅ 7. Product Info Tabs

Tabbed layout for Description, Product Information, and Shipping Details.

Tab switching handled via pure JavaScript (no external libraries).

✅ 8. Related Products Section

A 4-product grid showing image, product name, price, and optional badges (like “New” or “Popular”).

# 💻 Technical Stack

HTML5 for structure

CSS3 for layout and responsiveness

JavaScript (Vanilla) for interactivity

# 🚀 How to Run Locally

Clone or Download the Project

git clone https://github.com/yourusername/shopify-product-page-clone.git


Open the Project Folder

cd shopify-product-page-clone


Run Locally

Open index.html or shopify clone.html in your browser directly

OR use a local server (e.g., VS Code Live Server) to preview

Example URL: http://127.0.0.1:3000/shopify clone.html

# 📂 Folder Structure
shopify-product-page-clone/
│
├── index.html / shopify clone.html     # Main product page
│
├── css/
│   └── style.css                       # Main stylesheet
│
├── js/
│   └── script.js                       # Handles interactivity (tabs, modals, gallery, etc.)
│
├── assets/
│   ├── images/                         # Product and UI images
│   └── icons/                          # Optional icons
│
└── README.md                           # Project documentation

# 🧠 Additional Notes

The design focuses on clean UI, Shopify-like structure, and modern eCommerce experience.

All components (gallery, modals, tabs, bundles) are implemented using pure HTML/CSS/JS — no frameworks.

Fully responsive for desktop, tablet, and mobile devices.
