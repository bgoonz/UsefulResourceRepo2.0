# 7 Best Practices for React Native Applications

> React Native Best Practices (Part 1)

React Native Best Practices (Part 1)
------------------------------------

[![Mohit](https://miro.medium.com/fit/c/96/96/1*BT86Q6lnVw8evF8qKJCHYQ.jpeg)](https://mohit19.medium.com/?source=post_page-----be1dd907e657--------------------------------)

1\. Use a Design System
-----------------------

Without consistent styling, it's hard to get the best possible results. A Design System is a set of rules and principles that set the foundation for how the application should look and feel. You need 4 things to keep in mind while working with your design system.

*   **Spacing:** While working with a cross-platform application, the screen sizes might vary between different components present on a screen, but make sure to provide consistent spacing between them for a coherent look.
*   **Color:** Choosing the right colors is not only the most important thing but also how you use them. A great solution is to use **_Color Palettes,_** where you can name your colors according to the preferred naming conventions, which increases your overall workflow.

> _Always name your colours in a way that you don’t have to think about how they should look in your application, name your colours in a more defined way so that you can make faster decisions._

> **_For example_**_,_ **_‘Primary’_** _as a primary colour in the application, ‘_**_Danger_**_’ as the colour that would be used in danger icons or anywhere you are enforcing the red colour._

*   **Typography:** We often forget about how the fonts change the way our application look in the results. It’s best to stick to a limited set of **font** **families**, **weights,** and **sizes** to achieve a pleasant coherent look.

2\. Responsive Style Properties
-------------------------------

In Web Applications, the need for responsive design is apparent where the screen sizes can range from a small mobile device to a widescreen desktop device. But in **React Native** where the target is only mobile devices, it might not work with the same device size, but the variance in screen dimension is already big enough which makes it hard to find that one size that fits all for styling the application.

*   To work with responsive design you can define some breakpoints by categorizing different screen devices.

**_For example:_**

![](https://miro.medium.com/max/60/1*ikLogBulB17CObSnn5XQFA.png?q=20)

![](https://miro.medium.com/max/1640/1*ikLogBulB17CObSnn5XQFA.png)

*   With these breakpoints, anything below **321** pixels in width should fall in the category of being a smaller mobile device, and below **768** is a regular mobile device & anything wider than that is a tablet.

3\. Use TypeScript
------------------

TypeScript and React make a perfect combination, especially if you are working in _Visual Studio Code_. The benefit that you get by using TypeScript is that instead of relying on React’s **PropTyes** validation which only happens when the component is rendered at runtime, TypeScript allows you to validate any errors in your project. Also, you can define property types to only accept values available in the theme & with this, your editor will also autocomplete the valid values for you.

4\. Static Image Resources
--------------------------

Always manage your _static image resources_ the right way, otherwise, your application will be using a lot of time to work with static files event when it's not required. To add a static image in your application, you have to do it in such a way that the image name require is defined statically.

**_For example,_**

![](https://miro.medium.com/max/2824/1*zlyDM_uyjI7w3F1lUbLz1g.png)

5\. Use Platform Specific Styles
--------------------------------

React Native offers a built-in API to write platform-specific code, without the Platform API you will end up having a lot of different styles for different platforms **_(Android & iOS)_**, to organize these styles you can use the Platform module for Stylesheets. You can use the **Platform.OS** to automatically detect the OS and then apply the right styles.

**_For example,_**

![](https://miro.medium.com/max/2824/1*NcTqPLBTF1PL3A7v71fIzg.png)

6\. Create Aliases
------------------

Creating aliases is the best way to get rid of the issue with nested imports, such as **ActiveButton from ‘../../Components/Buttons’.** You can use **babel-plugin-module-resolver** to create such aliases.

7\. Always Assign Unique Key to Each Element
--------------------------------------------

In React or React native assigning a unique key can solve many issues that make it harder to work with applications containing components such as **Lists.**

**_For example,_**

![](https://miro.medium.com/max/2824/1*Sl0s60gU5HEzT0GOES0O_A.png)


[Source](https://javascript.plainenglish.io/7-best-practices-for-react-native-applications-be1dd907e657)