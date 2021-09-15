CREATE TABLE wrox_ads_clients (
  ad_client_id int(10) NOT NULL auto_increment,
  ad_client_name varchar(100) NOT NULL default '',
  ad_client_contact varchar(100) NOT NULL default '',
  ad_client_email varchar(100) NOT NULL default '',
  ad_client_phone varchar(20) NULL default NULL,
  status int(1) NOT NULL default '1',
  deleted int(1) NOT NULL default '0',
  deleted_dt datetime default NULL,
  created_dt datetime NOT NULL default '0000-00-00 00:00:00',
  modified_dt datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (ad_client_id)
) TYPE=MyISAM;
