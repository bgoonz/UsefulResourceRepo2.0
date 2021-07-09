# phpMyAdmin MySQL-Dump
# version 2.2.6
# http://phpwizard.net/phpMyAdmin/
# http://www.phpmyadmin.net/ (download page)
#
# Host: localhost
# Generation Time: Aug 28, 2002 at 11:19 AM
# Server version: 3.23.51
# PHP Version: 4.0.4
# Database : `tunein`
# --------------------------------------------------------

#
# Table structure for table `artists`
#

DROP TABLE IF EXISTS `artists`;
CREATE TABLE `artists` (
  `artist_id` int(4) NOT NULL auto_increment,
  `artist_name` varchar(100) NOT NULL default '',
  PRIMARY KEY  (`artist_id`),
  UNIQUE KEY `artist_name` (`artist_name`)
) TYPE=InnoDB COMMENT='Musical performer or group.';
# --------------------------------------------------------

#
# Table structure for table `artists_events`
#

DROP TABLE IF EXISTS `artists_events`;
CREATE TABLE `artists_events` (
  `artist_event_id` int(4) NOT NULL auto_increment,
  `artist_id` int(4) NOT NULL default '0',
  `event_id` int(4) NOT NULL default '0',
  PRIMARY KEY  (`artist_event_id`),
  KEY `artist_id` (`artist_id`),
  KEY `event_id` (`event_id`),
  FOREIGN KEY (`artist_id`) REFERENCES `tunein.artists` (`artist_id`),
  FOREIGN KEY (`event_id`) REFERENCES `tunein.events` (`event_id`)
) TYPE=InnoDB COMMENT='Lookup table for artists and events where they perform.';
# --------------------------------------------------------

#
# Table structure for table `carts`
#

DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `cart_id` int(11) NOT NULL auto_increment,
  `session_id` varchar(50) NOT NULL default '',
  `item_type_id` int(11) NOT NULL default '0',
  `product_code_or_event_id` int(11) NOT NULL default '0',
  `quantity` int(2) NOT NULL default '0',
  PRIMARY KEY  (`cart_id`),
  KEY `item_type_id` (`item_type_id`),
  FOREIGN KEY (`item_type_id`) REFERENCES `tunein.item_types` (`item_type_id`)
) TYPE=InnoDB COMMENT='Stores items in carts.';
# --------------------------------------------------------

#
# Table structure for table `customers`
#

DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers` (
  `customer_id` int(4) NOT NULL auto_increment,
  `customer_session_id` varchar(60) NOT NULL default '',
  `customer_email` varchar(75) NOT NULL default '',
  `customer_first_name` varchar(50) NOT NULL default '',
  `customer_last_name` varchar(50) NOT NULL default '',
  `customer_street_1` varchar(150) NOT NULL default '',
  `customer_street_2` varchar(150) default NULL,
  `customer_city` varchar(50) NOT NULL default '',
  `state_id` int(4) NOT NULL default '0',
  `customer_zip` varchar(10) NOT NULL default '',
  `customer_phone` varchar(15) NOT NULL default '',
  PRIMARY KEY  (`customer_id`),
  KEY `state_id` (`state_id`),
  FOREIGN KEY (`state_id`) REFERENCES `tunein.states` (`state_id`)
) TYPE=InnoDB COMMENT='Customers making orders.';
# --------------------------------------------------------

#
# Table structure for table `events`
#

DROP TABLE IF EXISTS `events`;
CREATE TABLE `events` (
  `event_id` int(4) NOT NULL auto_increment,
  `event_name` varchar(150) NOT NULL default '',
  `venue_id` int(4) NOT NULL default '0',
  `event_datetime` datetime NOT NULL default '0000-00-00 00:00:00',
  `event_price` decimal(4,2) NOT NULL default '0.00',
  `event_seats_sold` int(11) NOT NULL default '0',
  PRIMARY KEY  (`event_id`),
  KEY `venue_id` (`venue_id`),
  FOREIGN KEY (`venue_id`) REFERENCES `tunein.venues` (`venue_id`)
) TYPE=InnoDB COMMENT='Musical events (concerts or festivals).';
# --------------------------------------------------------

#
# Table structure for table `formats`
#

DROP TABLE IF EXISTS `formats`;
CREATE TABLE `formats` (
  `format_id` int(4) NOT NULL auto_increment,
  `format_code` varchar(5) NOT NULL default '',
  `format_description` varchar(20) NOT NULL default '',
  PRIMARY KEY  (`format_id`),
  UNIQUE KEY `format_code` (`format_code`),
  UNIQUE KEY `format_description` (`format_description`)
) TYPE=InnoDB COMMENT='Recording formats (CD, cassette, MP3, etc.)';
# --------------------------------------------------------

#
# Table structure for table `genres`
#

DROP TABLE IF EXISTS `genres`;
CREATE TABLE `genres` (
  `genre_id` int(4) NOT NULL default '0',
  `genre_description` varchar(100) NOT NULL default '0',
  PRIMARY KEY  (`genre_id`),
  UNIQUE KEY `genre_description` (`genre_description`)
) TYPE=InnoDB COMMENT='Musical genres (styles)';
# --------------------------------------------------------

#
# Table structure for table `item_types`
#

DROP TABLE IF EXISTS `item_types`;
CREATE TABLE `item_types` (
  `item_type_id` int(4) NOT NULL auto_increment,
  `item_type_description` varchar(20) NOT NULL default '',
  PRIMARY KEY  (`item_type_id`),
  UNIQUE KEY `item_type_description` (`item_type_description`)
) TYPE=InnoDB COMMENT='Type of item (album or ticket).';
# --------------------------------------------------------

#
# Table structure for table `labels`
#

DROP TABLE IF EXISTS `labels`;
CREATE TABLE `labels` (
  `label_id` int(4) NOT NULL auto_increment,
  `label_short_name` varchar(20) NOT NULL default '',
  `label_long_name` varchar(100) NOT NULL default '',
  PRIMARY KEY  (`label_id`),
  UNIQUE KEY `label_short_name` (`label_short_name`),
  UNIQUE KEY `label_long_name` (`label_long_name`)
) TYPE=InnoDB COMMENT='Labels under which recordings are released';
# --------------------------------------------------------

#
# Table structure for table `news`
#

DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `news_id` int(4) NOT NULL auto_increment,
  `genre_id` int(4) default NULL,
  `artist_id` int(4) default NULL,
  `headline` varchar(100) NOT NULL default '',
  `body` mediumtext NOT NULL,
  `start_date` date NOT NULL default '0000-00-00',
  `end_date` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`news_id`),
  KEY `genre_id` (`genre_id`),
  KEY `artist_id` (`artist_id`),
  FOREIGN KEY (`genre_id`) REFERENCES `tunein.genres` (`genre_id`),
  FOREIGN KEY (`artist_id`) REFERENCES `tunein.artists` (`artist_id`)
) TYPE=InnoDB COMMENT='News stories.';
# --------------------------------------------------------

#
# Table structure for table `orders`
#

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL auto_increment,
  `session_id` varchar(50) NOT NULL default '',
  `shipping_type_id` int(11) NOT NULL default '0',
  `order_total` decimal(6,2) NOT NULL default '0.00',
  `order_datetime` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY  (`order_id`),
  KEY `shipping_type_id` (`shipping_type_id`),
  FOREIGN KEY (`shipping_type_id`) REFERENCES `tunein.shipping_types` (`shipping_type_id`)
) TYPE=InnoDB COMMENT='Confirmed invoices.';
# --------------------------------------------------------

#
# Table structure for table `product_codes`
#

DROP TABLE IF EXISTS `product_codes`;
CREATE TABLE `product_codes` (
  `product_code_id` int(4) NOT NULL auto_increment,
  `product_group_id` int(4) NOT NULL default '0',
  `format_id` int(11) NOT NULL default '0',
  `product_code_price` decimal(4,2) NOT NULL default '00.00',
  `product_code_inventory` int(4) NOT NULL default '0',
  PRIMARY KEY  (`product_code_id`),
  KEY `product_group_id` (`product_group_id`),
  KEY `format_id` (`format_id`),
  FOREIGN KEY (`product_group_id`) REFERENCES `tunein.product_groups` (`product_group_id`),
  FOREIGN KEY (`format_id`) REFERENCES `tunein.formats` (`format_id`)
) TYPE=InnoDB COMMENT='Each record is an inventory item.';
# --------------------------------------------------------

#
# Table structure for table `product_groups`
#

DROP TABLE IF EXISTS `product_groups`;
CREATE TABLE `product_groups` (
  `product_group_id` int(4) NOT NULL auto_increment,
  `product_group_title` varchar(200) NOT NULL default '',
  `label_id` int(4) NOT NULL default '0',
  `genre_id` int(4) NOT NULL default '0',
  `product_group_image_name` varchar(100) NOT NULL default '',
  `release_date` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`product_group_id`),
  KEY `label_id` (`label_id`),
  KEY `genre_id` (`genre_id`),
  FOREIGN KEY (`label_id`) REFERENCES `tunein.labels` (`label_id`),
  FOREIGN KEY (`genre_id`) REFERENCES `tunein.genres` (`genre_id`)
) TYPE=InnoDB COMMENT='Identifies a specific product (a CD, a concert ticket, etc.)';
# --------------------------------------------------------

#
# Table structure for table `seating_types`
#

DROP TABLE IF EXISTS `seating_types`;
CREATE TABLE `seating_types` (
  `seating_type_id` int(4) NOT NULL auto_increment,
  `seating_type_description` varchar(50) NOT NULL default '',
  PRIMARY KEY  (`seating_type_id`),
  UNIQUE KEY `seating_type_description` (`seating_type_description`)
) TYPE=InnoDB COMMENT='Types of seating (reserved, GA, etc.)';
# --------------------------------------------------------

#
# Table structure for table `shipping_types`
#

DROP TABLE IF EXISTS `shipping_types`;
CREATE TABLE `shipping_types` (
  `shipping_type_id` int(11) NOT NULL auto_increment,
  `shipping_type_description` varchar(75) NOT NULL default '',
  `shipping_per_cd_cass` decimal(4,2) NOT NULL default '0.00',
  `shipping_per_lp` decimal(4,2) NOT NULL default '0.00',
  `shipping_per_ticket` decimal(4,2) NOT NULL default '0.00',
  PRIMARY KEY  (`shipping_type_id`)
) TYPE=InnoDB COMMENT='Shipping types and charges.';
# --------------------------------------------------------

#
# Table structure for table `songs`
#

DROP TABLE IF EXISTS `songs`;
CREATE TABLE `songs` (
  `song_id` int(4) NOT NULL auto_increment,
  `song_title` varchar(150) NOT NULL default '',
  PRIMARY KEY  (`song_id`)
) TYPE=InnoDB COMMENT='Individual songs.';
# --------------------------------------------------------

#
# Table structure for table `specials`
#

DROP TABLE IF EXISTS `specials`;
CREATE TABLE `specials` (
  `special_id` int(11) NOT NULL auto_increment,
  `item_type_id` int(11) NOT NULL default '0',
  `product_group_or_event_id` int(11) NOT NULL default '0',
  `special_percentage` tinyint(2) NOT NULL default '0',
  `short_description` varchar(100) NOT NULL default '',
  `long_description` text NOT NULL,
  `start_date` date NOT NULL default '0000-00-00',
  `end_date` date NOT NULL default '0000-00-00',
  PRIMARY KEY  (`special_id`),
  KEY `item_type_id` (`item_type_id`),
  FOREIGN KEY (`item_type_id`) REFERENCES `tunein.item_types` (`item_type_id`)
) TYPE=InnoDB COMMENT='Special offers';
# --------------------------------------------------------

#
# Table structure for table `states`
#

DROP TABLE IF EXISTS `states`;
CREATE TABLE `states` (
  `state_id` int(2) NOT NULL auto_increment,
  `state_code` char(2) NOT NULL default '',
  `state_name` varchar(50) NOT NULL default '',
  PRIMARY KEY  (`state_id`),
  UNIQUE KEY `state_name` (`state_name`),
  UNIQUE KEY `state_code` (`state_code`)
) TYPE=InnoDB COMMENT='States and provinces.';
# --------------------------------------------------------

#
# Table structure for table `tracks`
#

DROP TABLE IF EXISTS `tracks`;
CREATE TABLE `tracks` (
  `track_id` int(4) NOT NULL auto_increment,
  `song_id` int(4) NOT NULL default '0',
  `artist_id` int(4) NOT NULL default '0',
  `product_group_id` int(4) NOT NULL default '0',
  `track_number` int(11) NOT NULL default '0',
  PRIMARY KEY  (`track_id`),
  KEY `song_id` (`song_id`),
  KEY `artist_id` (`artist_id`),
  KEY `product_group_id` (`product_group_id`),
  FOREIGN KEY (`song_id`) REFERENCES `tunein.songs` (`song_id`),
  FOREIGN KEY (`artist_id`) REFERENCES `tunein.artists` (`artist_id`),
  FOREIGN KEY (`product_group_id`) REFERENCES `tunein.product_groups` (`product_group_id`)
) TYPE=InnoDB COMMENT='A specific recording of a song.';
# --------------------------------------------------------

#
# Table structure for table `venues`
#

DROP TABLE IF EXISTS `venues`;
CREATE TABLE `venues` (
  `venue_id` int(4) NOT NULL auto_increment,
  `venue_name` varchar(100) NOT NULL default '',
  `capacity` int(5) NOT NULL default '0',
  `seating_type_id` int(4) NOT NULL default '0',
  `venue_street_1` varchar(150) NOT NULL default '',
  `venue_street_2` varchar(150) default NULL,
  `venue_city` varchar(50) NOT NULL default '',
  `state_id` int(4) NOT NULL default '0',
  `venue_zip` varchar(10) NOT NULL default '',
  PRIMARY KEY  (`venue_id`),
  UNIQUE KEY `venue_name` (`venue_name`),
  KEY `state_id` (`state_id`),
  KEY `seating_type_id` (`seating_type_id`),
  FOREIGN KEY (`state_id`) REFERENCES `tunein.states` (`state_id`),
  FOREIGN KEY (`seating_type_id`) REFERENCES `tunein.seating_types` (`seating_type_id`)
) TYPE=InnoDB COMMENT='Identifies venues at which event are held.';

