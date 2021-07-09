CREATE TABLE wrox_news_comments (
  news_comment_id int(10) NOT NULL auto_increment,
  news_id int(10) NOT NULL default '0',
  account_id int(10) NOT NULL default '0',
  news_comment text NOT NULL,
  created_dt datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (news_comment_id), 
  KEY news_id_rel (news_id)
) TYPE=MyISAM;
