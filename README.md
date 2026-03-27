# 💛 Need Help — Parenting Support Check-In

A warm, mobile-friendly check-in app for parents who need a moment of support. Built with Vite + React.

## What it does

Three simple screens guide parents through:
1. **How are you feeling?** — Overwhelmed, Frustrated, Exhausted, Anxious, or Doing okay
2. **What's going on?** — Tantrum, Not listening, Siblings fighting, Sleep issues, Disconnected, or Something else
3. **Personalized tips** — 2–3 warm, actionable suggestions based on their answers

---

## Getting Started

### Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
npm run preview
```

---

## Run on Replit

1. Import this repo into [Replit](https://replit.com) (New Repl → Import from GitHub)
2. Replit will detect the `.replit` config and run `npm run dev` automatically
3. Click **Run** — the app will be available on the Replit preview URL

The `replit.nix` file ensures Node.js 18 and npm are available in the Replit environment.

---

## Tech Stack

- **Vite** — fast dev server + build tool
- **React 18** — component-based UI
- **Pure CSS / inline styles** — no external UI libraries, fully self-contained
- **No backend** — 100% client-side, no data stored anywhere

---

## Project Structure

```
need-help/
├── index.html          # HTML entry point
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite configuration
├── .replit             # Replit run config
├── replit.nix          # Replit Nix environment
├── README.md           # This file
└── src/
    ├── main.jsx        # React root mount
    ├── App.jsx         # All screens + tip logic
    └── index.css       # Global base styles
```

---

## Customizing Tips

All tip mappings live in `src/App.jsx` inside the `TIPS_MAP` object. Each key is a `feeling → situation → [tips array]`. To add or change suggestions, just edit the arrays there — no other files need to change.

---

Made with 💛 for parents who are doing their best.
