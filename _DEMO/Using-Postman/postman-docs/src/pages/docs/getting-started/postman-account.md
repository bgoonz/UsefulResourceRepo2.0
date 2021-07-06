---
title: "Managing your account"
order: 4.1
page_id: "postman_account"
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Download and Install"
    url: "https://www.postman.com/downloads/"
  - type: section
    name: "Additional Resources"
  - type: subtitle
    name: "Related Blog Posts"
  - type: link
    name: "One person, multiple accounts"
    url: "https://blog.postman.com/one-person-multiple-accounts/"
  - type: link
    name: "Sweet cosmic karma for your public profile"
    url: "https://blog.postman.com/sweet-cosmic-karma-for-your-public-profile/"
  - type: section
    name: "Next Steps"
  - type: link
    name: "Sending your first request"
    url: "/docs/getting-started/sending-the-first-request/"

warning: false

---

A free Postman account allows you to [sync](/docs/getting-started/syncing/) and back up your work so that you can access it from different machines. You can also [collaborate](/docs/collaborating-in-postman/collaboration-intro/) with others on your API projects.

Signing up for an account is optional—you can use the desktop Postman app without an account if you prefer. Check out the [EULA](https://www.postman.com/legal/eula/), [security overview](https://www.postman.com/security), and [privacy policy](https://www.postman.com/licenses/privacy).

## Contents

* [Signing up for a Postman account](#signing-up-for-a-postman-account)
* [Configuring your account](#configuring-your-account)
* [Signing into Postman](#signing-into-postman)
* [Syncing your work](#syncing-your-work)
* [Upgrading your account](#upgrading-your-account)
* [Switching between accounts](#switching-between-accounts)
* [Security policies and standards](#security-policies-and-standards)
* [Updating your username](#updating-your-username)
* [Changing your email address](#changing-your-email-address)
* [Making your profile public](#making-your-profile-public)
* [Resetting your password](#resetting-your-password)

## Signing up for a Postman account

To use Postman on the desktop, [download](https://www.postman.com/downloads/) the app and launch it.

Alternatively, navigate to Postman on the web at [go.postman.co/home](https://go.postman.co/home).

You will see a prompt to log in or sign up.

![App Sign In](https://assets.postman.com/postman-docs/sign-in.jpg)

Click __Create Account__.

![App Sign Up](https://assets.postman.com/postman-docs/create-postman-account.jpg)

You can sign up by entering an email, username, and password, or using your Google account.

To sign up by email, enter your details, check the box to agree to the __Terms of Use__ (which you can view by clicking the link), and click __Create free account__. Postman will send you an email to confirm your account—follow the instructions to complete your account setup.

To use your Google account to sign in to Postman, click __Sign up with Google__, and follow the instructions.

> You can [update your username](#updating-your-username) or [change your email address](#changing-your-email-address) at any time.

## Configuring your account

When you first sign up for a Postman account, you will be prompted to provide some information about yourself.

Enter your details and click __Continue__.

![Configure account](https://assets.postman.com/postman-docs/onboarding.jpg)

You can optionally create or join a team. If you are signing up with your organization email and your company has a Postman account with team discovery enabled, you will see [teams you can join](/docs/collaborating-in-postman/collaboration-intro/#finding-teams-within-your-organization).

> Each account can be on one Postman team at a time. Multi-team collaboration and guest accounts are [on Postman's roadmap](https://trello.com/b/4N7PnHAz/postman-roadmap-for-developers).

[![Join a team](https://assets.postman.com/postman-docs/collaborate-with-teams.jpg)](https://assets.postman.com/postman-docs/collaborate-with-teams.jpg)

To create a team and optionally invite collaborators, click __Create new team__. Enter your team name and URL—click __Continue__.

[![Create Team](https://assets.postman.com/postman-docs/create-team.jpg)](https://assets.postman.com/postman-docs/create-team.jpg)

You can update your settings at any time by clicking your avatar in the top left of Postman, then **View Profile**.

Your profile will be visible to collaborators and anyone viewing resources you share or publish.

## Signing into Postman

You can sign into Postman by clicking **Sign In** in the upper-right corner of Postman, selecting **Home** in the upper-left then **Sign in**, or by navigating to [Postman's website](https://www.postman.com/) and clicking **Sign In** in the upper-right corner.

 <img src="https://assets.postman.com/postman-docs/create-account-or-sign-in.jpg" alt="Create account or sign in"/>

 When you opt to sign into the desktop version of Postman, you will see the following screen and your default browser will automatically open a webpage asking you to sign into Postman.

 > Your browser should open within a few seconds. If it does not, you can click **open your browser** in Postman.

  <img src="https://assets.postman.com/postman-docs/sign-in-with-web-browser.jpg" alt="Sign in with web browser"/>

> You can opt out of the login process at any time by navigating back to Postman and clicking **Skip and take me to Postman Desktop App**.
> You must complete the process of signing in within five minutes once you initiate login from Postman. If you go beyond this time, you must return to Postman and restart the sign in process.

Log into Postman in your browser by entering your account credentials or signing in with Google. If you are on a Postman Business or Enterprise plan, opt to **Sign in with Single Sign-On (SSO)**.

> Check **Keep me signed in** if you would like to remain signed in after your current session for 30 days before re-authenticating. If you do not want to remain signed in on the computer you are working on, uncheck this option. Note that you will be prompted to sign in again after 30 minutes.

<img src="https://assets.postman.com/postman-docs/sign-in-full-page-20.jpg" alt="Sign in"/>

Upon signing in, you will see a confirmation in your browser and you will be redirected back to Postman.

<img src="https://assets.postman.com/postman-docs/youre-signed-in-confirmation.jpg" width="350px" alt="Signed in confirmation"/>

## Syncing your work

When you are logged into Postman, the sync indicator in the header bar is green; you are connected to the servers and your work is being continuously backed up. Postman will inform you if the sync is interrupted and will automatically try to re-establish the connection.

![Sync icon](https://assets.postman.com/postman-docs/syncing.jpg)

If Postman can't connect, you can switch to the Scratch Pad and work locally. For more information see, [Using the Scratch Pad](/docs/getting-started/using-scratch-pad/).

![Sync connection](https://assets.postman.com/postman-docs/scratchpad-offline.jpg)

If a conflict arises from a sync issue within your workspace, [Postman will present options for resolving the conflict](/docs/collaborating-in-postman/using-workspaces/conflicts/).

> Postman uses a WebSocket connection for real-time [syncing](/docs/getting-started/syncing/). If you are experiencing issues with syncing, you can file an issue with the Postman [support center](https://support.postman.com/hc/en-us).

## Upgrading your account

If you have a free account, you can upgrade it by navigating to [Postman](https://go.postman.co/) and clicking **Upgrade** in the top-right corner.

If you have a paid account, you can upgrade your Postman plan by navigating to your [billing dashboard](https://go.postman.co/billing/overview) and clicking **...** > **Change Plan**.

[![change plan menu](https://assets.postman.com/postman-docs/change-plan-menu.jpg)](https://assets.postman.com/postman-docs/change-plan-menu.jpg)

> The cost of your upgraded plan and/or additional seats will be prorated based on the time left in your team's current billing cycle. For more information, [contact Postman's sales team](mailto:sales@postman.com).

## Switching between accounts

You can sign in to multiple accounts at the same time in Postman. Click your user avatar in the top right to toggle between accounts or click __Add a new account__ to sign in with another one.

<img src="https://assets.postman.com/postman-docs/multiple-accounts.jpg" width="400px" alt="Multiple Accounts"/>

## Security policies and standards

Postman uses several technologies to ensure that your data is safe and secure. For more details, visit our [security page](https://www.postman.com/security).

* Communication with Postman servers only happens through HTTPS and Secure WebSockets.
* Environment and global variables are encrypted so that only you can view them.

## Updating your username

You can update your username at any time by [navigating to your profile settings](https://go.postman.co/settings/me), editing your username, and clicking **Save Changes**.

## Changing your email address

You can change the email address associated with your Postman account by [navigating to your account settings](https://go.postman.co/settings/me/account), editing your email address, and clicking **Save Changes**.

## Making your profile public

You can enable or disable your public profile at any time by [navigating to your profile settings](https://go.postman.co/settings/me), selecting the toggle, and clicking **Save Changes**.

## Resetting your password

You can reset your password if you are already signed in by navigating to your [settings](https://go.postman.co/settings/me) > **Account Settings** > **Change Password**.

If you are not signed in to your Postman account, you can recover your username or reset your password from the [**Sign In**](https://identity.getpostman.com/login) page. Click __Trouble signing in?__

![App Sign In](https://assets.postman.com/postman-docs/sign-in.jpg)

Enter your account email, check the __I'm not a robot__ box, and click __Submit__.

![Trouble Signing In](https://assets.postman.com/postman-docs/trouble-signing-in2.jpg)

Postman will send you an email with instructions for recovering access to your account.

> If you still have trouble logging into your Postman account please [contact support](https://support.getpostman.com/).

## Next steps

Learn more about how Postman [syncs](/docs/getting-started/syncing/) your data.
