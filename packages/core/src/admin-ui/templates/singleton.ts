export const singletonTemplate = (listKey: string) =>
  `import { getSingletonPage } from '@keystone-6/core/___internal-do-not-use-will-break-in-patch/admin-ui/pages/SingletonPage';

export default getSingletonPage(${JSON.stringify({ listKey })});
`;
