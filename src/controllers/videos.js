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
  const { id } = req.params;
  const video = {
    title: 'Test',
    rating: 5,
    comments: 2,
    createdAt: '2022-03-06',
    views: 100,
    id,
  };

  res.render('edit', {
    pageTitle: `Editting : ${video.title}`,
    video,
  });
};
