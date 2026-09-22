# AI Interaction and Failure Log

## Interaction log

| ID | Date | Tool and mode | Task | Prompt or link | Verification | Decision |
|---|---|---|---|---|---|---|
| A-1 | 2026-09-22 | Copilot, apply_patch | Generate TypeScript interfaces and enums from the UML data model | "Read uml.md and AGENTS.md. Generate src/types/models.ts with all TypeScript interfaces and enums represented in the UML diagram. Strictly follow AGENTS.md rules. After creating the file, append the corresponding rows to AI_LOG.md under the Interaction Log and Failure Log tables." | Reviewed against uml.md and TypeScript type checking | Kept |
| A-2 | 2026-09-22 | Copilot, apply_patch | Create typed dummy cars, features, and add-ons covering the UML enum and filtering values | "Read src/types/models.ts, uml.md, and AGENTS.md. Create src/data/dummyCars.ts containing mock data for cars (dummyCars), features (dummyFeatures), and add-ons (dummyAddOns). Ensure the mock data covers a variety of CarSize, GearType, FuelType, cross-border options, and environmental zone compliance. Strictly follow project constraints. After generating the file, append the corresponding row to AI_LOG.md under Interaction Log." | Reviewed against models.ts and UML requirements, then type checked | Kept |

## Failure log

## Failure log

| ID | What the AI got wrong | How we caught it | Fix or outcome |
|---|---|---|---|
| FL-01 | Agent attempted `npm uninstall eslint...` when checking linting rules. | Inspected agent tool logs and ran `git status` to verify project state. | Verified package files remained intact and added execution constraints to `AGENTS.md`. |