export class ModuleNotReadyError extends Error {
  readonly code = 'MODULE_NOT_READY';

  constructor(message = 'Module is not ready') {
    super(message);
  }
}
