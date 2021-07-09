CREATE TABLE wrox_account_prefs (
  account_pref_id int(10) NOT NULL auto_increment,
  account_id int(10) NOT NULL default '0',
  newsletter_recipient int(1) NOT NULL default '1',
  newsletter_format varchar(50) NOT NULL default 'text',
  created_dt datetime NOT NULL default '0000-00-00 00:00:00',
  modified_dt datetime default NULL,
  PRIMARY KEY  (account_pref_id), 
  KEY account_id_ref (account_id)
) TYPE=MyISAM;