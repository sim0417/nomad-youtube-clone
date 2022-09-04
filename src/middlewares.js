import multer from 'multer';

export const setLocalData = (req, res, next) => {
  const { isLogin, user } = req.session;
  res.locals.user = user || {};
  res.locals.isLogin = Boolean(isLogin);
  res.locals.siteName = 'NomTube';
  next();
};

export const blockNotLoginUser = (req, res, next) => {
  const { isLogin } = req.session;
  if (!isLogin) {
    return res.redirect('/login');
  }
  next();
};

export const blockLoginUser = (req, res, next) => {
  const { isLogin } = req.session;
  if (isLogin) {
    return res.redirect('/');
  }
  next();
};

export const uploadAvatarFiles = multer({
  dest: 'uploads/avatars/',
  limits: {
    fileSize: 3000000,
  },
});

export const uploadVideoFiles = multer({
  dest: 'uploads/videos',
  limits: {
    fileSize: 3000000,
  },
});
