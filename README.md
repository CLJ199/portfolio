# Juan Cloete: project showcase

Live demos of the projects described in my portfolio: https://share.jotbird.com/sunny-mighty-javelina

Static HTML, CSS and JavaScript. No build step. Host the repository root with GitHub Pages (branch `main`, folder `/ (root)`).

## Contents
- `index.html`: landing page
- `games/`: pinball, battle game with AI opponent, two Tamagotchi versions, gear-ratio tool
- `study-guides/`: six interactive study guides with quizzes
- `intrinsic-designs/`: concept website for custom 3D prints (demo only)
- `booking-system/`: library booking prototype (demo only, data stays in the browser)
- `making/`: STL and SVG files from my CAD work

## Changes from the original project files
- Intrinsic Designs: the page loaded `script.ts`, which browsers cannot run. It now loads `script.js` (same logic, types removed). The price display bug (`$$ {estimate}`) is fixed, and the quote form no longer claims to email anyone.
- Booking system: the page linked `styles.css` but the file was `style.css`, so the styling never loaded. Renamed. Added a demo-only banner and escaped book titles before showing them.
