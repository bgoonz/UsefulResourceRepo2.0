CREATE TABLE wrox_ads (
  ad_id int(10) NOT NULL auto_increment,
  ad_client_id int(10) NOT NULL default '0',
  ad_title varchar(200) NOT NULL default '',
  ad_url varchar(255) NOT NULL default '',
  ad_path varchar(255) NOT NULL default '',
  status int(1) NOT NULL default '1',
  deleted int(1) NOT NULL default '0',
  deleted_dt datetime default NULL,
  created_dt datetime NOT NULL default '0000-00-00 00:00:00',
  modified_dt datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (ad_id)
) TYPE=MyISAM;
