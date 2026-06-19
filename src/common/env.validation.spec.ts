import { validateEnv } from './env.validation';

describe('validateEnv', () => {
  const ORIGINAL = process.env.DATABASE_URL;
  const ORIGINAL_STAGE = process.env.STAGE;
  const ORIGINAL_NODE_ENV = process.env.NODE_ENV;

  afterEach(() => {
    if (ORIGINAL === undefined) {
      delete process.env.DATABASE_URL;
    } else {
      process.env.DATABASE_URL = ORIGINAL;
    }
    if (ORIGINAL_STAGE === undefined) {
      delete process.env.STAGE;
    } else {
      process.env.STAGE = ORIGINAL_STAGE;
    }
    if (ORIGINAL_NODE_ENV === undefined) {
      delete process.env.NODE_ENV;
    } else {
      process.env.NODE_ENV = ORIGINAL_NODE_ENV;
    }
  });

  it('passes when DATABASE_URL is set', () => {
    delete process.env.STAGE;
    process.env.DATABASE_URL = 'postgresql://localhost/test';
    expect(() => validateEnv()).not.toThrow();
  });

  it('throws when DATABASE_URL is missing and no fallback env var is set', () => {
    delete process.env.DATABASE_URL;
    delete process.env.STAGE;
    delete process.env.NODE_ENV;
    expect(() => validateEnv()).toThrow(/Missing PostgreSQL connection string/);
  });

  it('resolves DATABASE_URL_DEV when STAGE=DEV and assigns DATABASE_URL', () => {
    delete process.env.DATABASE_URL;
    process.env.STAGE = 'DEV';
    process.env.DATABASE_URL_DEV = 'postgresql://localhost/dev';
    expect(() => validateEnv()).not.toThrow();
    expect(process.env.DATABASE_URL).toBe('postgresql://localhost/dev');
  });

  it('STAGING falls back to DATABASE_URL_PROD', () => {
    delete process.env.DATABASE_URL;
    process.env.STAGE = 'STAGING';
    process.env.DATABASE_URL_PROD = 'postgresql://localhost/prod';
    expect(() => validateEnv()).not.toThrow();
    expect(process.env.DATABASE_URL).toBe('postgresql://localhost/prod');
  });

  it('does not overwrite DATABASE_URL when it is already set', () => {
    delete process.env.STAGE;
    process.env.DATABASE_URL = 'postgresql://localhost/explicit';
    validateEnv();
    expect(process.env.DATABASE_URL).toBe('postgresql://localhost/explicit');
  });
});
