# API Versioning

LedgerMind uses **URI-based versioning** (NestJS `VersioningType.URI`).

## Route shape

```
/api/v{version}/{module}/{route}
```

### Live routes (v1)

| Method | Route                          |
|--------|-------------------------------|
| GET    | /api/v1/accounting/health     |
| GET    | /api/v1/treasury/health       |
| GET    | /api/v1/analytics/health      |
| GET    | /api/v1/ai/health             |
| GET    | /api/v1/reporting/health      |

## Adding a new version

### Option A — new routes on an existing module (most common)

1. Create `controllers/accounting.v2.controller.ts` next to the v1 controller.
2. Decorate it with `@ApiVersionDecorator(ApiVersion.V2)`.
3. Add the new controller to `AccountingModule.controllers`.
4. The v1 controller continues serving `/api/v1/...` unchanged.

```ts
// accounting.v2.controller.ts
@ApiVersionDecorator(ApiVersion.V2)
@Controller('accounting')
export class AccountingV2Controller {
  @Get('transactions')
  getTransactions() { ... }
}
```

### Option B — one handler supports multiple versions simultaneously

```ts
@ApiVersionDecorator(ApiVersion.V1, ApiVersion.V2)
@Get('health')
getHealth() { ... }
```

Use this when a new version doesn't actually change the endpoint behaviour.

### Option C — version at the route level (not the controller)

```ts
@ApiVersionDecorator(ApiVersion.V1)           // controller default
@Controller('accounting')
export class AccountingController {

  @Get('health')                               // inherits v1
  getHealth() { ... }

  @ApiVersionDecorator(ApiVersion.V2)          // overrides to v2 only
  @Get('transactions')
  getTransactions() { ... }
}
```

## Adding ApiVersion.V2 to the enum

Open `src/versioning/api-version.enum.ts` and uncomment (or add) the entry:

```ts
export enum ApiVersion {
  V1 = '1',
  V2 = '2',
}
```

That's the only global change needed — all controller decorators reference the
enum so nothing else needs updating at the call sites.
