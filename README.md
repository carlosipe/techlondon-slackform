# Tech London's automatic Slack inviter

Based on Lucas J. Gordon's [SlackForm](https://github.com/lucasjgordon/SlackForm) code, for the [Tech London](http://techlondon.io) Slack community. This looks through Typeform signups (within the last hour) and issues an invite via the Slack API.

# Setup

* Copy the .env-sample file to .env and fill in the Typeform and Slack config parameters.
* Run `npm install` to install the dependencies

# Obtaining the configuration parameters

* The Typeform API Key is in the [My Account]](https://admin.typeform.com/account) section
* The name of your Slack group is in the group's url
* Either use an existing [legacy Slack API token](https://api.slack.com/custom-integrations/legacy-tokens), or, uhm... figure out how Slack authentication for the [Web API](https://api.slack.com/custom-integrations/web) now works (sorry)
* Your Typeform ID can be obtained from the URL of the actual form - it will look something like this: "bU6FKI"

Finally, you need to know the name of the email field in the Typeform JSON response. Create a URL like this:

https://api.typeform.com/v0/form/TYPEFORM_ID?key=TYPEFORM_API_KEY&completed=true&limit=1

Load it, and in the questions array find the form entry that asks for the user's email address. You need the id of the email field, it should look something like this: "email_4202153".

# Sending the actual invites

Simply set up a cronjob that runs `node invite.js` on a regular basis.

# TODO

* Fix optional channel invites
