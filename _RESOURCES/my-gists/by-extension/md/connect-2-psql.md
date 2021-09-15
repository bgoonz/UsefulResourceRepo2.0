# Connect to PostgreSQL Database

> This tutorial shows you different ways to connect to PostgreSQL database by using interactive terminal program called psql and pgAdmin GUI application.

**Summary**: in this tutorial, you will learn how to **connect to the PostgreSQL Database Server** via an interactive terminal program called **psql** and via the **pgAdmin** application.

When you [installed the PostgreSQL database server](https://www.postgresqltutorial.com/install-postgresql/ "Install PostgreSQL"), the PostgreSQL installer also installed some useful tools for working with the PostgreSQL database server. In this tutorial, you will learn how to connect to the PostgreSQL database server via the following tools:

*   psql – a terminal-based front-end to PostgreSQL database server.
*   pgAdmin – a web-based front-end to PostgreSQL database server.

1) Connect to PostgreSQL database server using psql
---------------------------------------------------

psql is an interactive terminal program provided by PostgreSQL. It allows you to interact with the PostgreSQL database server such as executing SQL statements and managing database objects.

The following steps show you how to connect to the PostgreSQL database server via the _psql_ program:

First, launch the **psql** program and connect to the PostgreSQL Database Server using the **postgres** user:


Second, enter all the information such as Server, Database, Port, Username, and Password. If you press Enter, the program will use the default value specified in the square bracket `[]` and move the cursor to the new line. For example, `localhost` is the default database server. In the step for entering the password for user postgres, you need to enter the password the user postgres that you chose during the [PostgreSQL installation](https://www.postgresqltutorial.com/install-postgresql/).


Third, interact with the PostgreSQL Database Server by issuing an SQL statement. The following statement returns the current version of PostgreSQL:


Please do not forget to end the statement with a semicolon (;). After pressing **Enter**, psql will return the current PostgreSQL version on your system.

2) Connect to PostgreSQL database server using pgAdmin
------------------------------------------------------

The second way to connect to a database is by using a pgAdmin application. The pgAdmin application allows you to interact with the PostgreSQL database server via an intuitive user interface.

The following illustrates how to connect to a database using pgAdmin GUI application:

First, launch the pgAdmin application.


The pgAdmin application will launch on the web browser as shown in the following picture:


Second, right-click the Servers node and select **Create > Server…** menu to create a server


Third, enter the server name e.g., **PostgreSQL** and click the **Connection** tab:


Fourth, enter the host and password for the **postgres** user and click the **Save** button:


Fifth, click on the Servers node to expand the server. By default, PostgreSQL has a database named postgres as shown below:


Sixth, open the query tool by choosing the menu item **Tool > Query Tool** or click the lightning icon.


Seventh, enter the query in the **Query Editor**, click the **Execute** button, you will see the result of the query displaying in the **Data Output** tab:

