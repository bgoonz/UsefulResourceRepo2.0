CREATE TABLE wrox_polls (
  poll_id int(10) NOT NULL auto_increment,
  poll_vote_cnt int(10) NOT NULL default '0',
  poll_question text NOT NULL,
  status int(1) NOT NULL default '1',
  deleted int(1) NOT NULL default '0',
  deleted_dt datetime NULL default NULL,
  created_dt datetime NOT NULL default '0000-00-00 00:00:00',
  modified_dt datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (poll_id)
) TYPE=MyISAM;
