export const parseHashtags = (hashtags) => {
  if (!hashtags || typeof hashtags !== 'string' || hashtags.trim().length === 0)
    return '';

  return hashtags
    .trim()
    .split(',')
    .map((hashtag) => {
      hashtag = hashtag.trim();
      if (hashtag.length === 0) return null;

      return hashtag.startsWith('#') ? hashtag : `#${hashtag}`;
    })
    .filter((hashtag) => hashtag);
};
