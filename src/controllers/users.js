import Users from '../models/users';

export const getUser = (req, res) => {
  res.send('getUser');
};

export const viewSignup = (req, res) => {
  res.render('signup', { pageTitle: 'Signup' });
};

export const signup = async (req, res) => {
  const { email, name, password, confirm_password, location } = req.body;

  if (confirm_password !== password) {
    return res.status(400).render('signup', {
      pageTitle: 'Signup',
      errorMessage: 'Password confirmation dose not match',
    });
  }

  const isExist = await Users.exists({ $or: [{ email }] });
  if (isExist) {
    return res.status(400).render('signup', {
      pageTitle: 'Signup',
      errorMessage: 'Email is exist',
    });
  }

  await Users.create({
    email,
    name,
    password,
    location,
  });
  res.redirect('/login');
};

export const viewLogin = (req, res) => {
  res.render('login', { pageTitle: 'Login' });
};
