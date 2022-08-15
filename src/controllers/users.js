import Users from '../models/users';
import bcrypt from 'bcrypt';

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

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });
  if (!user) {
    return res.status(400).render('login', {
      pageTitle: 'Login',
      errorMessage: 'check ID and password',
    });
  }

  const isPassowrdVaild = await bcrypt.compare(password, user.password);
  if (!isPassowrdVaild) {
    return res.status(400).render('login', {
      pageTitle: 'Login',
      errorMessage: 'check ID and password',
    });
  }

  req.session.isLogin = true;
  req.session.user = user;
  res.redirect('/');
};
