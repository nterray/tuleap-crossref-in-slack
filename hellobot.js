module.exports = function (req, res, next) {
  var userName = req.body.user_name;
  if (userName === 'slackbot') {
    // avoid infinite loop
    return res.status(200).end();
  }

  var regex = /(\w+)\s\#([\w-_]+:)?((?:&amp;|\w|\/|&)+)/g;
  var links = [];
  while ((match = regex.exec(req.body.text)) !== null) {
    var server = 'my.enalean.com',
        key    = match[1],
        value  = match[3];

    switch (key) {
        case 'community':
        case 'request':
        case 'story':
            server = 'tuleap.net'
            break;
        default:
            break;
    }
    links.push('https://'+ server +'/goto?key='+ key +'&val='+ value);
  }
  var message = {
    text : links.join('\\n')
  };

  return res.status(200).json(message);
}
