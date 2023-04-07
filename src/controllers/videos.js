import Videos from '../models/videos';
import Users from '../models/users';

export const getVideos = async (req, res) => {
  const videos = await Videos.find({})
    .sort({ createdAt: 'desc' })
    .populate('owner');
  res.render('home', { pageTitle: 'Home', videos });
};

export const watchVideo = async (req, res) => {
  const { id } = req.params;
  const video = await Videos.findById(id).populate('owner');

  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found' });
  }

  res.render('videos/watch', {
    pageTitle: `${video.title}`,
    video,
  });
};

export const editVideo = async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  const video = await Videos.findById(id);

  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found' });
  }

  if (String(video.owner) !== String(user._id)) {
    return res.status(403).redirect('/');
  }

  res.render('videos/edit', {
    pageTitle: `Edit : ${video.title}`,
    video,
  });
};

export const saveVideo = async (req, res) => {
  const { id } = req.params;
  const { user } = req.session;
  const { title, description, hashtags } = req.body;
  const video = await Videos.exists({ _id: id });

  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found' });
  }

  if (String(video.owner) !== String(user._id)) {
    return res.status(403).redirect('/');
  }

  await Videos.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Videos.parseHashtags(hashtags),
  });

  res.redirect(`/videos/${id}`);
};

export const postVideo = async (req, res) => {
  try {
    const {
      session: {
        user: { _id: userId },
      },
      body: { title, description, hashtags },
      file: { path: fileUrl },
    } = req;

    const newVideo = await Videos.create({
      title,
      description,
      createdAt: Date.now(),
      hashtags: Videos.parseHashtags(hashtags),
      fileUrl,
      meta: {
        views: 0,
        rating: 0,
      },
      owner: userId,
    });

    const user = await Users.findById(userId);
    user.videos.push(newVideo._id);
    user.save();

    res.redirect('/');
  } catch (error) {
    console.error('save video error : ', error);

    res.status(400).render('videos/upload', {
      pageTitle: `Upload Video`,
      errorMessage: error._message,
    });
  }
};

export const getUpload = (req, res) => {
  res.render('videos/upload', {
    pageTitle: `Upload Video`,
  });
};

export const deleteVideo = async (req, res) => {
  const { user } = req.session;
  const { id } = req.params;
  const video = await Videos.findById(id);

  if (!video) {
    return res.status(404).render('404', { pageTitle: 'Video not found.' });
  }
  if (String(video.owner) !== String(user._id)) {
    return res.status(403).redirect('/');
  }

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
    }).populate('owner');
  }

  res.render('videos/search', { pageTitle: 'Search', videos });
};
