CREATE TABLE wrox_ads_activity (
  ad_activity_id int(10) NOT NULL auto_increment,
  ad_id int(10) NOT NULL default '0',
  ad_view_cnt int(15) NOT NULL default '0',
  ad_click_cnt int(15) NOT NULL default '0',
  ad_activity_month int(2) NOT NULL default '0',
  ad_activity_year int(4) NOT NULL default '0',
  PRIMARY KEY  (ad_activity_id),
  KEY ad_id_rel (ad_id)
) TYPE=MyISAM;
