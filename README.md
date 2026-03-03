# Snack Dash (PWA Prototype)

## Overview

Snack Dash is a Next.js (App Router) Progressive Web App prototype
designed for a snack game community. The application is installable on
mobile devices, includes splash screens and app icons, and provides
offline functionality through a service worker.

This project explores: - Progressive Web App architecture -
Offline-first strategies - Client-Side Rendering (CSR) - Server-Side
Rendering (SSR) - Performance impact of different rendering strategies

------------------------------------------------------------------------

## What is a Progressive Web App (PWA)?

A Progressive Web App (PWA) is a web application that: - Can be
installed on a device like a native app - Uses a Web App Manifest for
metadata and splash screens - Uses a Service Worker for offline
functionality - Provides an app-like experience in the browser - Works
across devices and platforms

This project implements: - Installable manifest - Icons and splash
configuration - Service worker with caching strategies - Offline
fallback support

------------------------------------------------------------------------

## Features

-   PWA manifest + installable mobile icons
-   Splash screen configuration
-   Service worker generated via Workbox
-   Offline fallback page (/\~offline)
-   Runtime caching strategies
-   Cached ranking page for offline access
-   Client-side authentication flow using JWT
-   Profile updates and ranking system
-   Image uploads via Cloudinary
-   Lighthouse-tested performance

------------------------------------------------------------------------

## Tech Stack

-   Next.js (App Router)
-   React + MUI
-   Prisma ORM
-   PostgreSQL (Neon)
-   @ducanh2912/next-pwa (Workbox integration)
-   Cloudinary (image hosting)

------------------------------------------------------------------------

## Project Architecture

Client (Next.js UI - CSR) ↓ Route Handlers (/api/\*) ↓ Prisma ORM ↓
PostgreSQL (Neon)

Rendering strategy: - UI is primarily Client-Side Rendered - Backend
logic runs on the server through Route Handlers - Service Worker manages
offline caching

------------------------------------------------------------------------

## Installation & Local Development

1.  Install dependencies

npm install

2.  Configure environment variables

Copy .env.example → .env and fill in: - DATABASE_URL - JWT_SECRET -
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME -
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET - NEXT_PUBLIC_CLOUDINARY_FOLDER

3.  Run in development mode

npm run dev

Note: Service Worker is disabled in development mode.

4.  Run in production mode (required for PWA testing)

npm run build npm run start

Offline functionality works only in production mode.

------------------------------------------------------------------------

## Splash Screens & Installability

-   Manifest: public/manifest.json
-   Icons: public/icons/
-   iOS apple-touch-icon linked in src/app/layout.tsx

The app can be installed via "Add to Home Screen".

------------------------------------------------------------------------

## Service Worker & Offline Functionality

The service worker is generated in production builds and output to
public/sw.js.

Runtime caching rules: - /ranking → Network First - Page navigations →
Network Only with fallback to /\~offline - /api/user → Network First -
Dicebear avatars → Network First - Cloudinary images → Cache First

Offline behavior: - /ranking works offline after one online visit. -
Other routes show the offline fallback page. - Static assets are
precached.

------------------------------------------------------------------------

## CSR vs SSR Analysis

Client-Side Rendering (CSR): - Browser downloads JavaScript - UI
rendered after hydration - Navigation without full reload

Server-Side Rendering (SSR): - Server renders HTML per request - Faster
first paint - Client hydrates afterward

In this project: - UI rendering is primarily CSR - Backend logic runs
server-side via Route Handlers - Full HTML SSR is limited

------------------------------------------------------------------------

## CSR vs SSR Comparison

  Aspect                  CSR                     SSR
  ----------------------- ----------------------- --------------------
  HTML generated          Browser                 Server
  Initial load            Slower (JS-dependent)   Faster first paint
  SEO                     Moderate                Better
  Server load             Lower                   Higher
  Offline compatibility   Strong (with SW)        Depends on caching

------------------------------------------------------------------------

## Lighthouse Results (Local)

Home (/): - Performance: 72 - Accessibility: 88 - Best Practices: 73 -
SEO: 100

Ranking (/ranking): - Performance: 75 - Accessibility: 88 - Best
Practices: 77 - SEO: 100

Access (/access): - Performance: 74 - Accessibility: 85 - Best
Practices: 73 - SEO: 100

Performance scores are affected by CSR hydration cost and external image
loading.

------------------------------------------------------------------------

## Assignment Objectives Coverage

✔ Splash screens implemented\
✔ Service worker implemented\
✔ Offline functionality tested\
✔ CSR rendering implemented\
✔ Server-side backend logic implemented\
✔ CSR vs SSR documented\
✔ Lighthouse analysis performed

------------------------------------------------------------------------

## Challenges

-   Service Worker disabled in development mode
-   Offline caching requires initial online visit
-   Clear distinction between SSR and server-side APIs

------------------------------------------------------------------------

## Limitations

-   UI is primarily CSR
-   Offline does not support authenticated mutations
-   Performance varies by environment

------------------------------------------------------------------------

## Conclusion

Snack Dash demonstrates PWA architecture, offline-first implementation,
CSR rendering strategy, server-side backend logic, and performance
analysis using Lighthouse.
