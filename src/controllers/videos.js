import Videos from '../models/videos';

export const getVideos = async (req, res) => {
  const videos = await Videos.find({});
  res.render('home', { pageTitle: 'Home', videos });
};

export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Videos.findById(id);

  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found' });
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
    return res.status(404).render('404', { pageTitle: 'Video not found' });
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
    return res.status(404).render('404', { pageTitle: 'Video not found' });
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

export const deleteVideo = async (req, res) => {
  const { id } = req.params;
  await Videos.findByIdAndDelete(id);
  res.redirect('/');
};

export const searchVideo = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];

  if (keyword) {
    videos = await Videos.find({
      title: {
        $regex: new RegExp(keyword, 'i'),
      },
    }).sort({ createdAt: 'desc' });
  }

  res.render('search', { pageTitle: 'Search', videos });
};
