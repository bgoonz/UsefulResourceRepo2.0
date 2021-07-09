# This will remove .git folders...    .gitmodule files as well as .gitattributes and .gitignore files.

find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +




# This will remove the filenames you see listed below that just take up space if a repo has been downloaded for use exclusivley in your personal file system (in which case the following files just take up space)
# Disclaimer... you should not use this command in a repo that you intend to use with your work as it removes files that attribute the work to their original creators!


find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "\*CONTRIBUTING.md" \) -exec rm -rf -- {} +
