# Form Validation Using JavaScript

> Incorrect information leads to bad user interactions. So as to prevent this problem, read and learn how to validate forms with the help of JavaScript!

1.  [Snippets](https://www.w3docs.com/snippets) 
2.  ›
3.  [JavaScript](https://www.w3docs.com/snippets/javascript.html) 
4.  ›
5.  [Form Validation Using JavaScript](https://www.w3docs.com/snippets/javascript/form-validation-using-javascript.html) 

Web forms are used to collect user's information such as name, email address, location, age, and so on. But sometimes users do not enter the expected details. So it is crucial to validate the form data before sending it to the server-side. For form validation, client-side [JavaScript](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/learn-javascript.html) can help us.

Let’s create Javascript code which will validate our form. In this example, we are going to validate the name, password, e-mail, telephone, subject, and address:

    function ValidationForm() {
      let username = document.forms["RegForm"]["Name"];
      let email = document.forms["RegForm"]["Email"];
      let phoneNumber = document.forms["RegForm"]["Telephone"];
      let select = document.forms["RegForm"]["Subject"];
      let pass = document.forms["RegForm"]["Password"];
      if (username.value == "") {
        alert("Please enter your name.");
        username.focus();
        return false;
      }
      if (email.value == "") {
        alert("Please enter a valid e-mail address.");
        email.focus();
        return false;
      }
      if (email.value.indexOf("@", 0) < 0) {
        alert("Please enter a valid e-mail address.");
        email.focus();
        return false;
      }
      if (email.value.indexOf(".", 0) < 0) {
        alert("Please enter a valid e-mail address.");
        email.focus();
        return false;
      }
      if (phoneNumber.value == "") {
        alert("Please enter your telephone number.");
        phoneNumber.focus();
        return false;
      }
      if (pass.value == "") {
        alert("Please enter your password");
        pass.focus();
        return false;
      }
      if (select.selectedIndex < 1) {
        alert("Please enter your course.");
        select.focus();
        return false;
      }
      return true;
    }

Here’s the full code in action:

    <!DOCTYPE html>
    <html>
      <head>
        <title>Title of the document</title>
        <style>
          .w3docs {
            margin-left: 70px;
            font-weight: bold;
            text-align: left;
            font-family: sans-serif, bold, Arial, Helvetica;
            font-size: 14px;
          }
          .buttons {
            display: flex;
            align-items: center;
            width: 100%;
          }
          div input {
            margin-right: 10px;
          }
          form {
            margin: 0 auto;
            width: 600px;
          }
          form input {
            padding: 10px;
          }
          form select {
            background-color: #ffffff;
            padding: 5px;
          }
          form label {
            display: block;
            width: 100%;
            margin-bottom: 5px;
          }
        </style>
      </head>
      <body>
        <h2 style="text-align: center"> Registration Form </h2>
        <form name="RegForm" action="/form/submit.php" onsubmit="return ValidationForm()" method="post" class="w3docs">
          <div>
            <label for="Name">Name:</label>
            <input type="text" id="Name" size="60" name="Name">
          </div>
          <br>
          <div>
            <label for="E-mail">E-mail Address:</label>
            <input type="text" id="E-mail" size="60" name="Email">
          </div>
          <br>
          <div>
            <label for="Password">Password:</label>
            <input type="text" id="Password" size="60" name="Password">
          </div>
          <br>
          <div>
            <label for="Telephone">Telephone: </label>
            <input type="text" id="Telephone" size="60" name="Telephone">
          </div>
          <br>
          <div>
            <label>Select Book</label>
            <select type="text" value="" name="Subject">
              <option></option>
              <option>HTML</option>
              <option>CSS</option>
              <option>PHP</option>
              <option>JavaScript</option>
            </select>
          </div>
          <br>
          <div class="buttons">
            <input type="submit" value="Send" name="Submit">
            <input type="reset" value="Reset" name="Reset">
          </div>
        </form>
        <script>
          function ValidationForm() {
            let username = document.forms["RegForm"]["Name"];
            let email = document.forms["RegForm"]["Email"];
            let phoneNumber = document.forms["RegForm"]["Telephone"];
            let select = document.forms["RegForm"]["Subject"];
            let pass = document.forms["RegForm"]["Password"];
            if(username.value == "") {
              alert("Please enter your name.");
              username.focus();
              return false;
            }
            if(email.value == "") {
              alert("Please enter a valid e-mail address.");
              email.focus();
              return false;
            }
            if(email.value.indexOf("@", 0) < 0) {
              alert("Please enter a valid e-mail address.");
              email.focus();
              return false;
            }
            if(email.value.indexOf(".", 0) < 0) {
              alert("Please enter a valid e-mail address.");
              email.focus();
              return false;
            }
            if(phoneNumber.value == "") {
              alert("Please enter your telephone number.");
              phoneNumber.focus();
              return false;
            }
            if(pass.value == "") {
              alert("Please enter your password");
              pass.focus();
              return false;
            }
            if(select.selectedIndex < 1) {
              alert("Please enter your course.");
              select.focus();
              return false;
            }
            return true;
          }
        </script>
      </body>
    </html>

[Try it Yourself »](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/tools/code-editor/5343)

Form validation checks the accuracy of the user’s information before submitting the form. JavaScript provides faster client-side form validation than server-side validation does. Server-side validation requires more time first occurring on the server, which requires the user's input to be submitted and sent to the server before validation occurs. Thus, client-side validation helps to create a better user experience. A lot of developers prefer JavaScript form validation.

  

**Do you find this helpful?**

* * *

Related articles
----------------


[Source](https://www.w3docs.com/snippets/javascript/form-validation-using-javascript.html)