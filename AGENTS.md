This is an Expo and React Native mobile application. Prioritise mobile-first patterns, performance, and cross-platform compatibility.

## Expo updates and training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned documentation: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch `https://docs.expo.dev/llms.txt`. It is an index of all Expo documentation with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

Use `bunx` instead of `npx` if the project uses Bun (`bun.lock` present).

- `npx expo install <package>`: ALWAYS use instead of `npm`/`yarn`/`pnpm`/`bun add`: resolves SDK-compatible versions.
- `npx expo start`: Start the dev server.
- `npx expo lint`: Run linting.
- `npx tsc --noEmit`: Run type checks.
- `npx expo-doctor`: Diagnose dependency and configuration issues.
- `npx expo install --fix`: Fix incompatible package versions.

Run linting and type checking before declaring any task done.

## Navigation and routing

Use Expo Router for all navigation. Routes live in `src/app/`; every file there is a screen, and `_layout.tsx` files define navigators. Keep non-route code (components, hooks, utilities) outside `src/app/`.

Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`.

Documentation: `https://docs.expo.dev/router/introduction.md`

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`), with no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in documentation examples.

Documentation: `https://docs.expo.dev/eas/index.md`

## Rules

If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand; configure native behaviour in `app.json` and configuration plugins.

Expo Go only includes its bundled native modules. After adding a library with native code, the app needs a development build: `npx expo run:ios|android` locally, or `eas build --profile development`.

Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Documentation: `https://docs.expo.dev/versions/latest/index.md`

## Project conventions

- **Data model**: `src/types/models.ts` mirrors the entities in `uml.md`. Any schema change starts there, not in a screen file.
- **Dummy data**: Lives in `src/data/` until persistence is added. Treated as the temporary stand-in for a database. Do not allow UI code to assume it is real.
- **Screens**: One commit per screen (see `TODO.md` for the build order). Screen files in `src/app/` follow the S-IDs from the design document navigation model.
- **Commits**: Lowercase, imperative, no full stop, terse. The diff explains itself. For example: `add car list screen`, not `Implement comprehensive car listing functionality`.
- **Build phases**: dummy data → in-memory state → AsyncStorage → SQLite → backend API (after lecture 4). Do not jump ahead a phase without updating `TODO.md`.

## AI use disclosure (course requirement)

This repository is built with AI assistance under the course design document AI policy. Drafting, scaffolding, and explanations may come from AI tools.

Prioritisation and scope decisions, cross-artifact consistency checks, and final design rationale are the team's own and are logged in Appendix A of the design document per session, not in this file.

## Tone and style constraints for AI models

When contributing code, documentation, commit messages, or responses in this repository, you must adhere strictly to the following language requirements:

1. **Spelling**: Use British English spelling throughout (for example: initialise, prioritise, behaviour, prioritisation, colour, standardise).
2. **No contractions**: Write out full words without contractions (for example: write "do not" instead of "don't", "it is" instead of "it's", "cannot" instead of "can't").
3. **No Latin abbreviations**: Do not use abbreviations such as "e.g.", "i.e.", "etc.", or "vs.". Write out full phrases (for example: "for example", "that is", "and so on", "versus").
4. **No em-dashes or punctuation tricks**: Do not use em-dashes (`—`), en-dashes (`–`), or double hyphens (`--`). Use colons, commas, or standard full stops to structure sentences.
5. **Explicit avoidance of AI tropes and buzzwords**:
    - Do not use flowery or overused AI vocabulary (for example: "delve", "tapestry", "seamless", "crucial", "robust", "landscape", "beacon", "game-changer", "fostering", "testament", "effortlessly", "elevate").
    - Do not use conversational setups or robotic meta-announcements (for example: "Here is the code", "In this document", "Let us dive in", "Certainly!").
    - Do not append unnecessary summary blocks, conclusion paragraphs, or polite sign-offs.

## AI logging protocol

After completing any significant task (generating code, setting up routes, refactoring, or writing tests), you must append an entry to `AI_LOG.md`.

1. **Interaction format**:
   Add a new row to the Interaction Log table in `AI_LOG.md`:
   `| A-# | <Date> | <Tool/Model> | <Task description> | "<Prompt used>" | <Verification method> | <Kept/Modified/Discarded> |`

2. **Failure format**:
   If you made an error during generation (for example, wrong spelling, invalid syntax, incorrect types, or breaking project rules) that required correction, add a row to the Failure Log table in `AI_LOG.md`:
   `| FL-# | <Description of error> | <How it was identified> | <Resolution> |`