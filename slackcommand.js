var request = require('request');

module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  if (userName === 'slackbot') {
    // avoid infinite loop
    return res.status(200).end();
  }

  if (! /^\d+$/.test(req.body.text)) {
      return res.status(200).send('<artifact_id>');
  }

  var message = {
      text : '<https://tuleap.net/goto?group_id=101&key=request&val='+ (+req.body.text) +'|/request '+ (+req.body.text) +'>',
      username : 'Tuleap Community Reference',
      channel  : req.body.channel_id,
      icon_emoji : ':tulip:'
  };

    send(message, function (error, status, body) {
        if (error) {
            return next(error);
        } else if (status !== 200) {
            // inform user that our Incoming WebHook failed
            return next(new Error('Incoming WebHook: ' + status + ' ' + body));
        } else {
            return res.status(200).end();
        }
    });

}


function send (payload, callback) {
  var path = process.env.INCOMING_WEBHOOK_PATH;
  var uri = 'https://hooks.slack.com/services' + path;
  request({
    uri: uri,
    method: 'POST',
    body: JSON.stringify(payload)
  }, function (error, response, body) {
    if (error) {
      return callback(error);
    }
    callback(null, response.statusCode, body);
  });
}
