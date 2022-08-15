export const setLocalData = (req, res, next) => {
  const { isLogin, user } = req.session;

  if (isLogin) {
    res.locals.user = user;
  }
  res.locals.isLogin = Boolean(isLogin);
  res.locals.siteName = 'NomTube';

  next();
};
