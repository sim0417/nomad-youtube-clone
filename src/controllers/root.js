import Videos from '../models/videos';

export const getHomepage = async (req, res) => {
  const videos = await Videos.find({}).sort({ createdAt: 'desc' });
  res.render('home', {
    pageTitle: 'Home',
    videos,
  });
};

export const search = async (req, res) => {
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
