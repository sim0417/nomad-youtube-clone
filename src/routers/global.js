import express from 'express';

export default function globalRouter() {
  const router = express.Router();
  const getHomepage = (req, res) =>
    res.render('home', {
      pageTitle: 'Home',
      videos: [
        {
          label: 'test1',
        },
        {
          label: 'test2',
        },
        {
          label: 'test3',
        },
      ],
    });
  router.get('/', getHomepage);

  return router;
}
