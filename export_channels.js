const request = require('request');
require('dotenv').config()

request(`https://slack.com/api/channels.list?token=${process.env.SLACK_TOKEN}`, function (error, response, body) {
  data = JSON.parse(body);

  console.log("var channels = {");
  for (var channel of data.channels) {
      console.log(`   "${channel.name}": "${channel.id}",`)
  }
  console.log("};\n\nmodule.exports = channels;");
});
