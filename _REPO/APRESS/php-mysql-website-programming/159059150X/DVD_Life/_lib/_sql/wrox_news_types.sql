CREATE TABLE wrox_news_types (
  news_type_id int(2) NOT NULL auto_increment,
  news_type varchar(50) NOT NULL default '',
  PRIMARY KEY  (news_type_id)
) TYPE=MyISAM;

INSERT INTO wrox_news_types(news_type)values('New Release');
INSERT INTO wrox_news_types(news_type)values('Product Release');
INSERT INTO wrox_news_types(news_type)values('General News');
INSERT INTO wrox_news_types(news_type)values('DVD Reports');
