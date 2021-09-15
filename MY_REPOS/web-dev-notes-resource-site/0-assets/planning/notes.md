````
cd Stable/

0-assets  2-content  core-site  dir.html  index.html    netlify.js    node_modules       package.json  workspace.code-workspace
1-tools   README.md  css        fonts     landing-page  netlify.toml  package-lock.json  server.js

\___________________________________________________
bryan_dir:Stable_exitstatus:0 ====>

jupyter-lab
[I 2021-02-06 13:21:52.337 ServerApp] jupyterlab | extension was successfully linked.
[I 2021-02-06 13:21:52.379 LabApp] JupyterLab extension loaded from /home/bryan/.local/lib/python3.8/site-packages/jupyterlab
[I 2021-02-06 13:21:52.379 LabApp] JupyterLab application directory is /home/bryan/.local/share/jupyter/lab
[I 2021-02-06 13:21:52.383 ServerApp] jupyterlab | extension was successfully loaded.
[I 2021-02-06 13:21:52.383 ServerApp] Serving notebooks from local directory: /mnt/c/MY-WEB-DEV/08-my-website/Stable
[I 2021-02-06 13:21:52.383 ServerApp] Jupyter Server 1.3.0 is running at:
[I 2021-02-06 13:21:52.383 ServerApp] http://localhost:8888/lab?token=77532fba8c9f6767aa0db64db5116b8f9b95600cda1b6da3
[I 2021-02-06 13:21:52.383 ServerApp]  or http://127.0.0.1:8888/lab?token=77532fba8c9f6767aa0db64db5116b8f9b95600cda1b6da3
[I 2021-02-06 13:21:52.384 ServerApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
[C 2021-02-06 13:21:52.603 ServerApp]

    To access the server, open this file in a browser:
        file:///home/bryan/.local/share/jupyter/runtime/jpserver-11248-open.html
    Or copy and paste one of these URLs:
        http://localhost:8888/lab?token=77532fba8c9f6767aa0db64db5116b8f9b95600cda1b6da3
     or http://127.0.0.1:8888/lab?token=77532fba8c9f6767aa0db64db5116b8f9b95600cda1b6da3
[I 2021-02-06 18:40:09.957 ServerApp] interrupted
Serving notebooks from local directory: /mnt/c/MY-WEB-DEV/08-my-website/Stable
1 active kernel
Jupyter Server 1.3.0 is running at:
http://localhost:8888/lab?token=77532fba8c9f6767aa0db64db5116b8f9b95600cda1b6da3
 or http://127.0.0.1:8888/lab?token=77532fba8c9f6767aa0db64db5116b8f9b95600cda1b6da3
Shutdown this Jupyter server (y/[n])? [W 2021-02-06 18:40:10.009 LabApp] Build failed, running a clean and rebuild


Exiting via interrupt: 2

[I 2021-02-06 18:40:10.643 LabApp] Cleaning /home/bryan/.local/share/jupyter/lab...
[W 2021-02-06 18:40:10.646 ServerApp] 500 POST /lab/api/build?1612654730271 (127.0.0.1): 'AppOptions' object has no attribute 'extensions'
[W 2021-02-06 18:40:10.647 LabApp] 'AppOptions' object has no attribute 'extensions'
[E 2021-02-06 18:40:10.648 LabApp] {
      "Host": "localhost:8888",
      "Connection": "keep-alive",
      "Content-Length": "0",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
      "X-Xsrftoken": "2|1e66e37c|bab7dc683f80c6e10883c3b651f9e331|1612635657",
      "Authorization": "token 77532fba8c9f6767aa0db64db5116b8f9b95600cda1b6da3",
      "Content-Type": "application/json",
      "Accept": "*/*",
      "Origin": "http://localhost:8888",
      "Sec-Fetch-Site": "same-origin",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Dest": "empty",
      "Referer": "http://localhost:8888/lab/tree/Untitled.ipynb",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9",
      "Cookie": "_ga=GA1.1.1355674283.1612518113; _xsrf=2|1e66e37c|bab7dc683f80c6e10883c3b651f9e331|1612635657; username-localhost-8889=\"2|1:0|10:1612639427|23:username-localhost-8889|44:MjM1MjhmMTJhOWIwNDUyNWFkZmJiMTcyZWFlZDk3OGE=|683f2a06a2edd2f26b67c659a6f9358f9091bf3e3a4f9b786e7a070799772291\"; username-localhost-8888=\"2|1:0|10:1612654729|23:username-localhost-8888|44:Y2E2MTQwN2VlMzAxNGY1Y2FmNWM2ZTc3MzYzNDI5YmE=|1a57e25aa3a8b0dc992fb920241628acc367b591ffabf80fb394e7c0673e06ad\""
    }
[E 2021-02-06 18:40:10.649 LabApp] 500 POST /lab/api/build?1612654730271 (127.0.0.1) 80146.47ms referer=http://localhost:8888/lab/tree/Untitled.ipynb
^[[A^[[A^C[C 2021-02-06 18:40:12.983 ServerApp] received signal 2, stopping
[I 2021-02-06 18:40:12.985 ServerApp] Shutting down 1 kernel
^C[C 2021-02-06 18:40:14.484 ServerApp] received signal 2, stopping
Traceback (most recent call last):
  File "/home/bryan/.local/bin/jupyter-lab", line 8, in <module>
    sys.exit(main())
  File "/home/bryan/.local/lib/python3.8/site-packages/jupyter_server/extension/application.py", line 517, in launch_instance
    serverapp.start()
  File "/home/bryan/.local/lib/python3.8/site-packages/jupyter_server/serverapp.py", line 2013, in start
    self.start_ioloop()
  File "/home/bryan/.local/lib/python3.8/site-packages/jupyter_server/serverapp.py", line 2005, in start_ioloop
    self.cleanup_kernels()
  File "/home/bryan/.local/lib/python3.8/site-packages/jupyter_server/serverapp.py", line 1828, in cleanup_kernels
    run_sync(self.kernel_manager.shutdown_all())
  File "/home/bryan/.local/lib/python3.8/site-packages/jupyter_server/utils.py", line 228, in run_sync
    return wrapped()
  File "/home/bryan/.local/lib/python3.8/site-packages/jupyter_server/utils.py", line 227, in wrapped
    return result
UnboundLocalError: local variable 'result' referenced before assignment
^C

\___________________________________________________
bryan_dir:Stable_exitstatus:130 ====>

jupyter-lab
[I 2021-02-06 18:40:34.772 ServerApp] jupyterlab | extension was successfully linked.
[I 2021-02-06 18:40:35.692 LabApp] JupyterLab extension loaded from /home/bryan/.local/lib/python3.8/site-packages/jupyterlab
[I 2021-02-06 18:40:35.693 LabApp] JupyterLab application directory is /home/bryan/.local/share/jupyter/lab
[I 2021-02-06 18:40:35.775 ServerApp] jupyterlab | extension was successfully loaded.
[I 2021-02-06 18:40:35.777 ServerApp] Serving notebooks from local directory: /mnt/c/MY-WEB-DEV/08-my-website/Stable
[I 2021-02-06 18:40:35.788 ServerApp] Jupyter Server 1.3.0 is running at:
[I 2021-02-06 18:40:35.789 ServerApp] http://localhost:8888/lab?token=cd939cb8cf2bd783a193a7a45bb45f08b6bf7df922349270
[I 2021-02-06 18:40:35.789 ServerApp]  or http://127.0.0.1:8888/lab?token=cd939cb8cf2bd783a193a7a45bb45f08b6bf7df922349270
[I 2021-02-06 18:40:35.790 ServerApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
[C 2021-02-06 18:40:39.977 ServerApp]

    To access the server, open this file in a browser:
        file:///home/bryan/.local/share/jupyter/runtime/jpserver-16544-open.html
    Or copy and paste one of these URLs:
        http://localhost:8888/lab?token=cd939cb8cf2bd783a193a7a45bb45f08b6bf7df922349270
     or http://127.0.0.1:8888/lab?token=cd939cb8cf2bd783a193a7a45bb45f08b6bf7df922349270```
````
