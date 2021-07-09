CREATE TABLE wrox_polls_answers (
  poll_answer_id int(10) NOT NULL auto_increment,
  poll_id int(10) NOT NULL default '0',
  poll_answer text NOT NULL,
  poll_answer_cnt int(10) NOT NULL default '0',
  PRIMARY KEY  (poll_answer_id), 
  KEY poll_id_rel (poll_id)
) TYPE=MyISAM;
