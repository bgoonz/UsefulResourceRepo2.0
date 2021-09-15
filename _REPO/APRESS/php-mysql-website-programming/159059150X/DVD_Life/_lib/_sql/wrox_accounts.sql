CREATE TABLE wrox_accounts (
  account_id int(10) NOT NULL auto_increment,
  account_pass varchar(32) NOT NULL default '',
  account_remind varchar(100) NOT NULL default '',
  account_email varchar(100) NOT NULL default '',
  account_screenname varchar(100) NOT NULL default '',
  last_login_ip varchar(15) default NULL,
  last_login_host varchar(100) default NULL,
  last_login_dt datetime default NULL,
  status int(1) NOT NULL default '1',
  deleted int(1) default '0',
  deleted_dt datetime default NULL,
  created_dt datetime NOT NULL default '0000-00-00 00:00:00',
  modified_dt datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (account_id),
  KEY account_email_ref (account_email),
  KEY account_pass_ref (account_pass),
  KEY account_screenname_ref (account_screenname)
) TYPE=MyISAM;