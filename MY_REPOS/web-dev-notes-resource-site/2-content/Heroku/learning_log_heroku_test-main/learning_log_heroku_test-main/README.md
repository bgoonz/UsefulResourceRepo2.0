Learning Log - Heroku test project
===

Deploying a Django project to Heroku is much simpler than deploying to a VPS such as Digital Ocean or Linode. But there are still a number of configuration steps that are confusing to beginners and newcomers, and that could probably be automated.

There are some external libraries that aim to make this process easier, but lack of ongoing maintenance has made some of those libraries difficult to use. The goal of this project is to see how much a revised Python Heroku buildpack can simplify the initial deployment process to Heroku. The goal is to have as few steps as possible between a small to medium size Django project that runs locally on SQLite, and runs sucessfully on Heroku.

Learning Log is a very simple Django project, but it's more than just a Hello World project. This is the Django project from *Python Crash Course*, but I'm thinking about more than just PCC readers when doing this work. The original vision of Heroku was to provide as seamless of a deployment process as possible, while not restraining developers. The goal of this revised buildpack is to automate initial configuration steps, but in a way that developers can then customize without having to undo any of the auto-configuration steps.

This version is set up for testing deployments that use requirements.txt. There is a [separate version](https://github.com/ehmatthes/learning_log_heroku_test_pipfile) for testing deployments that use Pipenv.

Running this project locally
---

To run this project locally:

- Clone or download this repo.
- Create a virtual environment, and install from *requirements.txt*.
- Migrate the database, which is configured to be SQLite for local development.
- Start the development server.
- Visit the site locally at http://localhost:8000.

To deploy this project to Heroku
---

The goal is to deploy with as few steps as possible:

- Run `heroku create` from a terminal at the root project directory.
- Run `heroku buildpacks:set https://github.com/ehmatthes/heroku-buildpack-python.git`. This will use the revised buildpack.
- Run `heroku config:set AUTCONFIGURE_ALL=1`. This tells Heroku to automatically configure your project for deployment.
- Run `git push heroku main`.

That should be it. This will automatically create a *Procfile*, configure the Heroku database, configure static file management, and modify settings slightly to serve the project from the Heroku environment.

Anticipated changes
---

This should probably not be the default buildpack behavior. I would anticipate having a set of config variables, such as `AUTO_CONFIGURE_ALL`, `AUTO_CONFIGURE_DB`, `AUTO_CONFIGURE_STATIC`, and maybe one or two more if needed. This way, as a user begins to customize their deployment, they can turn any or all of these flags off and customize each aspect of deployment.

Technical notes
---

All of the Heroku-specific deployment configuration is done in an `autoconfigure` script, which you can see [here](https://github.com/ehmatthes/heroku-buildpack-python/blob/master/bin/steps/autoconfigure). 

Note about *fake_deploy.txt*
---

When working on the buildpack, I often need to push this project to heroku repeatedly, without making any meaningful changes to this project. I need a new commit to do that, so I add a line to *fake_deploy.txt* and then commit it:

- `ehco "hi" >> fake_deploy.txt`
- `git commit -am "Test deploy process."`
- `git push heroku main`

Questions/ feedback?
---

This is very much a work in progress, which I am actively sharing with Heroku staff. If you have any questions, feel free to get in touch through Issues, or on [twitter](https://twitter.com/ehmatthes/), or through email ehmatthes at gmail.