CREATE TABLE wrox_forums_prefs (
  forum_pref_id int(10) NOT NULL auto_increment,
  account_id int(10) NOT NULL default '0',
  forum_topic_id int(10) NOT NULL default '0',
  PRIMARY KEY  (forum_pref_id)
) TYPE=MyISAM;