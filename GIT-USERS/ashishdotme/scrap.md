CNTX={users}; NAME={ashishdotme}; PAGE=1
curl "https://api.github.com/$CNTX/$NAME/repos?page=$PAGE&per_page=100" |
grep -e 'git_url\*' |
cut -d \" -f 4 |
xargs -L1 git clone

CNTX={users}; NAME={ashishdotme}; PAGE=2
curl "https://api.github.com/$CNTX/$NAME/repos?page=$PAGE&per_page=100" |
grep -e 'git_url\*' |
cut -d \" -f 4 |
xargs -L1 git clone

CNTX={users}; NAME={ashishdotme}; PAGE=3
curl "https://api.github.com/$CNTX/$NAME/repos?page=$PAGE&per_page=100" |
grep -e 'git_url\*' |
cut -d \" -f 4 |
xargs -L1 git clone

CNTX={users}; NAME={ashishdotme}; PAGE=4
curl "https://api.github.com/$CNTX/$NAME/repos?page=$PAGE&per_page=100" |
grep -e 'git_url\*' |
cut -d \" -f 4 |
xargs -L1 git clone

CNTX={users}; NAME={ashishdotme}; PAGE=5
curl "https://api.github.com/$CNTX/$NAME/repos?page=$PAGE&per_page=100" |
grep -e 'git_url\*' |
cut -d \" -f 4 |
xargs -L1 git clone

CNTX={users}; NAME={ashishdotme}; PAGE=6
curl "https://api.github.com/$CNTX/$NAME/repos?page=$PAGE&per_page=100" |
grep -e 'git_url\*' |
cut -d \" -f 4 |
xargs -L1 git clone

CNTX={users}; NAME={ashishdotme}; PAGE=7
curl "https://api.github.com/$CNTX/$NAME/repos?page=$PAGE&per_page=100" |
grep -e 'git_url\*' |
cut -d \" -f 4 |
xargs -L1 git clone

CNTX={users}; NAME={ashishdotme}; PAGE=8
curl "https://api.github.com/$CNTX/$NAME/repos?page=$PAGE&per_page=100" |
grep -e 'git_url\*' |
cut -d \" -f 4 |
xargs -L1 git clone

find . -empty -type d -print -delete

find . \( -name ".git" -o -name ".gitignore" -o -name ".gitmodules" -o -name ".gitattributes" \) -exec rm -rf -- {} +

find . \( -name "*SECURITY.txt" -o -name "*RELEASE.txt" -o -name "*CHANGELOG.txt" -o -name "*LICENSE.txt" -o -name "*CONTRIBUTING.txt" -name "*HISTORY.md" -o -name "*LICENSE" -o -name "*SECURITY.md" -o -name "*RELEASE.md" -o -name "*CHANGELOG.md" -o -name "*LICENSE.md" -o -name "*CODE_OF_CONDUCT.md" -o -name "\*CONTRIBUTING.md" \) -exec rm -rf -- {} +
