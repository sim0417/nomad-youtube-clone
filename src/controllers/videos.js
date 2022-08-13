import Videos from '../models/videos';

export const getVideos = (req, res) => {
  res.send('getVideos');
};

export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Videos.findById(id);

  if (video) {
    res.render('watch', {
      pageTitle: `${video.title}`,
      video,
    });
  } else {
    res.render('404', { pageTitle: 'Video not found' });
  }
};

export const editVideo = (req, res) => {
  const { id } = req.params;
  const video = {};

  res.render('edit', {
    pageTitle: `Editting : ${video.title}`,
    video,
  });
};

export const saveVideo = (req, res) => {
  console.log(req.body);
  res.redirect('/');
};

export const postVideo = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Videos.create({
      title,
      description,
      createdAt: Date.now(),
      hashtags: hashtags.split(',').map((hashtag) => `#${hashtag}`),
      meta: {
        views: 0,
        rating: 0,
      },
    });

    res.redirect('/');
  } catch (error) {
    console.error('save video error : ', error);

    res.render('upload', {
      pageTitle: `Upload Video`,
      errorMessage: error._message,
    });
  }
};

export const getUpload = (req, res) => {
  res.render('upload', {
    pageTitle: `Upload Video`,
  });
};
