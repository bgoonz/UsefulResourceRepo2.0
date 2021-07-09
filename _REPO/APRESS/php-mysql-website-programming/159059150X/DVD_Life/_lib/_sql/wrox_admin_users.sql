CREATE TABLE wrox_admin_users (
  admin_user_id int(10) NOT NULL auto_increment,
  admin_user_name varchar(50) NOT NULL default '',
  admin_user_pass varchar(50) NOT NULL default '',
  admin_user_remind varchar(100) NOT NULL default '',
  admin_user_email varchar(100) NOT NULL default '',
  last_login_ip varchar(15) default NULL,
  last_login_host varchar(100) default NULL,
  last_login_dt datetime default NULL,
  status int(1) NOT NULL default '1',
  deleted int(1) default '0',
  deleted_dt datetime default NULL,
  created_dt datetime NOT NULL default '0000-00-00 00:00:00',
  modified_dt datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (admin_user_id),
  KEY admin_user_name_ref (admin_user_name),
  KEY admin_user_pass_ref (admin_user_pass)
) TYPE=MyISAM;