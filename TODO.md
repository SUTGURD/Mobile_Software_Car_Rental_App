# Build checklist

Ordered, commit-sized. Check off as you go. "Later" items are intentionally deferred.

## Session 1: Setup

- [x] Install Node.js LTS and Expo Go app on phone
- [x] `npx create-expo-app@latest CarRentalApp`
- [x] `npx expo start`, confirm default screen loads on your phone
- [x] Commit: `scaffold project with expo and typescript template`

## Session 1.5: Housekeeping

- [x] Merge project conventions and AI disclosure into `AGENTS.md`
- [x] Replace default `README.md` with project-specific version
- [x] Add `TODO.md` to repository root
- [x] Add `.idea/` and `.vscode/` to `.gitignore`
- [x] Commit: `document project conventions and update readme`

## Session 2: Data shapes

- [X] Write `src/types/models.ts` from `uml.md` (`User`, `Car`, `Booking`, `BookingAddOn`, `AddOn`, `Feature`, `CarSize`, `GearType`, `FuelType`, `BookingStatus`)
- [X] Commit: `add data model types for cars and bookings`
- [ ] Write `src/data/dummyCars.ts` and dummy AddOns
- [ ] Commit: `add dummy car and addon data`

## Session 3: Screens

- [ ] Build car list screen (`src/app/index.tsx`) rendering dummy data
- [ ] Commit: `add car list screen`
- [ ] Build car detail screen (`src/app/car/[id].tsx`)
- [ ] Commit: `add car detail screen`
- [ ] Build booking screen and my-bookings screen
- [ ] Commit: `add booking and my-bookings screens`

## Session 4: Making it feel like an application

- [ ] Wire `Link` or `router.push` between all screens per the navigation model
- [ ] Commit: `connect screens with navigation links`
- [ ] Add in-memory bookings state (array in state or Context)
- [ ] Commit: `track bookings in memory for the session`

## Later

- [ ] Swap dictionary for AsyncStorage, then SQLite (`expo-sqlite`)
- [ ] Add `syncStatus` field (`pending`, `synced`, or `failed`) and synchronisation queue with retry and backoff
- [ ] Build backend after lecture 4; swap dummy data source for real API calls
- [ ] Styling pass (Surface plane)
- [ ] Write tests from Gherkin acceptance criteria
- [ ] Log each AI-assisted session in Appendix A of the design document