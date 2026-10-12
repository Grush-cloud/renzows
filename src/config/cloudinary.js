/**
 * Cloudinary Configuration
 *
 * Set your cloud name here once and it applies everywhere.
 *
 * HOW TO FIND YOUR CLOUD NAME:
 * Log into cloudinary.com → it's shown at the top of your dashboard.
 *
 * FOLDER STRUCTURE TO CREATE IN CLOUDINARY:
 * ┌── events/            (folder names must match CATS in src/constants/index.js)
 * │   ├── corporate/
 * │   ├── wedding/
 * │   ├── private/
 * │   └── birthday/
 * └── sets/              (folder names must match SETS_CATS in src/constants/sets.js)
 *     ├── portraits/
 *     ├── fashion/
 *     ├── commercial/
 *     ├── editorial/
 *     └── props/
 *
 * For each asset, add context metadata in the Cloudinary dashboard:
 *   name → display name shown on the site
 *   cat  → category (matches folder name)
 */

export const CLOUD_NAME = 'dhicbu6mf' // ← replace this
