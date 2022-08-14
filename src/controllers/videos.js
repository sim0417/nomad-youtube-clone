import Videos from '../models/videos';

export const getVideos = (req, res) => {
  res.send('getVideos');
};

export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Videos.findById(id);

  if (!video) {
    return res.render('404', { pageTitle: 'Video not found' });
  }

  res.render('watch', {
    pageTitle: `${video.title}`,
    video,
  });
};

export const editVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Videos.findById(id);

  if (!video) {
    return res.render('404', { pageTitle: 'Video not found' });
  }

  res.render('edit', {
    pageTitle: `Edit : ${video.title}`,
    video,
  });
};

export const saveVideo = async (req, res) => {
  const { id } = req.params;
  const { title, description, hashtags } = req.body;
  const isExists = await Videos.exists({ _id: id });

  if (!isExists) {
    return res.render('404', { pageTitle: 'Video not found' });
  }

  await Videos.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Videos.parseHashtags(hashtags),
  });

  res.redirect(`/videos/${id}`);
};

export const postVideo = async (req, res) => {
  const { title, description, hashtags } = req.body;
  try {
    await Videos.create({
      title,
      description,
      createdAt: Date.now(),
      hashtags: Videos.parseHashtags(hashtags),
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
