import { resolveDatabaseUrl } from './src/common/prisma-url';

const options: {
  datasources: { db: { url: string } };
} = {
  datasources: {
    db: {
      url: resolveDatabaseUrl(),
    },
  },
};

export default options;
