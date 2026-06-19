/**
 * Canonical version identifiers for the LedgerMind API.
 *
 * Add a new entry here when introducing a breaking-change version.
 * Controllers declare their supported version(s) via @ApiVersion().
 *
 * URI shape:  /api/v{version}/{module}/{route}
 *   e.g.      /api/v1/accounting/health
 *             /api/v2/accounting/transactions  (future)
 */
export enum ApiVersion {
  V1 = '1',
  // V2 = '2',  // uncomment when v2 controllers are introduced
}
