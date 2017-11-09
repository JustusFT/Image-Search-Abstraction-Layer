const request = require('request');
const Query = require('../models/query');

module.exports.index = (req, res) => {
  res.render('index');
};

module.exports.search = (req, res) => {
  const query = req.query.q || '';
  const offset = req.query.offset || 1;
  const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.API_KEY}&cx=${process.env.CSE_ID}&q=${query}&num=10&start=${offset}&searchType=image`;
  request({
    url,
    json: true,
  }, (error, response, body) => {
    if (error) {
      res.send('An error occurred');
    } else if (body.error) {
      res.json(body);
    } else {
      const images = body.items;
      new Query({
        term: query,
      }).save(() => {
        res.json(images.map(x => ({
          url: x.link,
          snippet: x.snippet,
          thumbnail: x.image.thumbnailLink,
          context: x.image.contextLink,
        })));
      });
    }
  });
};

module.exports.recent = (req, res) => {
  Query.find({}).sort({
    when: -1,
  }).exec((err, result) => {
    if (err) {
      res.json(err.message);
    } else {
      res.json(result);
    }
  });
};
