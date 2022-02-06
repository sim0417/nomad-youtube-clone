import newUsersRouter from './users';
import newVideosRouter from './videos';
import newGlobalRouter from './global';

export default function appRouters() {
  const routers = [];
  const usersRouter = newUsersRouter();
  routers.push({ path: '/users', router: usersRouter });

  const videosRouter = newVideosRouter();
  routers.push({ path: '/videos', router: videosRouter });

  const globalRouter = newGlobalRouter();
  routers.push({ path: '/', router: globalRouter });

  return routers;
}
