import Users from '../models/users';
import bcrypt from 'bcrypt';
import fetch from 'cross-fetch';

export const getUser = (req, res) => {
  res.send('getUser');
};

export const viewSignup = (req, res) => {
  res.render('users/signup', { pageTitle: 'Signup' });
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
  res.render('users/login', { pageTitle: 'Login' });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email, type: 'email' });
  if (!user) {
    return res.status(400).render('users/login', {
      pageTitle: 'Login',
      errorMessage: 'check ID and password',
    });
  }

  const isPassowrdVaild = await bcrypt.compare(password, user.password);
  if (!isPassowrdVaild) {
    return res.status(400).render('users/login', {
      pageTitle: 'Login',
      errorMessage: 'check ID and password',
    });
  }

  req.session.isLogin = true;
  req.session.user = user;
  res.redirect('/');
};

export const authGithub = (req, res) => {
  const BASE_URL = 'https://github.com/login/oauth/authorize';
  const CONFIG = {
    client_id: process.env.GITHUB_CLIENT_ID,
    allow_signup: false,
    scope: 'read:user user:email',
  };

  const params = new URLSearchParams(CONFIG).toString();
  res.redirect(`${BASE_URL}?${params}`);
};

export const authGithubCallback = async (req, res) => {
  const { code } = req.query;
  const BASE_URL = 'https://github.com/login/oauth/access_token';
  const CONFIG = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_SECRET,
    code,
  };

  const params = new URLSearchParams(CONFIG).toString();
  const URL = `${BASE_URL}?${params}`;
  const data = await fetch(URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
  });

  const jsonData = await data.json();

  if (jsonData?.access_token) {
    const BASE_URL = 'https://api.github.com';
    const CONFIG = {
      headers: {
        Authorization: `token ${jsonData.access_token}`,
      },
    };
    const githubUserData = await fetch(`${BASE_URL}/user`, CONFIG);
    const githubUser = await githubUserData.json();

    const githubUserEmailsData = await fetch(`${BASE_URL}/user/emails`, CONFIG);
    const githubUserEmails = await githubUserEmailsData.json();

    const userEmailData = githubUserEmails?.find(
      (email) => email.primary && email.verified,
    );

    if (!userEmailData) {
      // TODO: notify not found verified emai
      return res.redirect('/login');
    }
    const { email } = userEmailData;
    let user = await Users.findOne({ email, type: 'github' });
    if (!user) {
      const { name, location, avatar_url } = githubUser;
      user = await Users.create({
        type: 'github',
        email,
        name,
        password: '',
        location,
        avatarUrl: avatar_url,
      });
    }

    req.session.isLogin = true;
    req.session.user = user;
    return res.redirect('/');
  }

  // TODO: notify not getting acces token
  res.redirect('/login');
};

export const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

export const editProfile = async (req, res) => {
  const {
    session: {
      user: { _id, avatarUrl },
    },
    body: { name, location },
    file: avatarFile,
  } = req;

  const updateUser = await Users.findByIdAndUpdate(
    _id,
    {
      avatarUrl: avatarFile ? avatarFile.path : avatarUrl,
      name,
      location,
    },
    { new: true },
  );

  req.session.user = updateUser;
  res.redirect('/users/edit-profile');
};

export const viewEditProfile = (req, res) => {
  res.render('users/edit-profile', { pageTitle: 'Profile' });
};

export const viewEditPassword = (req, res) => {
  const {
    user: { type },
  } = req.session;
  if (type !== 'email') {
    return res.redirect('/users/edit-profile');
  }

  res.render('users/edit-password', { pageTitle: 'Edit password' });
};

export const editPassword = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { old_password, password, confirm_password },
  } = req;

  const user = await Users.findById(_id);
  const isUserOldPassword = await bcrypt.compare(old_password, user.password);
  if (!isUserOldPassword) {
    return res.status(400).render('users/edit-password', {
      pageTitle: 'Edit password',
      errorMessage: 'Check old passowrd',
    });
  }

  if (password !== confirm_password) {
    return res.status(400).render('users/edit-password', {
      pageTitel: 'Edit password',
      errorMessage: 'Check passowrd',
    });
  }

  user.password = password;
  await user.save();

  return res.redirect('/users/logout');
};
