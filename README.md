# Car Rental App

A mobile application for browsing rental cars, viewing details, and placing bookings, built with offline-first support (see `uml.md` for the data model and synchronisation notes).

## Tech stack

- React Native (Expo)
- TypeScript
- Expo Router for navigation (routes in `src/app/`)
- Data layer: starting as an in-memory dictionary, moving to AsyncStorage, then SQLite (`expo-sqlite`) as persistence needs grow (see `TODO.md`)

## Getting started

1. Install Node.js LTS.
2. Install the Expo Go app on your phone (App Store or Play Store).
3. Clone this repository, then run:
   ```bash
   npm install
   npx expo start
   ```
4. Scan the QR code with Expo Go to run the application on your phone.

## Project structure

- `src/app/`: screens (Expo Router file-based routing)
- `src/types/`: TypeScript interfaces and enums for the data model
- `src/data/`: dummy data, later replaced by persistence or API layer
- `uml.md`: class diagram and data model notes
- `TODO.md`: build checklist, in commit-sized chunks
- `AGENTS.md`: coding conventions and Expo-specific guidance

## Status

Work in progress. See `TODO.md` for what is done and what is next.

## AI use disclosure

This project uses AI tools (Claude) for scaffolding, boilerplate, and explanations during development. Prioritisation, architecture decisions, and verification of AI-suggested claims remain the team's own work. Session-by-session disclosure is logged in the course design document, Appendix A.