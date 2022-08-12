const videos = [
  {
    title: 'Test',
    rating: 5,
    comments: 2,
    createdAt: '2022-03-06',
    views: 100,
    id: 1,
  },
  {
    title: 'Test',
    rating: 5,
    comments: 2,
    createdAt: '2022-03-06',
    views: 100,
    id: 2,
  },
  {
    title: 'Test',
    rating: 5,
    comments: 2,
    createdAt: '2022-03-06',
    views: 100,
    id: 3,
  },
];

export const getHomepage = (req, res) =>
  res.render('home', {
    pageTitle: 'Home',
    videos,
  });
