import Videos from '../models/videos';

export const getHomepage = async (req, res) => {
  const videos = await Videos.find({});
  res.render('home', {
    pageTitle: 'Home',
    videos,
  });
};
