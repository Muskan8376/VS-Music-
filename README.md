# Vusic Records - MERN Stack Web Application

A pixel-perfect, high-fidelity replication of the **Vusic Records** music distribution landing page with an atomic, modular component architecture and an Express REST API backend.

---

## 🎨 Design System & Visual Replicas

Built in strict compliance with the provided UI screenshots:
- **Header & Navbar**: Dark sticky navigation with the geometric red chevron Vusic logo, "FOR ARTISTS, BY ARTISTS" brand subtitle, "Pricing", "Login", and "Create New Account" CTA button.
- **Hero Section**:
  - Gradient backdrop: Lavender periwinkle to warm rose peach (`linear-gradient(135deg, #a4b4f5, #f5bdc7, #faaab9)`).
  - Eyebrow: *"Earn Money, Fans and Fame"*.
  - Large stacked typography: **Create / Upload / Monetize / Repeat.** in pure bold white text.
  - Subtitle: *"Vusic Records helps You (Artists) to make additional money by generating Revenue from Your Music worldwide..."*
  - CTA button: **"Start Now"** with subtle glow & elevation on hover.
  - Right card: Yellow viral campaign card for **"DIG SWIRL SPREAD"** featuring Deepika Padukone & Epigamia spreads.
- **Social Proof Bar**: Soft pink testimonial bar: *"Finally, A world-class Indian Music distribution company for Indians as well as global Artists"* with 5 golden stars and `(4.6/5)` rating.
- **Artists First Section**:
  - Eyebrow: *"Artists First"* in crimson red.
  - Title: *"How Vusic Records Help Artists, Labels, and Right Holders"*.
  - 7 Service Cards in a clean, responsive layout:
    1. `DISTRIBUTION`
    2. `PROMOTION`
    3. `MONETIZATION`
    4. `DATA & ANALYTICS`
    5. `MULTI LABEL MANAGEMENT`
    6. `AUTO PLAYLISTING AND PROMOTION`
    7. `TAKEDOWN OF ILLEGAL CONTENT`
- **Artists on Vusic Section**:
  - Dusty slate blue background (`#43587b`).
  - 6 featured playback singers in circular watercolor splatter frames with interactive audio preview toggles:
    - **SHAAN**
    - **JAVED A.**
    - **GEETHA M.**
    - **JUBIN N.**
    - **VIJAY P.**
    - **AMI M.**
- **Audio Distribution Section**:
  - Eyebrow: *"widest coverage"*, Title: *"Audio Distribution"*.
  - 5 Numbered Category Cards:
    - `1 SOCIAL APPS` (Instagram Reels, Facebook, Stories, TikTok, Snapchat, Moj)
    - `2 MOBILE NETWORK` (Jio, Airtel, Vodafone-Idea, BSNL)
    - `3 INDIAN AND POPULAR APPS` (Gaana, Wynk, JioSaavn, Spotify, Apple Music, etc.) — Featured elevation
    - `4 GLOBAL APPS` (Napster, Deezer, TIDAL, AWA, iHeart Radio, etc.)
    - `5 YOUTUBE SERVICES` (YT Music, YouTube Content ID)
- **Partner Streaming Logos**:
  - Gaana, Instagram, Wynk Music, Hungama, Resso, Spotify, JioSaavn.
- **Interactive Modals**:
  - Account Creation modal.
  - Artist Login modal.
  - Track Distribution submission onboarding modal.

---

## 📁 Component Architecture (100% Pure Tailwind CSS)

Every component is modular, reusable, and self-contained with Tailwind CSS utility classes directly inside its JSX (zero separate component `.css` files):

```text
client/src/
├── components/
│   ├── common/
│   │   ├── VusicLogo.jsx        # Brand logo with SVG chevron blades (Tailwind)
│   │   ├── Button.jsx           # Reusable button with variants & sizes (Tailwind)
│   │   ├── Modal.jsx            # Accessible modal dialog with backdrop blur (Tailwind)
│   │   ├── AuthModal.jsx        # Artist login & account creation modal (Tailwind)
│   │   └── StarRating.jsx       # Golden star rating component (Tailwind)
│   ├── layout/
│   │   ├── Navbar.jsx           # Sticky navigation & responsive drawer (Tailwind)
│   │   └── Footer.jsx           # Footer with links and copyright (Tailwind)
│   └── home/
│       ├── HeroSection.jsx      # Gradient hero & Epigamia card (Tailwind)
│       ├── SocialProofBar.jsx   # Testimonial rating strip (Tailwind)
│       ├── FeatureCard.jsx      # Reusable feature card (Tailwind)
│       ├── ArtistsFirstSection.jsx # 7-card feature grid (Tailwind)
│       ├── ArtistCard.jsx       # Clean artist avatar card, zero red overlays (Tailwind)
│       ├── ArtistsSection.jsx   # 6-artist dark blue showcase (Tailwind)
│       ├── DistributionCard.jsx # Numbered vertical card (Tailwind)
│       ├── AudioDistributionSection.jsx # Audio distribution section (Tailwind)
│       └── PartnersLogoBar.jsx  # Partner streaming platforms bar (Tailwind)
├── data/
│   ├── featuresData.js          # Features content
│   ├── artistsData.js           # Artists list (neutral watercolor tones)
│   ├── distributionData.js      # Channel list
│   └── partnersData.js          # Streaming partners data
├── index.css                    # Centralized Tailwind import (@import "tailwindcss") & font tokens
└── App.jsx                      # Root landing page composition (Tailwind)
```


---

## 🚀 Running the Project

### Frontend (React + Vite)
```bash
cd client
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

```text
server/
├── config/
│   ├── db.js                 # Database connection (MongoDB / In-memory fallback)
│   └── email.js              # Nodemailer transporter & SMTP configuration
├── models/
│   ├── User.js               # Artist profile model & user store
│   ├── Otp.js                # OTP model with TTL expiry
│   ├── Artist.js             # Featured artists model
│   ├── Track.js              # Track distribution submission model
│   └── Feature.js            # Features & services data model
├── services/
│   ├── emailService.js       # Reusable email service with HTML branded templates
│   ├── otpService.js         # 4-digit OTP generation, storage, and validation
│   └── authService.js        # User authentication and session tokens
├── controllers/
│   ├── authController.js     # Register, Login (OTP dispatch), Verify OTP, Resend OTP
│   ├── artistController.js   # Featured artists endpoints
│   ├── distributionController.js # Distribution channels & track submission
│   └── featureController.js  # "Artists First" capabilities data
├── routes/
│   ├── authRoutes.js         # /api/auth routes
│   ├── artistRoutes.js       # /api/artists routes
│   ├── distributionRoutes.js # /api/distribution routes
│   └── featureRoutes.js      # /api/features routes
├── middlewares/
│   └── errorHandler.js       # Centralized error handling middleware
├── data/
│   └── seedData.js           # Seed data for artists and channels
├── .env.example              # Environment variables template
├── app.js                    # Express app configuration & route mounting
└── server.js                 # Server entry point
```

---

## 🚀 Running the Project

### Frontend (React + Vite + Tailwind CSS)
```bash
cd client
npm run dev
```
Runs at [http://localhost:5173](http://localhost:5173).

### Backend (Modular Node + Express REST API)
```bash
cd server
node server.js
```
Runs at [http://localhost:5000](http://localhost:5000).

API Endpoints:
- `GET  /api/health` - Service health status
- `GET  /api/features` - Services & features
- `GET  /api/artists` - Featured artists
- `GET  /api/distribution` - Audio distribution channels
- `POST /api/auth/register` - Create artist account
- `POST /api/auth/login` - Initiate sign in & dispatch 4-digit email OTP
- `POST /api/auth/verify-otp` - Verify 4-digit code & complete sign in
- `POST /api/auth/resend-otp` - Resend new 4-digit code
- `POST /api/distribution/submit` - Submit music for worldwide distribution

