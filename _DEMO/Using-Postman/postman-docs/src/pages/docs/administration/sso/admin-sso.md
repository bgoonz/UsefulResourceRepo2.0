---
title: "Configuring SSO for a team"
order: 132
page_id: "admin_sso"
warning: false
contextual_links:
  - type: section
    name: "Prerequisites"
  - type: link
    name: "Intro to SSO"
    url: "/docs/administration/sso/intro-sso/"
---

> __[SSO is available on Postman Business and Enterprise plans.](https://www.postman.com/pricing)__

## Configuring single sign-on

Only a team administrator (admin) can configure single sign-on (SSO) for a Postman team.

Go to [Team Settings](https://app.getpostman.com/dashboard/teams/edit). In the following screen, select **Authentication**.

[![sso enable](https://assets.postman.com/postman-docs/edit-team-profile.jpg)](https://assets.postman.com/postman-docs/edit-team-profile.jpg)

Upon selecting *Authentication*, the following screen appears:

[![sso enable](https://assets.postman.com/postman-docs/configured-auths.jpg)](https://assets.postman.com/postman-docs/configured-auths.jpg)

After configuring an SSO authentication for your Postman team, you can use the toggle option in Settings (as illustrated above) to turn on/off this SSO authentication. Click the button (circled above) to turn on/off your SSO authentication system. This is a team-level option which will enable/disable SSO for the whole team. To update the SSO settings, click **Edit**.

To configure a new authentication method, click **Add a new authentication method** button.

In the **Add Authentication Method** modal, select the authentication type. Enter an authentication name that is easily identifiable to your team. Then click the **Proceed** button.

<img src="https://assets.postman.com/postman-docs/add-auth-method.jpg" width="350px" alt="Authentication Method"/>

**Note**: Always check with your authentication provider dashboard or your IT support staff for the correct information to complete a modal.

In the "Service Provider Details (Postman)" screen, the Entity ID, and the URLs for the Login and ACS are already populated.

As a next step, you must fill in the details in the **Identity Provider Details** section. And then provide your authentication certificate from your identity provider in "X.509 Certificate".

   [![details](https://assets.postman.com/postman-docs/server-provider-details.jpg)](https://assets.postman.com/postman-docs/server-provider-details.jpg)

To enter details in the **Identity Provider Details** section, you must login to your IDP account and fetch details. Refer to the corresponding section of the documentation and follow the outlined procedure there:

* [Setting up custom SAML in Okta](/docs/administration/sso/saml-okta/)

* [Setting up custom SAML in Duo](/docs/administration/sso/saml-duo/)

* [Setting up custom SAML in Gsuite](/docs/administration/sso/saml-gsuite/)

* [Setting up custom SAML in Onelogin](/docs/administration/sso/saml-onelogin/)

* [Setting up custom SAML in Ping Identity](/docs/administration/sso/saml-ping/)

* [Setting up custom SAML in Azure AD](/docs/administration/sso/saml-in-azure-ad/)

## Managing user accounts

This section describes the following topics:

* [Creating end user accounts](#creating-end-user-accounts)

* [Adding existing user accounts](#adding-existing-user-accounts)

* [Automatically adding new users](#automatically-adding-new-users)

* [Managing team logins](#managing-team-logins)

* [Removing team access](#removing-team-access)

### Creating end user accounts

You can create an account for a user in the Identity Provider (IdP).

The first time a new user logs in to Postman through the IdP, a Postman account is created under two conditions—the team has seats available and the [**Automatically add new users**](#automatically-adding-new-users) checkbox was enabled during SSO configuration.

The user will be automatically associated to the team with a **developer** role and have access to team resources.

### Adding existing user accounts

If a Postman user logs in to Postman through a team's IdP, the user will be automatically added to the team if **one of the following** is true:

* The team has available slots and the [**Automatically add new users**](#automatically-adding-new-users) checkbox in your configuration is enabled.
* An admin has invited the user to join the team.

### Automatically adding new users

The **Automatically add new users** checkbox in your SSO configuration determines whether users with accounts in your SSO system will be allowed to join your team automatically by signing in to Postman with SSO. If this is enabled, users with or without existing Postman accounts can join your team by heading to the [Enterprise login page](https://identity.getpostman.com/enterprise/login) and logging in with SSO.

> **Automatically add new users** will only work if your team has user slots available. Your team size will not be automatically increased if additional users log in via SSO.

### Managing team logins

By default, Postman only supports Service Provider initiated logins for Postman Business or Enterprise teams utilizing SSO. Your team will be required to head to the [Enterprise login page](https://identity.getpostman.com/enterprise/login) in order to log in to Postman. If you require users be able to log in from your SSO portal, you can generate and copy the RelayState from your [Postman team settings](http://go.postman.co/settings/team/auth) and save it in your IDP configuration. This ensures an additional level of security when logins are initiated through a source unknown to Postman.

### Removing team access

An admin must remove users from their Postman team to prevent access to shared resources.
