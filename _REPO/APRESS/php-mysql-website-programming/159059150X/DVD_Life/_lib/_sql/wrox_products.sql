CREATE TABLE wrox_products (
  product_id int(10) NOT NULL auto_increment,
  product_sku varchar(10) NOT NULL default '',
  product_name varchar(200) NOT NULL default '',
  product_desc text NOT NULL,
  product_rating varchar(5) NOT NULL default '',
  product_format varchar(20) NOT NULL default '',
  product_release_dt date default NULL,
  product_img_path varchar(200) NULL,
  product_price float(10) NOT NULL default '0',
  product_quantity int(5) NOT NULL default '0',
  status int(1) NOT NULL default '0',
  deleted int(1) NOT NULL default '0',
  deleted_dt datetime default NULL,
  created_dt datetime NOT NULL default '0000-00-00 00:00:00',
  modified_dt datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (product_id)
) TYPE=MyISAM;
