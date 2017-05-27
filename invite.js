var SlackForm = require('./SlackForm.js');
require('dotenv').config()

var slackForm = new SlackForm({
	typeformApiKey: process.env.TYPEFORM_API_KEY,
	typeformId: process.env.TYPEFORM_ID,
	typeformEmail: process.env.TYPEFORM_EMAIL,
	slackChannel: process.env.SLACK_CHANNEL,
	slackToken: process.env.SLACK_TOKEN
});

slackForm.invite(function (err, data) {
	if (err) {
		throw err;
	}

	console.log(data);
});
