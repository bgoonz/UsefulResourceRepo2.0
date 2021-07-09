# Completely uninstall node + npm:

* go to `/usr/local/lib` and delete any node and node_modules
* go to `/usr/local/include` and delete any node and node_modules directory
* if you installed with `brew install node`, then run `brew uninstall node` in your terminal

Check your Home directory for any local or lib or include folders, and delete any node or node_modules from there
go to `/usr/local/bin` and delete any node executable.

You may need to do the additional instructions as well:

```shell
sudo rm /usr/local/bin/npm;
sudo rm /usr/local/share/man/man1/node.1;
sudo rm /usr/local/lib/dtrace/node.d;
sudo rm -rf ~/.npm;
sudo rm -rf ~/.node-gyp;
sudo rm /opt/local/bin/node;
sudo rm /opt/local/include/node;
sudo rm -rf /opt/local/lib/node_modules;
```
