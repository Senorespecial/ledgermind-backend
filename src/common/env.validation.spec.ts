import { validateEnv } from './env.validation';

describe('validateEnv', () => {
  const ORIGINAL = process.env.DATABASE_URL;

  afterEach(() => {
    process.env.DATABASE_URL = ORIGINAL;
  });

  it('passes when DATABASE_URL is set', () => {
    process.env.DATABASE_URL = 'postgresql://localhost/test';
    expect(() => validateEnv()).not.toThrow();
  });

  it('throws when DATABASE_URL is missing', () => {
    delete process.env.DATABASE_URL;
    expect(() => validateEnv()).toThrow(
      'Missing required environment variables: DATABASE_URL',
    );
  });
});
