#!/usr/bin/local/python
import sys
import time
import pyodbc
import json
import pyhs2
import subprocess
import MySQLdb
import datetime
from impala.dbapi import connect
import pexpect

username = ''
password = ''
datanode = ''
retries = 0

def impala_query_to_file(user, pw, cmd, hostname, filename, delimiter = '\t', timeout=120):
	"""run impala command through cli

	    Args:
	        user: impala username
	        pw: password
	        cmd: command you want run
	        hostname: datanode where impala instance resides

	    Returns:
	        nothing
	"""
	print "impala-shell -i '"+hostname+"' -q '"+cmd+"' -u '"+user+ "' -l"
	child = pexpect.spawn("impala-shell -i '"+hostname+"' -q '"+cmd+"' -u '"+user+ "' -l -B -o " + filename + " '--output_delimiter=" + delimiter + "'")
	child.logfile_read = sys.stdout
	child.expect('LDAP password for '+user+':')
	child.sendline(pw)
	child.expect(pexpect.EOF, timeout=timeout)

def check_last_modified(db, table, config, cred_file):
	"""gets table and finds it's last modified date

	    Args:
	        db: is database of where table exists
	        table: is the table to find latest modified date
	        config: is the configuration to be used
	        cred_file: is the location of the credentials to be used

	    Returns:
	        mod_date which is the datetime of when the table was last modified
	"""
	with open(cred_file,'rb') as cred:
		db_info = json.loads(cred.read())

	username = db_info[config]['username']
	pw = db_info[config]['password']
	datanode = db_info[config]['datanode']
	hostname = db_info[config]['edgenode']

	impala_connection = pyodbc.connect('DRIVER={Cloudera ODBC Driver for Impala 64-bit};HOST='+datanode+';PORT=21050;UID='+username+';PWD='+pw+';AuthMech=3;Database=marketing_sandbox',autocommit=True)
	impala_cursor = impala_connection.cursor()
	impala_cursor.execute('describe formatted '+db+'.`'+table+'`')
	results = impala_cursor.fetchall()
	for a in results:
		if a[1] == 'transient_lastDdlTime':
			unixtime = a[2]
	mod_date = datetime.datetime.fromtimestamp(int(unixtime)) - datetime.timedelta(hours=7)
	return mod_date

def create_parquet_table(tabletotransform,destinationtablename,runexternal=0,cred_file=''):
	"""makes view or table into parquet format managed table in impala

	    Args:
	        tabletotransform: is database.table/view name to tranform
	        destinationtablename: is the table landing managed parquet table

	    Returns:
	        nothing
	"""

	subprocess.call('sudo -su hdfs hive -e "drop table if exists '+destinationtablename+'"',shell=True)
	subprocess.call("sudo -su hdfs hive -e \"set hive.server2.idle.operation.timeout = 3600000; create table "+destinationtablename+" stored as parquet tblproperties('parquet.compression'='SNAPPY') as select * from "+tabletotransform+"\"",shell=True)
	if runexternal == 1:
		with open(cred_file,'rb') as cred:
			db_info = json.loads(cred.read())
		username = db_info['datahub']['username']
		password = db_info['datahub']['password']
		datanode = db_info['datahub']['datanode']
		run_impala_cmd(username, password, 'invalidate metadata '+destinationtablename,datanode)
		run_impala_cmd(username, password, 'compute stats '+destinationtablename,datanode)
	else:
		pass


def run_impala_cmd(user, pw, cmd, hostname):
	"""run impala command through cli

	    Args:
	        user: impala username
	        pw: password
	        cmd: command you want run
	        hostname: datanode where impala instance resides

	    Returns:
	        nothing
	"""
	print cmd
	impala_connection = pyodbc.connect('DRIVER={Cloudera ODBC Driver for Impala 64-bit};HOST='+hostname+';PORT=21050;UID='+user+';PWD='+pw+';AuthMech=3;Database=default',autocommit=True)
	impala_cursor = impala_connection.cursor()
	impala_cursor.execute(cmd+';')
	# print "impala-shell -i '"+hostname+"' -q '"+cmd+"' -u '"+user+ "' -l"
	# child = pexpect.spawn("impala-shell -i '"+hostname+"' -q '"+cmd+"' -u '"+user+ "' -l")
	# child.logfile_read = sys.stdout
	# child.expect('LDAP password for '+user+':')
	# child.sendline(pw)
	# child.expect(pexpect.EOF)

def fetch_impala_cmd(user, pw, cmd, hostname):
	"""run impala command via odbc and fetch list

	    Args:
	        user: impala username
	        pw: password
	        cmd: command you want run
	        hostname: datanode where impala instance resides

	    Returns:
	        list of query results
	"""

	impala_connection = pyodbc.connect('DRIVER={Cloudera ODBC Driver for Impala 64-bit};HOST='+hostname+';PORT=21050;UID='+user+';PWD='+pw+';AuthMech=3;Database=default',autocommit=True)
	impala_cursor = impala_connection.cursor()
	impala_cursor.execute(cmd+';')
	return impala_cursor.fetchall()

def run_compute_stats_bg(user, pw, db, table, hostname):
	"""runs compute stat command in background for table

	    Args:
	        user: impala username
	        pw: password
	        db: database that table belongs to
	        table: impala table to refresh stats
	        hostname: datanode where impala instance resides

	    Returns:
	        nothing
	"""
	
	subprocess.call('cd /home/ec2-user/PyETL && /usr/local/bin/python -c "from psdata_hadoop import *; run_impala_cmd(\''+user+'\',\''+pw+'\',\'compute stats '+db+'.\\`'+table+'\\`\',\''+hostname+'\')" &',shell=True)
	subprocess.call('cd ~',shell=True)

def run_impala_cmd_from_file(user, pw, filepath, hostname,timeout=10000):
	"""run impala command through cli using a file

	    Args:
	        user: impala username
	        pw: password
	        filepath: the full filepath of file to execute
	        hostname: datanode where impala instance resides

	    Returns:
	        nothing
	"""

	print "impala-shell -i '"+hostname+"' -f '"+filepath+"' -u '"+user+ "' -l"
	child = pexpect.spawn("impala-shell -i '"+hostname+"' -f '"+filepath+"' -u '"+user+ "' -l")
	child.logfile_read = sys.stdout
	child.timeout=timeout
	child.expect('LDAP password for '+user+':')
	child.sendline(pw)
	child.expect(pexpect.EOF)

def run_impala_cmd_from_string(user, pw, query, hostname,timeout=10000):
	"""run impala command through cli using a file

	    Args:
	        user: impala username
	        pw: password
	        filepath: the full filepath of file to execute
	        hostname: datanode where impala instance resides

	    Returns:
	        nothing
	"""

	print "impala-shell -i '"+hostname+"' -q '"+query+"' -u '"+user+ "' -l"
	child = pexpect.spawn("impala-shell -i '"+hostname+"' -q \""+query+"\" -u '"+user+ "' -l")
	child.logfile_read = sys.stdout
	child.timeout=timeout
	child.expect('LDAP password for '+user+':')
	child.sendline(pw)
	child.expect(pexpect.EOF)

def hive_connect(database, username, password,server='localhost'):
	"""Build pyhs2 connection to hive from file

	    Args:
	        server: string, name or ip address for hive where hiveserver is located
	        database: string, database name
	        username: string, useranme for the database
	        password: string, password for the database

	    Returns:
	        pyhs2 connection object
	"""
	try:
		connection = pyhs2.connect(host=server.encode('utf-8'),
									port=10000,
									authMechanism="PLAIN",
									user=username.encode('utf-8'),
									password=password.encode('utf-8'),
									database=database.encode('utf-8'))
	except (ValueError) as e:
		print "Error creating database connection", e

	return connection

def make_dt_table(table, database):
	global username
	global password
	global datanode
	global retries

	table = table.encode('utf-8')
	database = database.encode('utf-8')
	drop_str = 'drop table if exists '+database+'.'+table + ';'
	ins_str = 'create table ' +database+'.'+table+ ' stored as parquet tblproperties(\'parquet.compression\'=\'SNAPPY\') as select '
	hive_str = 'from ' + database + '.' + table + '_stg stg insert overwrite table ' + database +'.'+ table + ' select '
	impala_connection = pyodbc.connect('DRIVER={Cloudera ODBC Driver for Impala 64-bit};HOST='+datanode+';PORT=21050;UID='+username+';PWD='+password+';AuthMech=3;Database=default',autocommit=True)
	impala_cursor = impala_connection.cursor()
	run_impala_cmd(username, password, 'invalidate metadata '+database+'.'+table + '_stg',datanode)
	impala_cursor.execute('show column stats '+database+'.'+table+'_stg')
	collist = impala_cursor.fetchall()
	for a in collist:
		# print a[0],a[1]
		if 'BIGINT' == a[1] and 'id' not in a[0]:
			ins_str = ins_str + ' case when `'+a[0]+'` < 20000000000 then cast(from_unixtime(`' + a[0] +'`) as timestamp) else  cast((`' + a[0] +'`)/1000 as timestamp) end as `'+a[0]+'_dt`, `' + a[0] + '`,'
		elif 'BINARY' == a[1]:
			continue
		else:
			ins_str = ins_str + ' `' + a[0] + '`,'
			# to_date(cast((minstart)/1000 as timestamp))

	# ins_str = ins_str[:-1] + ' from ' + database + '.' + table + '_stg; drop table if exists ' +database+'.'+table+'_stg;'
	hive_str = hive_str + ins_str[:-1].split('as select')[1] + ';'
	ins_str = ins_str[:-1] + ' from ' + database + '.' + table + '_stg limit 0;'
	drop2_str = 'drop table if exists ' +database+'.'+table+'_stg;'
	# print drop_str, ins_str, drop2_str
	try:
		impala_cursor.execute(drop_str.encode('utf-8'))
		delete_hdfs_files(database,table)
		# run_impala_cmd(username, password, 'invalidate metadata '+database+'.'+table,datanode)
		time.sleep(2)
		# 'creating blank table \n', ins_str
		impala_cursor.execute((ins_str).encode('utf-8'))
		# print 'loading table using hive \n', ('sudo -u hdfs hive -e "'+hive_str+'"').replace('`','\\`')
		run_impala_cmd(username, password, 'invalidate metadata '+database+'.'+table,datanode)
		time.sleep(2)
		subprocess.call(('sudo -u hdfs hive -e "'+hive_str+'"').replace('`','\\`'),shell=True)
		run_impala_cmd(username, password, 'invalidate metadata '+database+'.'+table,datanode)
		time.sleep(2)
		impala_cursor.execute(drop2_str.encode('utf-8'))
		delete_hdfs_files(database,table+'_stg')
		# run_impala_cmd(username, password, 'invalidate metadata '+database+'.'+table,datanode)
		print database, table
		run_compute_stats_bg(username,password,database,table,datanode)
	except pyodbc.Error as e:
		# run_impala_cmd(username, password, 'invalidate metadata '+database+'.'+table,datanode)
		time.sleep(5)
		print 'Couldnt Load table \n', e, '\n', 'ran this query:\n', drop_str, ins_str, drop2_str,'\n','table: '+table, 'database: '+database
		print 'retrying again\n'
		try:
			impala_cursor.execute(drop_str.encode('utf-8'))
			delete_hdfs_files(database,table)
			# run_impala_cmd(username, password, 'invalidate metadata '+database+'.'+table,datanode)
			time.sleep(2)
			# 'creating blank table \n', ins_str
			impala_cursor.execute((ins_str).encode('utf-8'))
			# print 'loading table using hive \n', ('sudo -u hdfs hive -e "'+hive_str+'"').replace('`','\\`')
			run_impala_cmd(username, password, 'invalidate metadata '+database+'.'+table,datanode)
			time.sleep(2)
			subprocess.call(('sudo -u hdfs hive -e "'+hive_str+'"').replace('`','\\`'),shell=True)
			run_impala_cmd(username, password, 'invalidate metadata '+database+'.'+table,datanode)
			time.sleep(2)
			impala_cursor.execute(drop2_str.encode('utf-8'))
			delete_hdfs_files(database,table+'_stg')
			# run_impala_cmd(username, password, 'invalidate metadata '+database+'.'+table,datanode)
			run_compute_stats_bg(username,password,database,table,datanode)		
		except pyodbc.Error as e2:
			# run_impala_cmd(username, password, 'invalidate metadata '+database+'.'+table,datanode)
			time.sleep(5)
			print 'Couldnt Load table \n', e2, '\n', 'ran this query:\n', drop_str, ins_str, drop2_str,'\n','table: '+table, 'database: '+database
			print 'Failed Attempt 2, trying to rerun same function again on retry number: 3 '
			try:
				impala_cursor.execute(drop_str.encode('utf-8'))
				delete_hdfs_files(database,table)
				# run_impala_cmd(username, password, 'invalidate metadata '+database+'.'+table,datanode)
				time.sleep(2)
				# 'creating blank table \n', ins_str
				impala_cursor.execute((ins_str).encode('utf-8'))
				# print 'loading table using hive \n', ('sudo -u hdfs hive -e "'+hive_str+'"').replace('`','\\`')
				run_impala_cmd(username, password, 'invalidate metadata '+database+'.'+table,datanode)
				time.sleep(2)
				subprocess.call(('sudo -u hdfs hive -e "'+hive_str+'"').replace('`','\\`'),shell=True)
				run_impala_cmd(username, password, 'invalidate metadata '+database+'.'+table,datanode)
				time.sleep(2)
				impala_cursor.execute(drop2_str.encode('utf-8'))
				delete_hdfs_files(database,table+'_stg')
				# run_impala_cmd(username, password, 'invalidate metadata '+database+'.'+table,datanode)
				run_compute_stats_bg(username,password,database,table,datanode)
			except pyodbc.Error as e3:
				print 'failed to load table ' + database + '.' + table + '\n'
				print 'notifying data-engineering alerts\n'
				subprocess.call('curl -X POST --data-urlencode \'payload={"channel": "#data-eng-alerts", "username": "Alerts Allen", "text": "failed to load table ' + database + '.' + table + '" , "icon_emoji": ":redcard-ref:"}\' https://hooks.slack.com/services/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',shell=True)

def full_mssql_table_sqoop(table , sqlserver, sqldb, sqlconfig, config,cred_file, hiveserver='localhost', database='default',sqlschema='dbo',view=False):
	"""Gets table from sql server and sqoops it to hive

	Args:
	    table: table name where csv data will be written
	    sqlserver: sqlserver ip address
	    sqldb: sql server database
	    sqlconfig: config for sqlserver auth
	    server: sql server host name
	    config: which configuration name to pull hive username and password credentials
	    cred_file: location of db login config file
	    hiveserver: location of hive server
	    database: hive database to load table to

	Returns:
	    None
	"""
	global username
	global password
	global datanode

	with open(cred_file,'rb') as cred:
		db_info = json.loads(cred.read())
	username = db_info[config]['username']
	password = db_info[config]['password']
	datanode = db_info[config]['datanode']
	sqlusername = db_info[sqlconfig]['username']
	sqlpw = db_info[sqlconfig]['password']
	sqlconnection = pyodbc.connect('DRIVER={FreeTDS};SERVER='+sqlserver.encode('utf-8')+';PORT=1433;DATABASE='+sqldb.encode('utf-8')+';UID='+sqlusername.encode('utf-8')+';PWD='+sqlpw.encode('utf-8'))
	connection = hive_connect('default', username, password, hiveserver)
	cursor = connection.cursor()
	sqlcursor = sqlconnection.cursor()
	if view == True:
		cursor.execute('create database if not exists '+database)
		truncate_and_load(cursor,table,database,table,sqldb,sqlserver,sqlusername,sqlpw,sqlschema)
	else:
		sqlcursor.execute("SELECT t.name, COALESCE(CASE when MIN(k.COLUMN_NAME) <> max(k.COLUMN_NAME) THEN '0' ELSE MAX(k.COLUMN_NAME) END, '0') AS pk, COALESCE(CASE when MIN(SCHEMA_NAME(t.SCHEMA_ID)) <> max(SCHEMA_NAME(t.SCHEMA_ID)) THEN '0' ELSE MAX(SCHEMA_NAME(t.SCHEMA_ID)) END, 'dbo') AS sn FROM sys.tables t LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE k ON t.name = k.table_name where t.name = '"+table+"' GROUP BY t.name")
		table = sqlcursor.fetchall()
		cursor.execute('create database if not exists '+database)
		if table[0][1] == '0':
			truncate_and_load(cursor,table[0][0],database,table[0][0],sqldb,sqlserver,sqlusername,sqlpw,sqlschema)
		else:
			truncate_and_load_pk(cursor,table[0][0],database,table[0][0],sqldb,sqlserver,sqlusername,sqlpw,sqlschema)
	# run_impala_cmd(username, password, 'invalidate metadata',datanode)
	# cursor.execute('drop table '+database+'.'+table)
	# subprocess.call('sudo -u hdfs sqoop import --connect "jdbc:sqlserver://'+sqlserver+':1433;database='+
	# 	            sqldb+';username='+sqlusername+';password='+sqlpw+'" --table '+table+
	# 	            ' --as-parquetfile --hive-import -m 1 --hive-database '+database
	# 	            +' --compression-codec org.apache.hadoop.io.compress.SnappyCodec',shell=True)

def truncate_and_load(cursor, hivetable, hivedb, sqltable, sqldb, sqlserver, sqlusr, sqlpw, sqlschema='dbo'):
	"""drops table and reloads it in hive

	Args:
	    cursor: pyhs2 cursor to execute hive commands
	    hivetable: table name to load in hive
	    hivedb: hive db to load table
	    sqltable: sql table to load
	    sqldb: sql database to load
	    sqlserver: ip address of sql server
	    sqlusr: sql username
	    sqlpw: sql password
	    sqlschema: schema of sql table

	Returns:
	    None
	"""

	global username
	global password
	global datanode

	cursor.execute('drop table '+hivedb+'.'+hivetable + '_stg purge')
	delete_hdfs_files(hivedb,hivetable+'_stg')
	# run_impala_cmd(username, password, 'invalidate metadata '+hivedb+'.'+hivetable+'_stg', datanode)
	subprocess.call('sudo -u hdfs sqoop import --connect "jdbc:sqlserver://'+sqlserver+':1433;database='+
		            sqldb+';username='+sqlusr+';password='+sqlpw+'" --table '+sqltable+
		            ' --as-parquetfile --hive-import -m 1 --hive-database '+hivedb  + ' --hive-table ' + sqltable
		            +'_stg --compression-codec org.apache.hadoop.io.compress.SnappyCodec -- --schema '+sqlschema+' --direct',shell=True)

	make_dt_table(sqltable, hivedb)


def mysql_truncate_and_load(cursor, hivetable, hivedb, mysqltable, mysqldb, mysqlserver, mysqlusr, mysqlpw,port='3306'):
	"""drops table and reloads it in hive

	Args:
	    cursor: pyhs2 cursor to execute hive commands
	    hivetable: table name to load in hive
	    hivedb: hive db to load table
	    sqltable: sql table to load
	    sqldb: sql database to load
	    sqlserver: ip address of sql server
	    sqlusr: sql username
	    sqlpw: sql password
	    sqlschema: schema of sql table

	Returns:
	    None
	"""

	global username
	global password
	global datanode

	cursor.execute('drop table '+hivedb+'.'+hivetable + '_stg purge')
	delete_hdfs_files(hivedb,hivetable+'_stg')
	print username, password, datanode
	# run_impala_cmd(username, password, 'invalidate metadata '+hivedb+'.'+hivetable+'_stg',datanode)
	print 'sudo -u hdfs sqoop import --connect jdbc:mysql://'+mysqlserver+':'+port+'/'+mysqldb+' --username '+mysqlusr+' --password "'+mysqlpw+'" --table '+mysqltable+' --as-parquetfile --hive-import -m 1 --hive-database '+hivedb+' --compression-codec org.apache.hadoop.io.compress.SnappyCodec'
	subprocess.call("sudo -u hdfs sqoop import --connect jdbc:mysql://"+mysqlserver+":"+port+"/"+mysqldb+" --username "+mysqlusr+" --password '"+mysqlpw+"' --table "+mysqltable+
		            " --as-parquetfile --hive-import -m 1 --hive-database "+hivedb + ' --hive-table ' + mysqltable
		            +"_stg --compression-codec org.apache.hadoop.io.compress.SnappyCodec",shell=True)

	make_dt_table(mysqltable, hivedb)

def mssql_incremental_load(hivetable, hivedb, sqltable, sqldb, icol, sqlserver, config, sqlconfig, impalahost='ip-172-16-100-230.us-west-2.compute.internal',sqlschema='dbo', cred_file='/home/ec2-user/configs/dblogin.config', pk=False):
	"""incrementally loads table from ms sql server into hive

	Args:
	    hivetable: table name to load in hive
	    hivedb: hive db to load table
	    sqltable: sql table to load
	    sqldb: sql database to load
	    icol: incremental column in sql table
	    sqlserver: ip address of sql server
	    config: hive config
	    sqlconfig: ms sql config
	    sqlschema: schema of sql table

	Returns:
	    None
	"""

	global username
	global password
	global datanode

	with open(cred_file,'rb') as cred:
		db_info = json.loads(cred.read())

	username = db_info[config]['username']
	password = db_info[config]['password']
	datanode = db_info[config]['datanode']
	sqlusername = db_info[sqlconfig]['username']
	sqlpw = db_info[sqlconfig]['password']
	sqlconnection = pyodbc.connect('DRIVER={FreeTDS};SERVER='+sqlserver.encode('utf-8')+';PORT=1433;DATABASE='+sqldb.encode('utf-8')+';UID='+sqlusername.encode('utf-8')+';PWD='+sqlpw.encode('utf-8'))
	impala_connection = pyodbc.connect('DRIVER={Cloudera ODBC Driver for Impala 64-bit};HOST='+datanode+';PORT=21050;UID='+username+';PWD='+password+';AuthMech=3;Database=default',autocommit=True)
	connection = hive_connect('default', username, password)
	sqlcursor = sqlconnection.cursor()
	cursor = connection.cursor()
	impala_cursor = impala_connection.cursor()
	impala_cursor.execute("Select max("+icol+") from "+hivedb+"."+hivetable)
	maxval = impala_cursor.fetchall()
	maxval = maxval[0][0]
	impala_cursor.execute('describe '+hivedb+'.'+hivetable)
	collist = impala_cursor.fetchall()
	external_str = "create external table if not exists "+hivedb+"."+hivetable+"_incremental("

	for a in collist:
		external_str = external_str + a[0] + ' ' + a[1] +', '

	id_datatype = ''

	for a in collist:
		if a[0] == icol:
			id_datatype = a[1]

	if id_datatype == 'bigint' and 'id' not in icol:
		impala_cursor = impala_connection.cursor()
		impala_cursor.execute('select date_add(cast(0 as timestamp), interval '+str(maxval)+' millisecond)')
		maxval = impala_cursor.fetchall()
		maxval = str(maxval[0][0])


	# external_str = external_str[:-2] + ") ROW FORMAT DELIMITED FIELDS TERMINATED BY ',' LINES TERMINATED BY '\\n' STORED AS TEXTFILE LOCATION '/etl/incremental/"+sqltable+"'"

	if id_datatype != 'int' and 'id' not in icol:
		impala_cursor.execute('drop table if exists '+hivedb+'.'+hivetable +'_incremental')
		impala_cursor.execute('drop table if exists '+hivedb+'.'+hivetable +'_incremental_stg')
		try:
			subprocess.call("sudo -u hdfs hadoop fs -rm /user/hive/warehouse/"+hivedb+".db/"+hivetable.lower()+"_incremental_stg/*",shell=True)
			subprocess.call("sudo -u hdfs hadoop fs -rm /user/hive/warehouse/"+hivedb+".db/"+hivetable.lower()+"_incremental/*",shell=True)
		except OSError:
			print 'folder empty'
		if pk == True:
			subprocess.call('sudo -u hdfs sqoop import --connect "jdbc:sqlserver://'+sqlserver+':1433;database='+sqldb+';username='+sqlusername+';password='+sqlpw+'" -m 16 --as-parquetfile --split-by '+icol+ ' --compression-codec org.apache.hadoop.io.compress.SnappyCodec --hive-import --hive-database '+hivedb+' --hive-table '+ hivetable +'_incremental_stg --query \"select * from ['+sqldb+'].['+sqlschema+'].['+sqltable+'] where '+icol+' > \''+str(maxval)[:-3]+'\' and \$CONDITIONS\" --target-dir /etl/incremental/'+hivetable+' -- --schema '+sqlschema+' --direct', shell=True)
		else:
			subprocess.call('sudo -u hdfs sqoop import --connect "jdbc:sqlserver://'+sqlserver+':1433;database='+sqldb+';username='+sqlusername+';password='+sqlpw+'" -m 1 --as-parquetfile --split-by '+icol+ ' --compression-codec org.apache.hadoop.io.compress.SnappyCodec --hive-import --hive-database '+hivedb+' --hive-table '+ hivetable +'_incremental_stg --query \"select * from ['+sqldb+'].['+sqlschema+'].['+sqltable+'] where '+icol+' > \''+str(maxval)[:-3]+'\' and \$CONDITIONS\" --target-dir /etl/incremental/'+hivetable+' -- --schema '+sqlschema+' --direct', shell=True)
	else:
		impala_cursor.execute('drop table if exists '+hivedb+'.'+hivetable +'_incremental_stg')
		impala_cursor.execute('drop table if exists '+hivedb+'.'+hivetable +'_incremental')
		try:
			subprocess.call("sudo -u hdfs hadoop fs -rm /user/hive/warehouse/"+hivedb+".db/"+hivetable.lower()+"_incremental_stg/*",shell=True)
			subprocess.call("sudo -u hdfs hadoop fs -rm /user/hive/warehouse/"+hivedb+".db/"+hivetable.lower()+"_incremental/*",shell=True)
		except OSError:
			print 'folder empty'
		if pk == True:
			subprocess.call('sudo -u hdfs sqoop import --connect "jdbc:sqlserver://'+sqlserver+':1433;database='+sqldb+';username='+sqlusername+';password='+sqlpw+'" -m 16 --as-parquetfile --split-by '+icol+ '  --compression-codec org.apache.hadoop.io.compress.SnappyCodec --hive-import --hive-database '+hivedb+' --hive-table '+ hivetable +'_incremental_stg --query \"select * from ['+sqldb+'].['+sqlschema+'].['+sqltable+'] where '+icol+' > '+str(maxval)+' and \$CONDITIONS\" --target-dir /etl/incremental/'+hivetable+' -- --schema '+sqlschema+' --direct', shell=True)
		else:
			subprocess.call('sudo -u hdfs sqoop import --connect "jdbc:sqlserver://'+sqlserver+':1433;database='+sqldb+';username='+sqlusername+';password='+sqlpw+'" -m 1 --as-parquetfile --split-by '+icol+ '  --compression-codec org.apache.hadoop.io.compress.SnappyCodec --hive-import --hive-database '+hivedb+' --hive-table '+ hivetable +'_incremental_stg --query \"select * from ['+sqldb+'].['+sqlschema+'].['+sqltable+'] where '+icol+' > '+str(maxval)+' and \$CONDITIONS\" --target-dir /etl/incremental/'+hivetable+' -- --schema '+sqlschema+' --direct', shell=True)
	run_impala_cmd(username, password, 'invalidate metadata '+hivedb+'.'+hivetable,datanode)
	make_dt_table(hivetable.lower()+"_incremental", hivedb)
	subprocess.call("sudo -u hdfs hive -e 'insert into table "+hivedb+"."+hivetable+ " select * from "+hivedb+"."+hivetable+"_incremental'",shell=True)
	try:
		subprocess.call("sudo -u hdfs hadoop fs -rm /user/hive/warehouse/"+hivedb+".db/"+hivetable.lower()+"_incremental/*",shell=True)
	except OSError:
		print 'folder empty'

	impala_cursor.execute('drop table if exists '+hivedb+'.'+hivetable +'_incremental')	
	run_impala_cmd(username, password, 'invalidate metadata '+hivedb+'.'+hivetable,datanode)
	run_compute_stats_bg(username,password,hivedb,hivetable.lower(),datanode)

def mysql_incremental_load(cursor, hivetable, hivedb, mysqltable, mysqldb, mysqlserver, mysqlusr, mysqlpw):
	"""drops table and reloads it in hive

	Args:
	    cursor: pyhs2 cursor to execute hive commands
	    hivetable: table name to load in hive
	    hivedb: hive db to load table
	    sqltable: sql table to load
	    sqldb: sql database to load
	    sqlserver: ip address of sql server
	    sqlusr: sql username
	    sqlpw: sql password
	    sqlschema: schema of sql table

	Returns:
	    None
	"""

	cursor.execute('drop table '+hivedb+'.'+hivetable + '_stg purge')
	delete_hdfs_files(hivedb,hivetable+'_stg')
	print 'sudo -u hdfs sqoop import --connect jdbc:mysql://'+mysqlserver+':3306/'+mysqldb+' --username '+mysqlusr+' --password "'+mysqlpw+'" --table '+mysqltable+' --as-parquetfile --hive-import -m 1 --hive-database '+hivedb+ ' --hive-table ' + mysqltable +'_stg --compression-codec org.apache.hadoop.io.compress.SnappyCodec'
	subprocess.call("sudo -u hdfs sqoop import --connect jdbc:mysql://"+mysqlserver+":3306/"+mysqldb+" --username "+mysqlusr+" --password '"+mysqlpw+"' --table "+mysqltable+
		            " --as-parquetfile --hive-import -m 1 --hive-database "+hivedb + ' --hive-table ' + mysqltable +
		            +"_stg --compression-codec org.apache.hadoop.io.compress.SnappyCodec",shell=True)

	make_dt_table(mysqltable, hivedb)

def truncate_and_load_pk(cursor, hivetable, hivedb, sqltable, sqldb, sqlserver, sqlusr, sqlpw,sqlschema='dbo'):
	"""drops table and reloads it in hive but using the primary key

	Args:
	    cursor: pyhs2 cursor to execute hive commands
	    hivetable: table name to load in hive
	    hivedb: hive db to load table
	    sqltable: sql table to load
	    sqldb: sql database to load
	    sqlserver: ip address of sql server
	    sqlusr: sql username
	    sqlpw: sql password

	Returns:
	    None
	"""
	global username
	global password
	global datanode

	cursor.execute('drop table '+hivedb+'.'+hivetable+ '_stg purge')
	delete_hdfs_files(hivedb,hivetable+'_stg')
	# run_impala_cmd(username, password, 'invalidate metadata '+hivedb+'.'+hivetable+'_stg', datanode)
	subprocess.call('sudo -u hdfs sqoop import --connect "jdbc:sqlserver://'+sqlserver+':1433;database='+
		            sqldb+';username='+sqlusr+';password='+sqlpw+'" --table '+sqltable+
		            ' --as-parquetfile --hive-import -m 16 --hive-database '+hivedb  + ' --hive-table ' + sqltable
		            +'_stg --compression-codec org.apache.hadoop.io.compress.SnappyCodec -- --schema '+sqlschema+' --direct',shell=True)

	make_dt_table(sqltable, hivedb)

def delete_hdfs_files(hivedb, t):
	"""deletes all files in hdfs folder

	Args:
		hivedb_dest: hive database to drop table
		t: table to drop

	Returns:
	    None
	"""
	t = t.lower()
	subprocess.call('sudo -u hdfs hadoop fs -rm -r /user/hive/warehouse/'+hivedb+'.db/'+t+'/*',shell=True)

# def refresh_impala_metadata():
# 	"""Refreshes Impalas Metadata after loading

# 	Args:

# 	Returns:
# 	    None
# 	"""

# 	subprocess.call("impala-shell -i 172.16.100.230 -q 'invalidate metadata'",shell=True)


def full_database_sqoop(sqlserver, sqldb, sqlconfig, config,cred_file, hiveserver='localhost', database='default',sqlschema='dbo',omitlist=[]):
	"""truncates and loads full database in sql server into hive

	Args:
	    sqlserver: sqlserver ip address
	    sqldb: sql server database
	    sqlconfig: config for sqlserver auth
	    server: sql server host name
	    config: which configuration name to pull hive username and password credentials
	    cred_file: location of db login config file
	    hiveserver: location of hive server
	    database: hive database to load table to

	Returns:
	    None
	"""

	global username
	global password
	global datanode

	with open(cred_file,'rb') as cred:
		db_info = json.loads(cred.read())
	username = db_info[config]['username']
	password = db_info[config]['password']
	datanode = db_info[config]['datanode']
	sqlusername = db_info[sqlconfig]['username']
	sqlpw = db_info[sqlconfig]['password']
	sqlconnection = pyodbc.connect('DRIVER={FreeTDS};SERVER='+sqlserver.encode('utf-8')+';PORT=1433;DATABASE='+sqldb.encode('utf-8')+';UID='+sqlusername.encode('utf-8')+';PWD='+sqlpw.encode('utf-8'))
	connection = hive_connect('default', username, password, hiveserver)
	sqlcursor = sqlconnection.cursor()
	cursor = connection.cursor()
	sqlcursor.execute("SELECT t.name , COALESCE(CASE when MIN(k.COLUMN_NAME) <> max(k.COLUMN_NAME) THEN '0' ELSE MAX(k.COLUMN_NAME) END, '0') AS pk, COALESCE(CASE when MIN(SCHEMA_NAME(t.SCHEMA_ID)) <> max(SCHEMA_NAME(t.SCHEMA_ID)) THEN '0' ELSE MAX(SCHEMA_NAME(t.SCHEMA_ID)) END, 'dbo') AS sn , COALESCE(CASE WHEN MIN(c.DATA_TYPE) <>  MAX(c.DATA_TYPE) THEN '0' ELSE MAX(c.DATA_TYPE) END, '0') AS dt FROM sys.tables t LEFT JOIN INFORMATION_SCHEMA.KEY_COLUMN_USAGE k ON t.name = k.table_name LEFT JOIN INFORMATION_SCHEMA.COLUMNS c ON t.name = c.TABLE_NAME AND c.COLUMN_NAME = k.COLUMN_NAME GROUP BY t.name")
	cursor.execute('create database if not exists '+database)
	tablelist = sqlcursor.fetchall()
	for table in tablelist:
		if table[0] in omitlist:
			continue
		elif table[1] == '0' or table[3] not in ['int','bigint']:
			truncate_and_load(cursor,table[0],database,table[0],sqldb,sqlserver,sqlusername,sqlpw,table[2])
		else:
			truncate_and_load_pk(cursor,table[0],database,table[0],sqldb,sqlserver,sqlusername,sqlpw,table[2])
	# run_impala_cmd(username, password, 'invalidate metadata',datanode)

def full_mysql_db_sqoop(mysqlserver, mysqldb, mysqlconfig, config,cred_file, hiveserver='localhost', database='default',port='3306'):
	"""truncates and loads full database in mysql into hive

	Args:
	    mysqlserver: mysqlserver ip address
	    mysqldb: mysql database
	    mysqlconfig: config for mysql auth
	    config: which configuration name to pull hive username and password credentials
	    cred_file: location of db login config file
	    hiveserver: location of hive server
	    database: hive database to load table to

	Returns:
	    None
	"""

	global username
	global password
	global datanode

	with open(cred_file,'rb') as cred:
		db_info = json.loads(cred.read())

	username = db_info[config]['username']
	password = db_info[config]['password']
	datanode = db_info[config]['datanode']
	mysqlusername = db_info[mysqlconfig]['username']
	mysqlpw = db_info[mysqlconfig]['password']
	mysqlconnection = MySQLdb.connect(
    host=mysqlserver,
    port=int(port),
    user=mysqlusername,
    passwd=mysqlpw,
    use_unicode=True,
    charset='utf8')
	connection = hive_connect('default', username, password, hiveserver)
	mysqlcursor = mysqlconnection.cursor()
	cursor = connection.cursor()
	mysqlcursor.execute("SHOW TABLES IN "+mysqldb)
	cursor.execute('create database if not exists '+database)
	tablelist = mysqlcursor.fetchall()
	for table in tablelist:
		mysql_truncate_and_load(cursor,table[0],database,table[0],mysqldb,mysqlserver,mysqlusername,mysqlpw,port=port)

	# run_impala_cmd(username, password, 'invalidate metadata', datanode)
