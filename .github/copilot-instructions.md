# Copilot Instructions — Clip

## Project Overview

Clip is a homelab dashboard application composed of multiple services orchestrated via Docker Compose.

### Services

| Service | Path | Tech |
|---------|------|------|
| **spa** | `spa/` | Angular 21, Angular Material 21, gridstack, TypeScript 5.9, SSR (Express + CommonEngine) |
| **apiserver** | `apiserver/` | Python, FastAPI |
| **agent** | `agent/` | .NET 8, C# |
| **migrations** | `migrations/` | SQL scripts applied by dotnet-badgie-migrator |
| **proxy** | `proxy/` | Nginx reverse proxy |
| **postgres** | — | PostgreSQL 16 |

## How to Build & Run

The project uses the `./clip` shortcut script in the repository root. It wraps `docker compose`:

```bash
# Start all dev services (builds if needed)
./clip dev up

# Start only the spa in dev mode (with watch/hot-reload)
./clip dev up spa

# View spa logs
./clip dev logs -f spa

# Run a command inside the spa container
./clip dev exec spa <command>

# Build a specific service
./clip dev build spa

# Production compose
./clip prod up
```

The `clip` script signature: `docker compose -f compose.base.yml -f compose.<env>.yml <args>`.

A `.env` file is required in the root (see `.env.example`).

### SPA-specific scripts

Inside the spa container (or via `./clip dev exec spa sh -c "..."`):

| Command | Purpose |
|---------|---------|
| `sh spa.sh dev` | Install deps + `ng serve` |
| `sh spa.sh build` | Install deps + `ng build` |
| `sh spa.sh prettify` | Format + lint |

Dependencies are managed with **yarn**.

## SPA Architecture & Conventions (Angular 21)

### Signals-first approach

- **State**: `signal()`, `computed()`, `linkedSignal()` — no BehaviorSubject.
- **Inputs**: `input()` / `input.required()` — never `@Input()`.
- **Outputs**: `output()` — never `@Output()` / `EventEmitter`.
- **Two-way binding**: `model()`.
- **Queries**: `viewChild()`, `viewChildren()`, `contentChildren()` — never decorators.
- **Side effects**: `effect()` with `onCleanup` for subscriptions.

### Dependency injection

- Always use `inject()` as a class field — never constructor parameter injection.

### Change detection

- Every component must use `ChangeDetectionStrategy.OnPush`.
- The app runs **zoneless** (`provideZonelessChangeDetection()`).

### Templates

- Use `@if {}`, `@else {}`, `@for (item of items; track item) {}`, `@switch` — never `*ngIf`, `*ngFor`, `[ngSwitch]`.
- Never import `CommonModule`. Import specific directives if needed (e.g., `NgTemplateOutlet`).

### Animations

- **Do not** use `@angular/animations` triggers in components.
- Use CSS transitions/keyframes defined in `src/styles/_animations.scss`.
- For enter animations on `@if` blocks, add a CSS class (e.g., `clip-fade-enter`).

### Domain models

- Shared interfaces, types, and DTOs live in `src/app/domain/` with a barrel export at `src/app/domain/index.ts`.

### HTTP

- Auth headers are handled by the functional `authInterceptor` in `src/app/interceptors/auth.interceptor.ts`.
- Services extend `BackendService` and should **not** manually set auth headers.

### Routing

- Resolvers are functional (`ResolveFn<T>`), not class-based.

### Lifecycle

- Prefer `constructor`, `effect()`, `afterNextRender()`, `afterRender()` — avoid `ngOnInit`, `ngAfterViewInit` etc.

### Sass

- Use `@use` instead of `@import` (Sass `@import` is deprecated).
- Use `calc()` for division — never bare `/`.
- Theme tokens are in `src/styles/tokens/`.
