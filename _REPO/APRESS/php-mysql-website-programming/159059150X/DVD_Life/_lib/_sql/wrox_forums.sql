CREATE TABLE wrox_forums (
  forum_id int(10) NOT NULL auto_increment,
  account_id int(10) NOT NULL default '0',
  forum_topic text NOT NULL,
  forum_reply_cnt int(10) NOT NULL default '0',
  deleted int(1) NOT NULL default '0',
  deleted_dt datetime default NULL,
  created_dt datetime NOT NULL default '0000-00-00 00:00:00',
  modified_dt datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (forum_id)
) TYPE=MyISAM;