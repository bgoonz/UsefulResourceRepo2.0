CREATE TABLE wrox_admin_apps (
  admin_app_id int(2) NOT NULL auto_increment,
  admin_app_name varchar(50) NOT NULL default '',
  admin_app_path varchar(100) NOT NULL default '',
  PRIMARY KEY  (admin_app_id)
) TYPE=MyISAM;