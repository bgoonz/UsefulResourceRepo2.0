CREATE TABLE wrox_account_addr (
  account_addr_id int(10) NOT NULL auto_increment,
  account_id int(10) NOT NULL default '0',
  account_addr_name varchar(100) NULL default NULL,
  account_addr_company varchar(100) NULL default NULL,
  account_addr_street varchar(100) NOT NULL default '',
  account_addr_street_ext varchar(100) NULL default NULL,
  account_addr_city varchar(100) NOT NULL default '',
  account_addr_state varchar(100) NOT NULL default '',
  account_addr_country varchar(100) NOT NULL default '',
  account_addr_postal varchar(15) NOT NULL default '',
  account_addr_phone varchar(20) NULL default NULL,
  deleted int(1) default '0',
  deleted_dt datetime default NULL,
  created_dt datetime NOT NULL default '0000-00-00 00:00:00',
  modified_dt datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (account_addr_id), 
  KEY account_id_ref (account_id)
) TYPE=MyISAM;