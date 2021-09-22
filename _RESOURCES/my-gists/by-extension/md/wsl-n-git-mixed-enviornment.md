How to setup a development environment where Git from WSL integrates with native Windows applications, using the Windows home folder as the WSL home and using Git from WSL for all tools.

**Note** if using Git for Windows, or any tool on the Windows side that does not use Git from WSL then there will likely be problems with file permissions inside WSL.

## Tools
These are the tools I use:
* git (wsl) - Command line git from within WSL.
* [Fork](https://www.fork.dev) (windows) - Git GUI (must be used with `wslgit`)
* [wslgit](https://github.com/andy-5/wslgit) - Makes git from WSL available for Windows applications.
  **Important!** Follow the installation instructions and do (at least) the first optional step and then the [Usage in Fork](https://github.com/andy-5/wslgit#usage-in-fork) instructions.
* [KDiff3](http://kdiff3.sourceforge.net/) (windows) - Diff/merge GUI tool, invoked from git inside wsl.
* [VSCode](https://code.visualstudio.com/) (windows)
* A terminal, like [wsltty](https://github.com/mintty/wsltty) or [Windows Terminal](https://github.com/microsoft/terminal) (windows)

# WSL Installation
1. First time? Open `PowerShell` and run:
    ```PowerShell
    Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux
    ```

2. Download and install a distro from Windows Store, Command-Line or manually unpack and install (for Windows Server).

> **Important!** Start WSL once directly after installing the distribution of choise to finish the installation.

For full details see https://docs.microsoft.com/en-us/windows/wsl/install-win10.

## User Name and Password
When selecting a WSL user name you don't need to use the same name as your windows logon. The password can be anything but you must remember it since it will be used when sudo-ing.

The user name and password in WSL have nothing to do with the Windows user name and password, so changing your
password in windows does not change your password in WSL, or vice versa.  
The password you use in WSL is not critical for security since you still need to log on to your windows account to start WSL so it can be an easy to remember password.  
However, if you enable access to your WSL via SSH and allow password authentication then your WSL password strength will be of importance. But don't allow password authentication, just use pubkey authentication.

# WSL Setup
## wsl.conf
In WSL, create (or edit) the file */etc/wsl.conf*:
```ini
[automount]
enabled = true
root = /
options = "metadata,umask=022,fmask=111,case=off"
```
Restart *all* active WSL sessions, can be done from cmd or PS using the command `wsl --shutdown`.

`root = /` changes the mount root for windows local drives to *'/'* instead of the default *'/mnt/*, so instead of C: mounted at *'/mnt/c'* it will be mounted at *'/c'*.

`case=off` will make all directories created from within WSL to be *case insensitive* in the windows file system, because even if [Windows is case sensitive](https://blogs.msdn.microsoft.com/commandline/2018/02/28/per-directory-case-sensitivity-and-wsl/) the applications run on windows is not necessary case sensitive.

### metadata, umask and fmask
The `metadata` option will make it possible to set the owner and group of files using chown and modify read/write/execute permissions in WSL using chmod. See [Chmod/Chown WSL Improvements](https://devblogs.microsoft.com/commandline/chmod-chown-wsl-improvements/) for details.  

The umask and fmask sets the default values of the permissions on files and directories of mounted windows drives. The `umask=022` option excludes write permission for group/others for files and directories, and the `fmask=111` option excludes execution permission for user/group/others for files, making the default mask `644` on all windows drives mounted automatically by WSL. The permissions can be changed by using `chmod`, which will create metadata for a file containing the modified permissions.

> **Important!** This will make **ALL** files and directories in `/c` have `644` as default permissions, meaning that it won't be possible to execute *any* applications or scripts in the windows drives unless you specifically add the execute permission from within WSL

This is what makes permissions work as expected for the Windows filesystem from within WSL instead of every file having the execution bit set, which is really annoying, but there are some caveats.  
1. To run a Windows application (.exe) you must `chmod +x` the application.  
2. To chmod files in `C:\Program Files` or `C:\Program Files (x86)` the WSL terminal must be started using "Run as administrator". It doesn't seem to be possible to change permissions on files in `C:\Windows` anymore.

#### Program Xyz.exe is not working anymore!
Add the execution permission for the application:
```shell
chmod +x /path/to/xyz.exe
```
Note that all files in *'/c/Windows/'*, *'/c/Program Files/'* and *'/c/Program Files (x86)/'* requires the WSL terminal to be started as administrator to be able to modify the permissions.

#### Scripts does not work after git checkout!
When doing git-checkout from a windows tool and a script file is replaced then it ~~might~~ will loose its metadata, which means loosing the execution permission. If trying to execute the script you will get a *Permission denied*, and if doing a `git diff` you will just get a difference in mode:
```
$ git diff
diff --git a/myscript b/myscript
old mode 100755
new mode 100644
```
Just restore the missing execution permission using `chmod +x myscript` for that file in WSL.

You can also do a `git checkout -- myfile` from within WSL, to restore the permissions for that file by checking it out again, but note that this will also revert any other changes made to that file.
`git checkout -- .` can be useful to restore the permissions on several files in the current directory and all subdirectories, but be aware that this command will revert *ALL* changes made to all files.

## Use Windows Home Folder
In WSL, edit */etc/passwd* and change your home folder:
```
carl-oskar:x:1000:1000:,,,:/c/Users/user.name:/bin/bash
```

Close all WSL sessions (`wsl --shutdown` from cmd/PS) before restarting again.

### Existing Files/Folders Permissions
If you already have ssh keys and configurations in `$HOME/.ssh` that were created in windows then you must change the
file permission on those files to 600. Also fix `$HOME/.gnupg` if you are using GnuPG.
```shell
chmod -R 600 .ssh
chmod -R 600 .gnupg
```

## Share Environment Variables from Windows to WSL
Windows environment variables are shared to WSL using a special environment variable called `WSLENV` that is a colon-delimited list of environment variables. `WSLENV` can also be used to share environment variables from WSL to Windows, useful when executing windows applications from WSL.

Each variable can be suffixed with a slash followed by flags to specify how it is translated, for example `/up` makes the variable available when invoking WSL from Win (*p* flag) with the path translated to WSL paths (*u* flag).

https://devblogs.microsoft.com/commandline/share-environment-vars-between-wsl-and-windows/

## (Optional) /tmp in RAM
```bash
$ echo "tmpfs /tmp tmpfs rw,noatime,nosuid,nodev,size=1G" | sudo tee -a /etc/fstab
```
The above command will add an entry in fstab that will mount a temporary filesystem on `/tmp` which will use a *maximum* of **1 GB** of RAM. Omitting *size* will use the default max which is half(?) the RAM.

# GIT Setup
## wslgit - the bridge between Windows and git in WSL
Download [wslgit](https://github.com/andy-5/wslgit/releases/latest) (follow the installation instructions!).

### Speed up wslgit
By default `wslgit` executes most commands using ***non*-interactive** shell which does not execute `.bashrc` etc and therefore is fast.  
But commands that access remotes (`clone`, `fetch`, `push`, `pull`, etc.) are executed using **interactive** shell which do run `.bashrc`. If the `.bashrc` script contains a lot of initializations, like starting agents and other time consuming stuff then those commands can become slow.

The environment variable `WSLGIT` can be used to detect that `.bashrc` was started by `wslgit`, and if so only do a bare minimum of initialization, just so `git` can work properly, like starting `ssh-agent` etc.  
If running `.bashrc` is not required then `wslgit` can be forced to always use ***non*-interactive** shell by, in Windows, define an environment variable named `WSLGIT_USE_INTERACTIVE_SHELL` and set it to `false`.

## Using KDiff3 for diff and merge
1. Add KDiff3 installation directory to the windows path so that WSL can find `kdiff3.exe` without the full path, makes the configuration prettier.
2. Create a difftool config in `.gitconfig` for KDiff3, call it "kdiff3", whose command converts paths from unix-style to windows style, and configure it as `diff.tool`. Also configure KDiff3 as mergetool, which does not require any conversion of paths.
    ```ini
    [diff]
        guitool = kdiff3
    [difftool]
        prompt = false
    [difftool "kdiff3"]
        # Unix style paths must be converted to windows path style
        cmd = kdiff3.exe \"`wslpath -w $LOCAL`\" \"`wslpath -w $REMOTE`\"
        trustExitCode = false
    [merge]
        tool = kdiff3
    [mergetool]
        keepBackup = false
        prompt = false
        path = kdiff3.exe
        trustExitCode = false
    ```

# VSCode Setup
## Using git from WSL in VSCode
By using the VSCode plugin `Remote - WSL` and open a folder "in WSL" then VSCode will always use git from WSL, but for folders not opened using the Remote WSL then `wslgit`must be in the Windows Path, which it is if you did the optional second step when [installing wslgit](https://github.com/andy-5/wslgit#installation).

SAVE TO CACHER