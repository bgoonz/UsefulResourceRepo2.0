# LIST OF THINGS

### Short Term
- readd apt provisioning module as submodule
- readd mongodb provisioning module as submodule
- readd stdlib provisioning module as submodule
- update README.md
  - complete [Required](https://github.com/freecodecamp/fcc-vagrant#required) section
  - complete [Usage](https://github.com/freecodecamp/fcc-vagrant#usage) section
  - complete [Development](https://github.com/freecodecamp/fcc-vagrant#development) section

### Mid Term
- create documentation on how to create PR

### Long Term
- add [commander](https://github.com/tj/commander.js) to create a secondary provisioner. Puppet would do the heavy environment lifting, 2ndary provisioner would do FCC-centric provisioning. _(might solve OS-centric issue)
  - clone fcc repo w/ new branch name
  - add npm script snippit to generate PR
  - handle all npm package requirements
  - seed project

- create a cleanup script for `vagrant destroy`

#### NOTES
- add setup instructions for `hostmanager`