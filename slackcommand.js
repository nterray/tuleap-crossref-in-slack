module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  if (userName === 'slackbot') {
    // avoid infinite loop
    return res.status(200).end();
  }

  if (! /^\d+$/.test(req.body.text)) {
      return res.status(200).end();
  }

  var message = {
      text : 'https://tuleap.net/goto?group_id=101&key=request&val='+ (+req.body.text)
  };

  return res.status(200).json(message);
}
