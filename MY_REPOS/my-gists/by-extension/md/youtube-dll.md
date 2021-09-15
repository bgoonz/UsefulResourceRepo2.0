# How to download your Udemy course videos using youtube-dl
  > $ youtube-dl --list-extractors | grep udemy
  
 ## Steps
 1.  Get link to the course to download. e.g. https://www.udemy.com/course-name/
 2. Login into udemy website, save the cookie from chrome using Chrome (Cookie.txt)[1] export extension. Save it to file udemy-cookies.txt
 3. Get the link of the video that you want to download. usually in format. Use the command provided below where you have to replace the {course_link} and {path_to_cookies_file} with respective paths.
 
  ```
  $ youtube-dl {course_link} --cookies {path_to_cookies_file}
  ```
  
  ```
  $ youtube-dl --cookies ./udemy-cookies.txt https://www.udemy.com/course-name/
  ```
  
  **Notes** 
  - If you have previously installed `youtube-dl`, you should update it before attempting to download your Udemy courses
    ```
    $ youtube-dl -U
    ```
  - If you want your videos to be organized by chapter and the indices included, you can specify the output flag `-o`
    ```
    $ youtube-dl --cookies ./udemy-cookies.txt -o '%(playlist)s/%(chapter_number)s - %(chapter)s/%(playlist_index)s. %(title)s.%(ext)s' https://www.udemy.com/course-name/
    ```
 

[1]: https://chrome.google.com/webstore/detail/cookiestxt/njabckikapfpffapmjgojcnbfjonfjfg