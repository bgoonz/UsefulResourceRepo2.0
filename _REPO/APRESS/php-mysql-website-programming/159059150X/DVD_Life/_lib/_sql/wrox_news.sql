CREATE TABLE wrox_news (
  news_id int(10) NOT NULL auto_increment,
  news_type_id int(2) NOT NULL default '0',
  news_title varchar(255) NOT NULL default '',
  news_article text NOT NULL,
  news_release_dt date NOT NULL default '0000-00-00',
  news_expire_dt date NULL default NULL,
  status int(1) NOT NULL default '1',
  deleted int(1) NOT NULL default '0',
  deleted_dt datetime NULL default NULL,
  created_dt datetime NOT NULL default '0000-00-00 00:00:00',
  modified_dt datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (news_id), 
  KEY news_type_rel (news_type_id)
) TYPE=MyISAM;
