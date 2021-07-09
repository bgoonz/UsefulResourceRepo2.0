# [WINDOWS] How to enable auto-signing Git commits with GnuPG for programs that don't support it natively

This is a step-by-step guide on how to enable auto-signing Git commits with GPG for every applications that don't support it natively (eg. GitHub Desktop, Eclipse, Git Tower, ...)

## Requirements

* **Install [GPG4Win](https://gpg4win.org/download.html)**: _this software is a bundle with latest version of GnuPG v2, Kleopatra v3 certificate manager, GNU Privacy Assistant (GPA) v0.9 which is a GUI that uses GTK+, GpgOL and GpgEX that are respectively an extension for MS Outlook and an extension for Windows Explorer shell_
* **Install [Git for Windows](https://gitforwindows.org/)**: so you can have a *nix based shell, _this software is a bundle with latest version of Git which use MINGW environment, a Git bash shell, a Git GUI and an extension for Windows Explorer shell_ **(Make sure your local version of Git is at least 2.0, otherwise Git don't have support for automatically sign your commits)**
* Verify if Git was successfully installed with:
  ```shell
  $ git --version
  # git version 2.15.1.windows.2
  ```

Remember that Git for Windows install old 1.4.xx version of GnuPG (provided through MINGW environment), but **this is irrelevant**, as we are going to manually specify which GnuPG program our Git must be using (which is the GnuPG version installed by GPG4Win)!

## Setup

* **Install your favorite IDE** with Git support, like:
  * **GitHub Desktop**: [https://desktop.github.com/](https://desktop.github.com/)
  * **Eclipse**: [https://www.eclipse.org/downloads/](https://www.eclipse.org/downloads/) with one of Git plugin (**mandatory**)
* **Generate your GPG keys**: visit [https://help.github.com/articles/generating-a-new-gpg-key/](https://help.github.com/articles/generating-a-new-gpg-key/) for a completed and detailed instructions, or otherwise use Kleopatra manager (**Notes**: key size should be at least 2048 bits, but 4096 is better; key should probably not expire; and you can append multiple email addresses to your GPG key)
* **Verify installation of your key**:
  ```shell
  $ gpg --list-secret-keys --keyid-format LONG
  # /c/Users/BoGnY/.gnupg/secring.gpg
  # ----------------------------------
  # sec   4096R/E870EE00B5D90537 2017-12-31 [expires: 2021-12-31]
  # uid                          John Smith <john.smith@gmail.com>
  # ssb   4096R/F9E3E72EBBFDCFD6 2017-12-31
  ```
* **Generate your revocation certificate**: this command create a .rev file, that is needed to revocate a public key shared in a key server.
  ```shell
  $ gpg --gen-revoke E870EE00B5D90537
  ```
* **Share your public key**: this command will never send a private key!!!
  ```shell
  $ gpg --send-keys E870EE00B5D90537
  ```
* **Add public GPG key to GitHub**: open [https://github.com/settings/keys](https://github.com/settings/keys) then click "_New GPG key_", paste your public key and click "_Add GPG key_"
* **Set up Git to auto-sign all commits**: this change your global configuration of Git, if you would like to add auto-sign on a single repository, remove `--global` from command
  ```shell
  $ git config --global user.signingkey E870EE00B5D90537
  $ git config --global commit.gpgsign true
  ```
* **Set up Git to use a custom GPG program**:
  ```shell
  $ git config --global gpg.program "/c/Program Files (x86)/GnuPG/bin/gpg.exe"
  ```
* **Optional**: try disable TTY if you have problems with making auto-signed commits from your IDE or other software
  ```shell
  $ echo 'no-tty' >> ~/.gnupg/gpg.conf
  ```
  In my specific case, this point **was mandatory**.

## Usage

Simple press "Commit" button on your favorite IDE, you see a simple window that ask your key password!

Remember that GPG4Win install also a **GPG agent**, that remember your password for a limited times (I think 30 minutes) by default, so you don't have to enter your password every time!! (IMHO there is a setting for change it, but I haven't search it yet).

That's all!