2.)find and delete all empty directories()===>

find . -empty -type d -print -delete
---------------------------------------------------------------------------------------------------------
3.)Find and delete all empty files()===>

find . -empty -type f -print -delete
---------------------------------------------------------------------------------------------------------
4.)Recursive-unzip:()===>

find . -name "*.zip" | while read filename; do unzip -o -d "`dirname "$filename"`" "$filename"; done;
---------------------------------------------------------------------------------------------------------
5.)	Remember Git Credentials:

                git config --global credential.helper store


---------------------------------------------------------------------------------------------------------
find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +
---------------------------------------------------------------------------------------------------------

find . \( -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
find . \( -name "*SECURITY.md" -o -name "*RELEASE.md" -o  -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CONTRIBUTING.md" \) -exec rm -rf -- {} +
---------------------------------------------------------------------------------------------------------
git filter-branch --index-filter 'git rm -r --cached --ignore-unmatch assets/_website-components/0-DOJO/widgets-master/output/info/stats.json' HEAD
---------------------------------------------------------------------------------------------------------
nano
When you're done, hit CTRL+O to save and CTRL+X to exit Nano. You'll just need to restart the SSH server with one of the following commands.

$ systemctl restart sshd
$ service sshd restart

---------------------------------------------------------------------------------------------------------
Recursivley Create numbered folders:
n=1;
max=50;
while [ "$n" -le "$max" ]; do
  mkdir "s$n"
  n=`expr "$n" + 1`;
done





---------------------------------------------------------------------------------------------------------
Command Line: Rename all files in current directory to a certain file extension:
forfiles /S /M * /C "cmd /c rename @file @fname.js"
forfiles /S /M * /C "cmd /c rename @file @fname.html"
---------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
find ./ -iname "*.md" -type f -exec sh -c 'pandoc "${0}" -o "${0%.md}.html"' {} \;
---------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------
Recursivley list every single file in the working directory... 1 per line:

ls -R ./ | awk '
/:$/&&f{s=$0;f=0}
/:$/&&!f{sub(/:$/,"");s=$0;f=1;next}
NF&&f{ print s"/"$0 }'


write-to-txt-file

ls -R ./ | awk '
/:$/&&f{s=$0;f=0}
/:$/&&!f{sub(/:$/,"");s=$0;f=1;next}
NF&&f{ print s"/"$0 }'

--------for only html-files------------------------------------------------------------------------------

find ./ | grep -i "\.html*$"
---------------------------------------------------------------------------------------------------------
---------------------------------------------------------------------------------------------------------

---------------------------------------------------------------------------------------------------------
forfiles /S /M *.File /C "cmd /c rename @file @fname.js"

---------------------------------------------------------------------------------------------------------



---------------------------------------------------------------------------------------------------------

7.) ()===>
Another option is to install 7-Zip, which has a nice graphical user interface. 7-Zip can also be used to unpack many other formats and to create tar files (amongst others).

Download and install 7-Zip from 7-zip.org. If you do not want to use 7-Zip as a command line tool, skip the next steps.
Add the directory you installed 7-Zip into to your path (Start -> Control Panel -> System -> Advanced -> Environment Variables).
Move the tar file to the directory you wish to unpack into (usually the tar file will put everything into a directory inside this directory).
Open a command prompt, and cd to the directory.
If the tar file is compressed, type 7z x filename.tar.gz at the command prompt (where filename.tar.gz is the name of the compressed tar file). This results in a tar file called filename.tar
Type 7z x filename.tar at the command prompt (where filename.tar is the name of the tar file).
Instead of using 7-Zip on the command line, you can use the file manager and click on a .tar, .tar.gz, or.tar.bz2 file; 7-Zip will automatically start.
---------------------------------------------------------------------------------------------------------
8.)  Command Prompt: code --list-extensions
for /F "tokens=*" %A in (extensions.list) do code --install-extension %A
---------------------------------------------------------------------------------------------------------
9.)Create a soft link in the home dir
ln -s /mnt/c/0-a-A-October
---------------------------------------------------------------------------------------------------------
10.)
sudo apt update
sudo apt upgrade
git config --global user.name  bryan
git config --global user.email bryan.guner@gmail.com
sudo apt update
sudo apt install build-essential
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.2/install.sh | bash
. ./.bashrc
nvm install --lts
sudo apt install unzip
npm install -g mocha
npm audit fix -F
npm audit fix -f
npm install -g mocha
sudo apt update
sudo apt upgrade
sudo apt install python3
-----------------------------------------------------------------------------------------------------------
Command Line vscode
code --list-extensions
code --disable-extension <ext-name>
