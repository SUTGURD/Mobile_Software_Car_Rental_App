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

- [x] Write `src/types/models.ts` from `uml.md` (`User`, `Car`, `Booking`, `BookingAddOn`, `AddOn`, `Feature`, `CarSize`, `GearType`, `FuelType`, `BookingStatus`)
- [x] Commit: `add data model types for cars and bookings`
- [x] Write `src/data/dummyCars.ts` and dummy AddOns
- [x] Commit: `add dummy car and addon data`

## Session 3: Screens

- [x] Add design system tokens (colours, spacing, touch targets) in `src/constants/theme.ts`
- [x] Commit: `add design system tokens for theme spacing and touch targets` (`a97b4b4`)
- [x] Build car list screen (`src/app/index.tsx`) rendering dummy data
- [x] Commit: `add car list screen` (`7c4593e`)
- [x] Build car detail screen (`src/app/car/[id].tsx`)
- [x] Commit: `add car detail screen` (`7ca112b`)
- [x] Build checkout, confirmation, and my-bookings screens
- [x] Commit: `fix navigation layout and add checkout and bookings screens` (`cb70186`)

Note: the commit above also fixed the navigation layout. That work belonged
with Session 4 below, but the two changes were made together in one commit
rather than split apart. This is recorded here rather than corrected in git
history, to keep the log accurate about what actually happened.

## Session 4: Making it feel like an application

- [x] Wire `Link` or `router.push` between all screens per the navigation model
- [x] Commit: bundled into `cb70186` above, not a separate commit
- [ ] Add in-memory bookings state (array in state or Context)
- [ ] Commit: `track bookings in memory for the session`

## Session 4.5: Cleanup after external AI session

- [x] Remove unused Expo starter components left over from before the
  navigation rewrite (`app-tabs.tsx`, `app-tabs.web.tsx`, `hint-row.tsx`,
  `web-badge.tsx`, `collapsible.tsx`, `themed-text.tsx`,
  `themed-view.tsx`, `external-link.tsx`)
- [x] Trim legacy exports from `theme.ts` (`Colors`, `Fonts`, `Spacing`,
  `BottomTabInset`, `MaxContentWidth`, the unused `global.css` import),
  keeping only the design tokens the real screens use
- [x] Remove the orphaned `use-theme.ts` and `use-color-scheme.ts` hooks
  that only the deleted components referenced
- [x] Verify with `npx tsc --noEmit` and `npx expo lint`
- [x] Commit: `remove unused expo starter components, theme scaffolding, and orphaned hooks`
- [x] Reconcile `TODO.md` and `AI_LOG.md` with actual commit history
- [x] Commit: `reconcile todo and ai log with actual commit history`

## Session 5: First redesign and refactoring session

- [x] Add seat count to car cards
- [x] Commit `Add seat count to car cards` (`e4aade4`)
- [x] Centralise code for navigation bar
- [x] Commit `centralise navigation bar code` (`4206f64`)
- [x] Handle back button when navigation stack is empty
- [x] Commit `disable back button when no prior route exists` (`aabb00b`)

## Session 6: Separate home screen from car list screen

- [x] Move car list screen to `src/app/list/index.tsx`
- [x] Build home screen in `src/app/index.tsx`
- [x] Make a button in the home screen that navigates to the car list
- [x] Commit `add home screen and separate it from car list screen`

## Session 7: Error screen

- [x] Build error screen (`src/app/error.tsx`)
- [x] Catch screen and unmatched-route errors and redirect to the error screen
- [x] Commit: `add error screen and navigation error handling`

## Session 8: Login screen and state

- [x] Build login screen (`src/app/login/index.tsx`)
- [x] Commit: `add login screen`
- [x] Add expo-crypto
- [x] Write `src/data/dummyUsers.ts`
- [ ] Commit: `add expo-crypto and dummy user data`
- [ ] Create authentification context and useAuth hook
- [ ] Implement dummy credential validation using email and password hashes
- [ ] Make successful login update the authentification state
- [ ] Use useAuth to protect booking
- [ ] Commit: `add login authentification`
- [ ] Use useAuth to update the home screen with a logout button
- [ ] Commit: `add logout button`

## Later

- [ ] Swap dictionary for AsyncStorage, then SQLite (`expo-sqlite`)
- [ ] Add `syncStatus` field (`pending`, `synced`, or `failed`) and synchronisation queue with retry and backoff
- [ ] Build backend after lecture 4; swap dummy data source for real API calls
- [ ] Styling pass (Surface plane)
- [ ] Write tests from Gherkin acceptance criteria
- [ ] Log each AI-assisted session in Appendix A of the design document