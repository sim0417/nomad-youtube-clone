import newUsersRouter from './users';
import newVideosRouter from './videos';
import newRootRouter from './root';
import newApiRouter from './apis';

export default function appRouters() {
  const routers = [];
  const usersRouter = newUsersRouter();
  routers.push({ path: '/users', router: usersRouter });

  const videosRouter = newVideosRouter();
  routers.push({ path: '/videos', router: videosRouter });

  const rootRouter = newRootRouter();
  routers.push({ path: '/', router: rootRouter });

  const apiRouter = newApiRouter();
  routers.push({ path: '/api', router: apiRouter });

  return routers;
}
