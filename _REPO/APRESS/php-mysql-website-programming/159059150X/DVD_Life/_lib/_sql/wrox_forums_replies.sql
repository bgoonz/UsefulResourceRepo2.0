CREATE TABLE wrox_forums_replies (
  forum_reply_id int(10) NOT NULL auto_increment,
  forum_topic_id int(10) NOT NULL default '0',
  account_id int(10) NOT NULL default '0',
  forum_reply text NOT NULL,
  deleted int(1) NOT NULL default '0',
  deleted_dt datetime default NULL,
  created_dt datetime NOT NULL default '0000-00-00 00:00:00',
  modified_dt datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (forum_reply_id)
) TYPE=MyISAM;
