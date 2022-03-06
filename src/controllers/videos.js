export const getVideos = (req, res) => {
  res.send('getVideos');
};

export const watchVideo = (req, res) => {
  res.render('watch', {
    pageTitle: `watch ${req.params.id}`,
    video: {
      title: 'Test',
      rating: 5,
      comments: 2,
      createdAt: '2022-03-06',
      views: 100,
      id: 1,
    },
  });
};

export const editVideo = (req, res) => {
  res.render('edit', {
    pageTitle: 'Edit Video',
  });
};
