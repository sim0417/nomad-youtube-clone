import express from 'express';

const videos = [
  {
    title: 'Test',
    rating: 5,
    comments: 2,
    createdAt: '2022-03-06',
    views: 100,
    id: 1,
  },
];

export default function globalRouter() {
  const router = express.Router();
  const getHomepage = (req, res) =>
    res.render('home', {
      pageTitle: 'Home',
      videos,
    });
  router.get('/', getHomepage);

  return router;
}
