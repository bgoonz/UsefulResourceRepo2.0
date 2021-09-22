CREATE TABLE wrox_admin_perms (
  admin_perm_id int(10) NOT NULL auto_increment,
  admin_app_id int(10) NOT NULL default '0',
  admin_user_id int(10) NOT NULL default '0',
  admin_perm int(1) NOT NULL default '1',
  PRIMARY KEY  (admin_perm_id)
) TYPE=MyISAM;