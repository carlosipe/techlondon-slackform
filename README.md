# Tech London's automatic Slack inviter

Based on Lucas J. Gordon's [SlackForm](https://github.com/lucasjgordon/SlackForm) code, for the [Tech London](http://techlondon.io) Slack community. This looks through Typeform signups (within the last hour) and issues an invite via the Slack API.

# Setup

* Copy the .env-sample file to .env and fill in the Typeform and Slack config parameters.
* Run `npm install` to install the dependencies

# Obtaining the configuration parameters

* The Typeform API Key is in the [My Account](https://admin.typeform.com/account) section
* The name of your Slack group is in the group's url
* Either use an existing [legacy Slack API token](https://api.slack.com/custom-integrations/legacy-tokens), or, uhm... figure out how Slack authentication for the [Web API](https://api.slack.com/custom-integrations/web) now works (sorry)
* Your Typeform ID can be obtained from the URL of the actual form - it will look something like this: "bU6FKI"

Finally, you need to know the name of the `TYPEFORM_EMAIL` field name in the Typeform JSON response. Create a URL like this:

https://api.typeform.com/v0/form/TYPEFORM_ID?key=TYPEFORM_API_KEY&completed=true&limit=1

Load it, and in the questions array find the form entry that asks for the user's email address. You need the id of the email field, it should look something like this: "email_4202153".

# Sending the actual invites

Simply set up a cronjob that runs `node invite.js` on a regular basis. You can do this every 5-10 minutes e.g..

By default, the script will look for any new Typeform signups from the last hour. If you invite the same email address multiple times, the Slack API is smart enough to not send more than one invite email.

# Custom channel invites

Techlondon's [signup form](https://jonbstrong.typeform.com/to/Y2cp52) allows you to specify topic areas that you're interested in via a multiple select field, and it uses these Typeform fields to invite users to additional, non default channels via the API.

Run `node export_channels.js > channels.js` once to capture the list of channels for  your Slack into a file, and define `TYPEFORM_CHANNEL_FIELD` in the `.env` file, to the specify the prefix for the multiple choice Typeform field that defines all the topic areas that the user can select on signup. The text names of the checkbox options should match the channel names (converted to lowercase and with spaces replaced with dashes. So 'Office Space' invites to an `office-space` channel).

The moment you invite users to any custom channels via the API, it no longer invites you to any additional default channels (beyond `#general` that you have set up in Slack). Due to this, a new list of default channels can be set up via `DEFAULT_CHANNELS` in the `.env` file.

Even if you don't use custom channel invites, you still need to create the `channels.js` file once, or the rest of the script will complain.

# TODO

* Make custom channel invites optional (don't fail when channels.js doesn't exist)
