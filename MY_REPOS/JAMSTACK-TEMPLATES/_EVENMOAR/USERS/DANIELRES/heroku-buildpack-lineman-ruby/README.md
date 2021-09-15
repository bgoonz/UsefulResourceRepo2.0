**Warning, the following is not implemented**

- Using git to pull down lineman apps
- Moving images, fonts, static pages, and templates from lineman to the destination

# Heroku buildpack: Lineman + Ruby

This is a [Heroku buildpack](http://devcenter.heroku.com/articles/buildpacks) for Ruby, Rack, and Rails apps that want to incorporate Lineman apps.

```
$ heroku create --stack cedar --buildpack https://github.com/linemanjs/heroku-buildpack-lineman-ruby.git
```

## Configuration

This buildpack should behave just like the official Ruby buildpack, with the added behavior of compiling and placing a built Lineman app (or apps).

To get started, you'll need a lineman.json file in the project root. Here's an example:

```
"linemanApps": [
  {
    "location": "front_end1",
    "installToPath": "public/app1"
  },
  {
    "location": "front_end2",
    "installToPath": "public/app2"
  }
]
```

The above configuration specifies that two Lineman apps should be deployed alongside the Ruby app.

### Using local files

The apps are stored in directories off the root of the repo called "front_end1" and "front_end2" and should be built and then moved to "public/app1" and "public/ap2".

### Gritty Details

In the default configuration, this buildpack installs lineman, runs lineman build, and looks for the following

```
app_root/
    front_end1/
        dist/
            js/*.js
            css/*.css
    front_end2/
        dist/
            js/*.js
            css/*.css
```

It then moves the assets to these target directories.

```
app_root/
    public/
        app1/
            js/
            css/
        app2/
            js/
            css/
```

### Additional configuration

In addition to the above configuration, the following optional configuration is available

```
"filesToDeploy": ["js/*.js", "css/*.css"]  # Which files to move into the target directory
"overwriteExistingFiles": true             # Whether to overwrite files in the target directory with files from dist
```

### Future Times

```
"linemanApps": [
  {
    "type": "git",
    "location": "git@github.com:searls/lineman-ember-template.git",
    "revision": "ac84a7a",
    "installToPath": "public/app1"
  },
  {
    "type": "file",
    "location": "front_end",
    "installToPath": "public/app2"
  }
]
```

### Using git

The first app is stored in a separate git repo that will be cloned during the Heroku slug compilation, then built, and its built `dist` assets will be moved to a path `public/app1`. The "revision" property is optional and can be useful for locking down to a specific version of the git repo, either a SHA or tag or branch's HEAD.
