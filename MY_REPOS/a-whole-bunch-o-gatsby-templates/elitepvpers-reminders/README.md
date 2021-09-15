# elitepvpers-reminders

Send reminders to our internal elitepvpers Discord server
Look into `.github` to see the actions and workflows.

In general it uses the "webhook" feature of Discord to send messages.

## Setting up a new reminder

1. Create a new webhook inside the Discord server. Copy the webhook ID which will have this shape:
https://discord.com/api/webhooks/ID/TOKEN

2. Create environment variables for the ID and TOKEN inside this repository so that the action can access it

3. Use a correct cron syntax for the schedule (aliases and `[]` are not allowed)

4. If you want to mention a role, you can go to the Server Settings => Roles and can copy/paste the role ID with a right-click
