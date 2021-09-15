```
|02:16:22|bryan@LAPTOP-9LGJ3JGS:[5-download-all-pdf] 5-download-all-pdf_exitstatus:130[╗__________________________________________________________o>

 wget -r -A.pdf https://overapi.com/javascript --wait=2 --level=inf --limit-rate=20K --recursive --page-requisites --user-agent=Mozilla --no-parent --convert-links --adjust-extension --no-clobber -e robots=off
Both --no-clobber and --convert-links were specified, only --convert-links will be used.
--2021-06-29 02:16:23--  https://overapi.com/javascript
Resolving overapi.com (overapi.com)... 185.199.111.153, 185.199.109.153, 185.199.108.153, ...
Connecting to overapi.com (overapi.com)|185.199.111.153|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 105977 (103K) [text/html]
Saving to: ‘overapi.com/javascript.tmp.html’

overapi.com/javascript.tmp.html                              100%[===========================================================================================================================================>] 103.49K  20.9KB/s    in 5.0s

2021-06-29 02:16:28 (20.8 KB/s) - ‘overapi.com/javascript.tmp.html’ saved [105977/105977]

Removing overapi.com/javascript.tmp.html since it should be rejected.

--2021-06-29 02:16:30--  https://overapi.com/
Reusing existing connection to overapi.com:443.
HTTP request sent, awaiting response... 200 OK
Length: 40271 (39K) [text/html]
Saving to: ‘overapi.com/index.html.tmp.html’

overapi.com/index.html.tmp.html                              100%[===========================================================================================================================================>]  39.33K  20.1KB/s    in 2.0s

2021-06-29 02:16:32 (20.1 KB/s) - ‘overapi.com/index.html.tmp.html’ saved [40271/40271]

Removing overapi.com/index.html.tmp.html since it should be rejected.

--2021-06-29 02:16:34--  https://overapi.com/static/cs/javascript_cheat_sheet.pdf
Reusing existing connection to overapi.com:443.
HTTP request sent, awaiting response... 200 OK
Length: 98171 (96K) [application/pdf]
Saving to: ‘overapi.com/static/cs/javascript_cheat_sheet.pdf’

overapi.com/static/cs/javascript_cheat_sheet.pdf             100%[===========================================================================================================================================>]  95.87K  20.4KB/s    in 4.7s

2021-06-29 02:16:39 (20.3 KB/s) - ‘overapi.com/static/cs/javascript_cheat_sheet.pdf’ saved [98171/98171]

--2021-06-29 02:16:41--  https://overapi.com/static/cs/jsquick.pdf
Reusing existing connection to overapi.com:443.
HTTP request sent, awaiting response... 200 OK
Length: 125862 (123K) [application/pdf]
Saving to: ‘overapi.com/static/cs/jsquick.pdf’

overapi.com/static/cs/jsquick.pdf                            100%[===========================================================================================================================================>] 122.91K  20.5KB/s    in 6.0s

2021-06-29 02:16:47 (20.5 KB/s) - ‘overapi.com/static/cs/jsquick.pdf’ saved [125862/125862]

--2021-06-29 02:16:49--  https://overapi.com/static/cs/JSB6RefBooklet.pdf
Reusing existing connection to overapi.com:443.
HTTP request sent, awaiting response... 200 OK
Length: 325346 (318K) [application/pdf]
Saving to: ‘overapi.com/static/cs/JSB6RefBooklet.pdf’

overapi.com/static/cs/JSB6RefBooklet.pdf                     100%[===========================================================================================================================================>] 317.72K  20.0KB/s    in 16s

2021-06-29 02:17:05 (20.0 KB/s) - ‘overapi.com/static/cs/JSB6RefBooklet.pdf’ saved [325346/325346]

--2021-06-29 02:17:07--  http://overapi.com/
Connecting to overapi.com (overapi.com)|185.199.111.153|:80... connected.
HTTP request sent, awaiting response... 301 Moved Permanently
Location: https://overapi.com/ [following]
--2021-06-29 02:17:09--  https://overapi.com/
Connecting to overapi.com (overapi.com)|185.199.111.153|:443... connected.
HTTP request sent, awaiting response... 200 OK
Length: 40271 (39K) [text/html]
Saving to: ‘overapi.com/index.html.tmp.html’

overapi.com/index.html.tmp.html                              100%[===========================================================================================================================================>]  39.33K  21.6KB/s    in 1.8s

2021-06-29 02:17:11 (21.6 KB/s) - ‘overapi.com/index.html.tmp.html’ saved [40271/40271]

Removing overapi.com/index.html.tmp.html since it should be rejected.

FINISHED --2021-06-29 02:17:11--
Total wall clock time: 48s
Downloaded: 6 files, 719K in 35s (20.3 KB/s)
Converted links in 0 files in 0 seconds.
|02:17:11|bryan@LAPTOP-9LGJ3JGS:[5-download-all-pdf] 5-download-all-pdf_exitstatus:0[╗__________________________________________________________o>
```
