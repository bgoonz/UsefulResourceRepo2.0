Data Types
----------

Both MySQL and PostgreSQL support many data types, ranging from traditional ones (e.g., Integer, Date, Timestamp) to complex ones (e.g., JSON, XML, TEXT). However, there is a difference between these two database products when it comes to the capability of catering to complex, real-time data search requirements. Let's take a look at both.

PostgreSQL not only supports traditional SQL data types (e.g., Numeric, Strings, Date, Decimal, etc.) but also supports unstructured data types (e.g., JSON, XML, and HSTORE) as well as network data types, bit strings, etc. What makes PostgreSQL stand out is its support for a wider range of data types, such as ARRAYs, NETWORK types, and Geometric data types (including advanced spatial data functions) to store and process spatial data. Supported data types can be found [here](https://www.postgresql.org/docs/11/datatype.html). The support for spatial data types and functions comes from an external module called PostGIS, which is an open-source extension. 

MySQL supports [various data types](https://dev.mysql.com/doc/refman/8.0/en/data-types.html) that help a variety of applications store and process data in different formats, including the following: traditional data types to store Integers, Characters or Strings, Date with Timestamps and Time Zones, Boolean, Float, Decimal, Large Text, and BLOB  to store binary data (like images). There is no support for geometric data types in MySQL.

JSON: PostgreSQL vs. MySQL 
---------------------------

PostgreSQL started supporting JSON data types from version 9.2. The JSON data support in PostgreSQL is much more advanced compared to MySQL. There are several JSON-specific operators and functions, making data searches in JSON documents very efficient. The JSONB feature from PostgreSQL-9.4, which stores JSON in a binary format, started supporting Full-Text Indexing (known as GIN Indexing), and this really makes Full-Text searching on JSON documents much faster.

MySQL just started supporting JSON data types recently (from Version 5.7), years later than PostgreSQL. The JSON data columns can be queried using SQL queries, and JSON attributes can be indexed as well. However, the support for JSON-specific functions is limited compared to PostgreSQL. Another limitation of MySQL is that there is no support for Full-Text Indexing on JSON columns. Since MySQL is not fully SQL compliant, it may not be a great choice for storing and processing JSON data.

Replication & Clustering 
-------------------------

Both MySQL and PostgreSQL have replication and clustering capabilities and can ensure data operations are distributed horizontally. Let's take a more detailed look.

MySQL supports a Primary-replica and Primary-to-multiple-replicas replication mechanism, which ensures that all data changes are replicated from a primary to a replica database via SQLs. This is why replication can only be asynchronous, which can be disadvantageous in terms of performance and scalability.

The advantage of MySQL replication is that the replicas are not read-only. This means that if an application fails over to a replicas when a primary database crashes, replicas can consume both reads and writes to ensure that applications are working seamlessly. DBAs will then need to make sure that a replica is out of replica mode and all the changes are reverse-replicated back to the primary. However, replication can be slow when there are long-running SQLs.

MySQL also supports NDB cluster, which is a multi-primary replication mechanism. This type of replication can be beneficial to high-transaction environments demanding horizontal scalability. However, there could be serious performance and latency issues if not implemented with care.

PostgreSQL replication is very popular and reliable. Unlike MySQL, PostgreSQL's replication is based on WAL files, which makes it more reliable, faster, and easier to manage. Postgres supports primary-replica and primary-to-multiple-replicas, including cascading replication. The replication in Postgres is termed as streaming or physical replication, which can be synchronous or asynchronous.

By default, replication is asynchronous, and replicas can cater to read requests. If the application (like a web application) demands the data snapshot on replicas to be the same as the primary, then synchronous replication will help. The caveat would be that the primary will hang if the transactions are not committed to the replica.

Replication at the table level can be achieved using external open-source tools such as Slony, Bucardo, Londiste, RubyRep, etc. All of them perform trigger-based replication. PostgreSQL also supports logical replication, which performs table-level replication using WAL records and removes the complexity brought in by trigger-based replication. Initially, logical replication was supported by an extension called pglogical and has been part of the PostgreSQL core from version 10. 

Views
-----

MySQL supports views; the number of tables used by the SQLs underneath the view is limited to 61. Views are like virtual tables that do not store data physically, and materialized views are not supported in MySQL. Views created with simple SQLs can be updated, while views created with complex SQLs cannot.

PostgreSQL supports views that are partially similar to MySQL. While views created with simple SQLs can be updated, the views created with complex SQLs cannot be updated. But there is a work-around to update complex views using RULES. Also, if the data is to be stored physically, PostgreSQL supports Materialized Views, which can be REFRESHED, and Indexes as well.

Triggers
--------

MySQL supports Triggers for AFTER and BEFORE events for INSERT, UPDATE, and DELETE statements. Triggers cannot execute dynamic SQL statements or stored procedures.

PostgreSQL triggers are advanced; the supported triggering events are AFTER, BEFORE, and INSTEAD OF triggers for INSERT, UPDATE, and DELETE events. If you need to execute a complex SQL when the trigger gets invoked, you can do this using functions. Yes, the triggers in PostgreSQL can also execute functions dynamically. 

```
CREATE TRIGGER audit

AFTER INSERT OR UPDATE OR DELETE ON employee

    FOR EACH ROW EXECUTE FUNCTION employee_audit_func();
```

Stored Procedures
-----------------

Stored Procedures are an important part of databases and cater to complex data-extraction requirements. Developers often use stored procedures as part of their database development process. Both MySQL and PostgreSQL databases support stored procedures, but [MySQL](https://dev.mysql.com/doc/refman/8.0/en/stored-program-restrictions.html) only supports standard SQL syntaxes, while PostgreSQL supports very advanced procedures.

Stored Procedures are implemented in the form of functions in PostgreSQL with a RETURN VOID clause. The part of this feature that developers love is the support it has for various languages that are not supported by MySQL, such as Ruby, Perl (PlPerl), Python (PlPython), TCL, Pl/PgSQL, SQL, and JavaScript.

Query 
------

As mentioned earlier, MySQL is not a fully SQL-compliant database and does not support all SQL features, making it a tough choice for developers and not a great choice for data warehousing applications, as there will be a need here for advanced and complex SQLs. 

Here are some limitations to be considered when choosing MySQL:

-   Certain UPDATE SQL results can be surprising and not per the SQL standard, as seen below:

```
mysql> select * from test;

+------+------+

| c | c1   |

+------+------+

|   10 |  100 |

+------+------+

1 row in set (0.01 sec)

mysql> update test set c=c+1, c1=c;

Query OK, 1 row affected (0.01 sec)

Rows matched: 1  Changed: 1  Warnings: 0

mysql>  select * from test;

+------+------+

| c | c1   |

+------+------+

|   11 |   11 |

+------+------+

1 row in set (0.00 sec)
```

The SQL standard expected results are supposed to be as shown here:

```
mysql>  select * from test;

+------+------+

| c | c1   |

+------+------+

|   11 |   10 |

+------+------+
```

-   Cannot UPDATE or DELETE statements; cannot SELECT from the same table. Below is an example of a DELETE:

```
mysql> delete from test where c in (select t1.c from test t1, test t2 where t1.c=t2.c);

ERROR 1093 (HY000): 
```

-   LIMIT clause is not allowed in the subqueries:

```
mysql> select * from test where c in (select c from test2 where c<3 limit 1);

ERROR 1235 (42000): 
```

MySQL doesn't yet support "LIMIT & IN/ALL/ANY/SOME subquery."

Also, MySQL does not support standard SQL clauses such as FULL OUTER JOINS, INTERSECT, and EXCEPT, which are commonly used. Index types, including Partial Indexes, Bitmap Indexes, and Expression Indexes, are also not supported, and these are important to speed up query performances.

PostgreSQL, on the other hand, is a fully SQL-compliant database and supports all SQL standard features. Applications of pretty much any nature from any domain can use PostgreSQL as their database, which makes it a popular choice for OLTP, OLAP, and DWH environments. PostgreSQL is the best choice for developers who have to write complex SQLs.

Partitioning 
-------------

MySQL and PostgreSQL both support table partitioning to improve the performance of queries that hit large-size Tables. However, there are certain limitations in both the databases. 

MySQL supports declarative table partitioning; supported partition types are RANGE, LIST, HASH, KEY, and COLUMNS (RANGE and LIST). SUBPARTITIONING is also supported. However, this feature may not be very flexible for DBAs because of certain limitations. Let's take a look at them:

-   From MySQL version 8.0, table partitioning is only possible with InnoDB and NDB storage engines, not with any other storage engines like MyISAM.
-   If the partition key column is not part of all the PRIMARY and UNIQUE KEY constraints of the table, then it is not possible to partition the table at all. The only other option is to partition a table with no PRIMARY or UNIQUE KEYs, which is a rare occurrence in the RDBMS world.
-   Support for placing the table partitions on tablespaces was phased out from MySQL-5.7.24. This means, DBAs cannot leverage the benefit of disk I/O balancing from table partitioning.

```
mysql> create table emp (id int not null, fname varchar (30), lname varchar(30), store_id int not null ) partition by range (store_id) ( partition p0 values less than (6) tablespace tbs, partition p1 values less than(20) tablespace tbs1, partition p2 values less than (40) tablespace tbs2);

ERROR 1478 (HY000): InnoDB : A partitioned table is not allowed in a shared tablespace.

mysql>
```

PostgreSQL supports two types of table partitioning: table partitioning by inheritance and declarative partitioning. Declarative partitioning was introduced in Version 10 and is similar to MySQL, whereas partitioning by inheritance is performed using triggers or rules. Performance benefits are significantly higher when an accurate partitioning strategy is implemented on tables with large volumes of data. Partitioning types supported are RANGE, LIST, and HASH. With the introduction of declarative partitioning, complexity and performance challenges due to triggers and rules are eradicated. 

Both types of partitioning for PostgreSQL have their benefits and limitations:

-   Similar to MySQL, declarative partitions in PostgreSQL can only be implemented if the partition key column is part of all the primary and UNIQUE KEY constraints.
-   When partitioning a table by inheritance, child tables cannot inherit primary key or UNIQUE KEY constraints from the primary table.
-   INSERTs and UPDATEs on the primary table are not automatically redirected to child tables; to do so, triggers or rules must be implemented, and the same needs to be done for automatically creating new partitions.

Table Scalability 
------------------

Table segments growing bigger in size can pose performance problems, and queries hitting those tables take more resources and time to complete. Efficient table design is thus important for good performance. MySQL and PostgreSQL have different options for this.

MySQL supports B-Tree Indexing and Partitioning to improve query performance on larger tables. However, the lack of support for Bitmap, Partial, and Functional Indexes in MySQL leaves DBAs with limited tuning options. Partitioning of larger tables can improve performance, but partition tables in MySQL cannot be placed in general tablespaces, which is a serious showstopper for I/O balancing.

PostgreSQL has several indexing and two types of partitioning options to improve data operations on a scalable table. Expression Indexing, Partial Indexing, Bitmap Indexing, and Full-Text Indexing can help improve query performance on larger-size Tables, which in turn can improve query performance significantly. In PostgreSQL, table partitions and Indexes can be placed in separate tablespaces on different disk file systems, which can greatly improve table scalability as well.

To achieve horizontal table-level scalability in Postgres (horizontal table partitioning), commercially developed products based on Postgres, such as CitusDB, Greenplum, and IBM Netezza, are the way to go. Open-source Postgres itself does not support horizontal table partitioning; PostgresXC is an option but is not popular due to its performance and maintenance overhead.

Storage
-------

Data storage is a critical capability of any database. PostgreSQL and MySQL provide various options for storing data. Storing data means storing the physical database objects, such as Tables and Indexes, on a disk. This section focuses on two types of storage options: common storage and pluggable storage. 

PostgreSQL has a common storage feature called tablespaces, which can accommodate physical objects like Tables, Indexes, and Materialized Views. With the help of tablespaces, the objects can be grouped and stored across multiple physical locations, which helps distribute I/O in an efficient way. PostgreSQL does not support pluggable storage engines, although this is expected in future releases. 

MySQL, similar to PostgreSQL, has a tablespaces feature (part of InnoDB engine) that can help DBAs group and store physical objects (Tables, Indexes, etc.), and this can help distribute I/O. MySQL also supports pluggable storage engines, which can help the database meet specific storage requirements for various types of applications such as OLTP, Data Warehousing, etc. This is one of the biggest advantages of using MySQL as a database. The pluggable storage feature can be enabled by installing plugins, and although configuring pluggable storage involves complexity, applications are completely oblivious to this.

Data Models Supported
---------------------

NoSQL capabilities in an RDBMS database can help deal with unstructured data, for example, JSON, XML, and other TEXT data types. 

MySQL has limited NoSQL capabilities. JSON data types have been introduced in MySQL from Version 5.7 and have a long way to go to become more mature.

PostgreSQL has become a very popular NoSQL choice for developers in the last three years and has enormous JSON capabilities. With JSON and JSONB data types, JSON-based data operations can be significantly faster and more efficient. JSON data can also be Indexed with B-Tree and GIN for improved searches, and XML and HSTORE data types can handle XML formats and other complex text-format data as well. With the support for spatial data types, PostgreSQL is no doubt a complete multi-model database.

Security
--------

Database security plays a vital role in securing data from unauthorized access. Secured access is implemented at various levels in the database, including the object level and connection level.

MySQL grants access to the database, objects, and connections via ROLES and PRIVILEGES. Every user must be granted a connection privilege using an SQL for every IP address from which a user is connecting, or connections can be granted all at once to multiple IP addresses as part of a subnet.

Here below, the command grants all privileges on all the objects in the database "testdb" to user "testuser" from the IP "192.168.1.1":

```
GRANT ALL PRIVILEGES ON testdb.* TO 'testuser@'192.168.1.1' IDENTIFIED BY 'newpassword';
```

If the user is connecting from all the IPs of 192.168.1, then this command works:

```
GRANT ALL PRIVILEGES ON testdb.* TO 'testuser@'192.168.1.*' IDENTIFIED BY 'newpassword';
```

Every time the privilege is granted, a password must be specified; otherwise, the user cannot connect.

MySQL also supports SSL-based connections over the network and provides security based on SE-Linux modules. Integration with external authentication systems, such as LDAP and PAM, is part of the MySQL enterprise edition.

PostgreSQL provides access to database objects and data via ROLES and PRIVILEGES using GRANT commands. Connection authentication is done in a simpler way, via a pg_hba.conf authentication file that contains the list of IP addresses along with username and type of access. This is much more reliable and simpler. Below is a sample entry from a pg_hba.conf file:

```
host   database  user  address  auth-method  [md5 or trust or reject]
```

Postgres open-source version supports SSL-based connections and can also be integrated with external authentication systems, including LDAP, Kerberos, and PAM, which are efficient and reliable. 

Analytical functions perform aggregation on a set of rows. There are two types of analytical functions: window functions and aggregate functions. Aggregate functions perform aggregation and return a single aggregate value for a set of rows (like sum, avg, min, max, etc.), whereas analytical functions return a single aggregate value for each of the rows. Both MySQL and PostgreSQL support various analytical functions. MySQL has lately come up with some window functions in Version 8.0, whereas PostgreSQL has been supporting the same for a long time now.

PostgreSQL supports the window functions below: 

|

Name of the function           

 |

  Description

 |
|

CUME_DIST

 |

Return the relative rank of the current row.

 |
|

DENSE_RANK

 |

Rank the current row within its partition without gaps.

 |
|

FIRST_VALUE

 |

Return a value evaluated against the first row within its partition.

 |
|

LAG

 |

Return a value evaluated at the row that is at a specified physical offset row before the current row within the partition.

 |
|

LAST_VALUE

 |

Return a value evaluated against the last row within its partition.

 |
|

LEAD

 |

Return a value evaluated at the row that is offset rows after the current row within the partition.

 |
|

NTILE

 |

Divide rows in a partition as equally as possible and assign each row an integer starting from 1 to the argument value.

 |
|

NTH_VALUE

 |

Return a value evaluated against the nth row in an ordered partition.

 |
|

PERCENT_RANK

 |

Return the relative rank of the current row (rank-1) / (total rows-1)

 |
|

RANK

 |

Rank the current row within its partition with gaps.

 |
|

ROW_NUMBER

 |

Number the current row within its partition starting from 1.

 |

MySQL supports pretty much all the window functions that PostgreSQL supports, with the following limitations:

-   Window functions cannot be used as part of UPDATE or DELETE.
-   DISTINCT is not supported with Window functions.
-   NESTED window functions are not supported.=

Administration (GUI Tools)
--------------------------

MySQL database can be remotely accessed using Oracle's SQL Developer, MySQL Workbench, DBeaver, OmniDB, and so on. For monitoring database performance and health, tools such as Nagios, Cacti, and Zabbix are popular.

PostgreSQL can be GUI-managed using Oracle's SQL Developer, pgAdmin, OmniDB, and DBeaver. Tools popular for monitoring PostgreSQL health and performance are Nagios, Zabbix, and Cacti.

Performance
-----------

MySQL database performance-optimization options are very limited, and many Indexes are also not supported. Without full SQL compliance, writing efficient and well-performing SQL queries can be a challenge. MySQL is also not the best choice for large volumes of data. Tablespaces for spreading data across multiple disks are a challenge, since tablespaces are only supported in InnoDB and cannot accommodate table partitions. Simple queries to hit tables can be made to complete faster by creating B-TREE Indexes.

PostgreSQL database is a highly suitable database for any kind of workload: OLTP, OLAP, Data warehousing, and more. It also fully complies with SQL standards, so it is possible to write efficient queries and pl/pgsql programs. With its support for a wide range of Indexes, including B-Tree, Bitmap, Partial, and Full-Text, performance can be greatly improved. Re-indexing and re-organization of tables to remove bloats can also be performed online. Postgres has several configuration options for allocating memory to a database and queries, and partitioned tables can be placed across multiple tablespaces to balance disk I/O.

Adoption
--------

PostgreSQL is the world's most advanced open source database. Businesses around the world are using PostgreSQL for mission critical workloads. The PostgreSQL community and a few companies such as EnterpriseDB and 2ndQuadrant are making sure that PostgreSQL adoption continues to expand on a global level.

MySQL is definitely not the best choice for RDBMS or ORDBMS applications. Since Oracle's acquisition of MySQL, adoption of MySQL has significantly declined, and development progress in the open-source space has taken a hit as well, inviting criticism from MySQL users. 

Best Environments / Stacks
--------------------------

A stack is a packaged collection of various applications, operating systems, and database technologies that help you easily build web applications.

Both PostgreSQL and MySQL are part of different stacks used by various organizations and service providers. While MySQL is popular with LAMP stack, PostgreSQL is popular with LAPP stack. The LAPP stack stands for Linux, Apache, Postgres and Php/Python and is gaining in popularity.

LAMP stack stands for Linux Apache MySQL/MongoDB and Php/Python.

The LAPP stack is an option if the requirement is to use PostgreSQL. Developers can leverage both the NoSQL and RDBMS capabilities of PostgreSQL. Large-platform service providers, such as Amazon and VMware, are also providing services with readily installed LAPP stack modules. 

Conclusion
----------

Undoubtedly, PostgreSQL stands as the best-choice database due to its rich features and aggressive development efforts by PostgreSQL developers. Most every organization uses PostgreSQL today, and most domains are adopting PostgreSQL for their applications as well as looking to migrate their legacy applications to it. If you are migrating away from legacy oracle database and want to accomplish this task in days instead of months, see [EDB Postgres Advanced Server](https://www.enterprisedb.com/enterprise-postgres/edb-postgres-advanced-server). EDB Postgres Advanced Server is an enhanced Postgres database with Oracle compatibility and enterprise security features. 

​

##### Popular Links

-   [Connecting PostgreSQL using psql and pgAdmin](https://www.enterprisedb.com/postgres-tutorials/connecting-postgresql-using-psql-and-pgadmin)
-   [How to use PostgreSQL with Django](https://www.enterprisedb.com/postgres-tutorials/how-use-postgresql-django)
-   [10 Examples of PostgreSQL Stored Procedures](https://www.enterprisedb.com/postgres-tutorials/10-examples-postgresql-stored-procedures)
-   [How to use PostgreSQL with Laravel](https://www.enterprisedb.com/postgres-tutorials/how-use-postgresql-laravel)
-   [How to use tables and column aliases...](https://www.enterprisedb.com/postgres-tutorials/how-use-tables-and-column-aliases-when-building-postgresql-query)

##### Featured Links

-   [PostgreSQL vs. SQL Server (MSSQL)...](https://www.enterprisedb.com/blog/microsoft-sql-server-mssql-vs-postgresql-comparison-details-what-differences)
-   [The Complete Oracle to PostgreSQL Migration...](https://www.enterprisedb.com/blog/the-complete-oracle-to-postgresql-migration-guide-tutorial-move-convert-database-oracle-alternative)
-   [PostgreSQL vs. MySQL: A 360-degree Comparison...](https://www.enterprisedb.com/blog/postgresql-vs-mysql-360-degree-comparison-syntax-performance-scalability-and-features)
-   [PostgreSQL Replication and Automatic Failover...](https://www.enterprisedb.com/postgres-tutorials/postgresql-replication-and-automatic-failover-tutorial)
-   [Postgres on Kubernetes or VMs: A Guide...](https://www.enterprisedb.com/blog/blog/postgres-kubernetes-or-vms-guide-framework-running-databases-best-way)

##### Resources

-   [Postgres Tutorials](https://www.enterprisedb.com/postgres-tutorials)
-   [The EDB Blog](https://www.enterprisedb.com/blog)
-   [White Papers](https://www.enterprisedb.com/white-papers)
-   [The EDB Docs](https://www.enterprisedb.com/docs/)
-   [Webinars](https://www.enterprisedb.com/webinars)

![](https://www.enterprisedb.com/sites/default/files/styles/thumbnail/public/pictures/picture-537347-1576096705.jpg?itok=cd1Po5tl)

[Pankil Shah](https://www.enterprisedb.com/pankilEDB)

A proud parent of a mischevious Golden Retriever, [Pankil Shah](http://pankilshah.net/) is a Marketing Manager, SaaS Products for EnterpriseDB. Pankil co-founded [Vclassrooming](https://www.vclassrooming.com/), a saas platform to improve the learning outcomes of K12 students.

Popular Posts
-------------

-   [Connecting PostgreSQL using psql and pgAdmin](https://www.enterprisedb.com/postgres-tutorials/connecting-postgresql-using-psql-and-pgadmin)
-   [How to use PostgreSQL with Django](https://www.enterprisedb.com/postgres-tutorials/how-use-postgresql-django)
-   [Microsoft SQL Server (MSSQL) vs. PostgreSQL Comparison in Details - What are the Differences? [2020]](https://www.enterprisedb.com/blog/microsoft-sql-server-mssql-vs-postgresql-comparison-details-what-differences)
-   [10 Examples of PostgreSQL Stored Procedures](https://www.enterprisedb.com/postgres-tutorials/10-examples-postgresql-stored-procedures)
-   [How to import and export data using CSV files in ](https://www.enterprisedb.com/postgres-tutorials/how-import-and-export-data-using-csv-files-postgresql)