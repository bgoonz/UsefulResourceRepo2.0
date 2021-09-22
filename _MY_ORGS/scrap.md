
CNTX={organizations}; NAME={Web-Dev-Collaborative}; PAGE=1
curl "https://api.github.com/$CNTX/$NAME/repos?page=$PAGE&per_page=200"?branch=master |
  grep -e 'git_url*' |
  cut -d \" -f 4 |
  xargs -L1 git clone