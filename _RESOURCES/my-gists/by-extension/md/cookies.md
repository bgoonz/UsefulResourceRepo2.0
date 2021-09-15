What is a cookie???
===================

Cookies are usually small text files, given ID tags that are stored on your computer's browser directory or program data subfolders.Cookies are created when you use your browser to visit a website that uses cookies to keep track of your movements within the site,help you resume where you left off, remember your registered login,theme selection, preferences,and other customization functions.The website stores a corresponding file(with same ID tag)to the one they set in your browser and in this file they can track and keep information on your movements within the site and any information you may have voluntarily given while visiting the website,such as email address.

For example when you visit Amazon.in and search for Samsung Mobile Phones,this gets noted in your browsing history, the next time you open Amazon.in on your browser, the cookies read your browsing history and you will be shown Samsung Mobile phones on your Amazon homepage.

What cookies do???
==================

Secure websites use cookies to validate a user's identity as they browse from page to page;without cookies,login credentials would have to be entered between before every product added to cart or wish list.Cookies enable and improve:

1- Customer log-in\
2- Persistent shopping carts\
3-Wish lists\
4-Product recommendations\
5-Custom user interfaces\
6-Retaining customer address and payment information

![](https://miro.medium.com/max/60/1*UAam6kEtR6LhfxX1uHW0ng.jpeg?q=20)

![](https://miro.medium.com/max/553/1*UAam6kEtR6LhfxX1uHW0ng.jpeg)

There are five types of cookies:-

1- Session cookies-Session cookies are created temporarily in your browser's subfolder while you are visiting a website. Once you leave the site,the session cookie is deleted.

2- Persistent cookies-Persistent cookie files remain in your browser's subfolder and are activated again once you visit the website that created that particular cookie.A persistent cookie remains in the browser's subfolder for the duration period set within the cookie's file.

3-Third Party Cookies-A cookie set by a domain name that is not the domain name that appears in the browser address bar these cookies is mainly used for tracking user browsing patterns and/or finding the Advertisement recommendations for the user.

4-Secure Cookie-A secure cookie can only be transmitted over an encrypted connection.A cookie is made secure by adding the secure flag to the cookie. Browsers which support the secure flag will only send cookies with the secure flag when the request is going to an HTTPS page.

5-HTTP Only Cookie-It informs the browser that this particular cookie should only be accessed by the server.Any attempt to access the cookie from the client script is strictly prohibited.This is important security protection for session cookies.

Creating cookie:-
=================

The setcookie() function is used for the cookie to be sent along with the rest of the HTTP headers.When a developer creates a cookie,with the function setcookie,he must specify at least three arguments.These arguments are setcookie (name, value, expiration)

![](https://miro.medium.com/max/60/1*Q2R_SKzQ-41em2XMIOEnFw.jpeg?q=20)

![](https://miro.medium.com/max/617/1*Q2R_SKzQ-41em2XMIOEnFw.jpeg)

Cookie Attributes:-
===================

1.  Name: Specifies the name of the cookie.
2.  Value: Specifies the value of the cookie.
3.  Secure: specifies whether or not the cookie should only be transmitted over a secure HTTPS connection.TRUE indicates that the cookie will only be set if a secure connection exists.Default is FALSE.
4.  Domain: specifies the domain name of the cookie.To make the cookie available on all subdomains of example.com,set the domain to "xyz.com". Setting it to [www.xyz.com](http://www.example.com/) will make the cookie only available in the www subdomain.
5.  Path: specifies the server path of the cookie.If set to "/", the cookie will be available within the entire domain.If set to "/php/",the cookie will only be available within the php directory and all sub-directories of php.The default value is the current directory that the cookie is being set in.
6.  HTTPOnly:if set to TRUE the cookie will be accessible only through the HTTP protocol.This setting can help to reduce identity theft through XSS attacks.Default is FALSE.

Session ID
==========

A session ID is a unique number that a Web site's server assigns a specific user for the duration of that user's visit.The session ID can be stored as a cookie, form field,or URL.

Explanation:

![](https://miro.medium.com/max/60/1*YU5dxfz5v3gyPOT0KwAdpA.png?q=20)

![](https://miro.medium.com/max/711/1*YU5dxfz5v3gyPOT0KwAdpA.png)

Image Source: <http://nikolaisammut.blogspot.com/2012/04/php-sessions-cookies.html>

There are three components inside this picture:HTTP Client,HTTP server and Database (holding session ID).

Step1: the client sends a request to the server via POST or GET.

Step2: session Id created on the web server. Server saves session ID into the database and using set-cookie function & send session ID to the client browser as a response.

Step3: a cookie with session ID stored on client browser is sent back to the server where server matches it from the database and sends a response as HTTP 200 OK.

Session Fixation Attack
=======================

Session fixation is an web application attack in which attacker can trick a victim into authenticating in the application using Session Identifier provided by the attacker. Unlike Session Hijacking,this does not rely on stealing Session ID of an already authenticated user.

In a simple way attacker can send a link containing fixed session id and if victim click on the link,victim's session id will be fixed,since attacker already know the session id so he/she can can easily hijack the session.

Target sit :- <https://unsecured.nwebsec.com/SessionFixation>

Step 1->Attack log on target site with his credentials.

Attacker's Session ID:-

![](https://miro.medium.com/max/60/1*0abLuUmhuTMEosHUTOEmPw.png?q=20)

![](https://miro.medium.com/max/756/1*0abLuUmhuTMEosHUTOEmPw.png)

Step 2->Attacker's link containing fixed session id-<https://www.nwebsec.com/SessionSecurity/SessionFixation/SetDomainCookie?id=pzlaaw53lzbmhspousk00avb>

Step 3 -> Attack can send this link via email as the victim click on the given link his session id will be fixed.

As you can see now victim as already clicked on the link and redirected to a login page with fixed session id

![](https://miro.medium.com/max/60/1*D0GTdWCvtPOHpHDjt9GShA.png?q=20)

![](https://miro.medium.com/max/756/1*D0GTdWCvtPOHpHDjt9GShA.png)

![](https://miro.medium.com/max/60/1*ZVGFsDcUyqLq10pAB1e3OA.png?q=20)

![](https://miro.medium.com/max/756/1*ZVGFsDcUyqLq10pAB1e3OA.png)

As you can see victim have same session id as attacker.As the session id for victim and attacker is same, attacker need to refresh its page and can see all the secrets of victim.