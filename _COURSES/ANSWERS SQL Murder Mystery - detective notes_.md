![horizontal line](media/image10.png){width="6.5in"
height="5.555555555555555e-2in"}

**_CLUE 1: A crime has taken place and the detective needs your help.
The detective gave you the crime scene report, but you somehow lost it.
You vaguely remember that the crime was a ​murder​ that occurred
sometime on ​Jan.15, 2018​ and that it took place in ​SQL City​._**

**_Start by retrieving the corresponding crime scene report from the
police department's database._**

_All the clues to this mystery are buried in a huge database, and you
need to use SQL to navigate through this vast network of information.
Your first step to solving the mystery is to retrieve the corresponding
crime scene report from the police department's database. Below you can
see how the database tables are connected._

_Good luck!_

**_\*\* note it might be easier if one member of the team keeps the next
page diagram of how the tables are connected open, and another member
can keep a record of the detective notes._**

![](media/image7.png){width="9.72645997375328in"
height="6.194760498687664in"}

+-----------------------+-----------------------+-----------------------+
| **Clue** | **SQL Command** | **Information** |
+=======================+=======================+=======================+
| 1 | select \* from | ![](media/image15.png |
| | crime_scene_report | ){width="4.4895833333 |
| | where type = | 33333in" |
| | \"murder\" and date = | height="0.5in"} |
| | 20180115 and city = | |
| | "SQL City" | |
+-----------------------+-----------------------+-----------------------+
| 2 | select \* from person | ![](media/image5.png) |
| | where | {width="4.48958333333 |
| | address_street_name | 3333in" |
| | like \"Northwestern | height="0.38888888888 |
| | Dr\" order by | 88889in"} |
| | address_number desc | |
+-----------------------+-----------------------+-----------------------+
| 3 | select \* from person | ![](media/image11.png |
| | where | ){width="4.4895833333 |
| | address_street_name | 33333in" |
| | = \"Franklin Ave\" | height="0.41666666666 |
| | and name like | 66667in"} |
| | \"%Annabel %\" | |
+-----------------------+-----------------------+-----------------------+
| 4 | select rowid, \* from | ![](media/image13.png |
| | interview where | ){width="4.4895833333 |
| | person_id = 14887 | 33333in" |
| | | height="0.59722222222 |
| | | 22222in"} |
+-----------------------+-----------------------+-----------------------+
| 5 | select rowid, \* from | ![](media/image2.png) |
| | interview where | {width="4.48958333333 |
| | person_id = 16371 | 3333in" |
| | | height="0.47222222222 |
| | | 22222in"} |
+-----------------------+-----------------------+-----------------------+
| 6 | select \* from | ![](media/image4.png) |
| | get_fit_now_member | {width="4.48958333333 |
| | where person_id = | 3333in" |
| | 16371 | height="0.43055555555 |
| | | 55556in"} |
+-----------------------+-----------------------+-----------------------+
| 7 | select rowid, \* from | ![](media/image3.png) |
| | facebook_event_chec | {width="4.48958333333 |
| | kin | 3333in" |
| | where person_id = | height="0.54166666666 |
| | 16371 | 66666in"} |
+-----------------------+-----------------------+-----------------------+
| 8 | select rowid, \* from | ![](media/image22.png |
| | facebook_event_chec | ){width="4.4895833333 |
| | kin | 33333in" |
| | where person_id = | height="0.54166666666 |
| | 14887 | 66666in"} |
+-----------------------+-----------------------+-----------------------+
| 9 | select \* from | ![](media/image1.png) |
| | get_fit_now_member | {width="4.48958333333 |
| | where person_id = | 3333in" |
| | 16371 | height="0.44444444444 |
| | | 44444in"} |
+-----------------------+-----------------------+-----------------------+
| 10 | select \* from | ![](media/image25.png |
| | get_fit_now_member | ){width="4.4895833333 |
| | where | 33333in" |
| | membership_status = | height="0.66666666666 |
| | \"gold\" and id like | 66666in"} |
| | \"%48Z%\" | |
+-----------------------+-----------------------+-----------------------+
| 11 | select rowid, \* from | ![](media/image14.png |
| | get_fit_now_check\ | ){width="4.4895833333 |
| | \_in | 33333in" |
| | where check_in_date | height="0.75in"} |
| | = 20180109 and | |
| | membership_id like | |
| | \"48Z%\" | |
+-----------------------+-----------------------+-----------------------+
| 12 | select \* from | ![](media/image12.png |
| | drivers_license | ){width="4.4895833333 |
| | where plate_number | 33333in" |
| | like \"%H42W%\" | height="0.84722222222 |
| | | 22222in"} |
+-----------------------+-----------------------+-----------------------+
| 13 | select \* from person | ![](media/image8.png) |
| | where license_id = | {width="4.48958333333 |
| | 423327 | 3333in" |
| | | height="0.5in"} |
+-----------------------+-----------------------+-----------------------+
| 14 | select \* from person | ![](media/image19.png |
| | where license_id = | ){width="4.4895833333 |
| | 664760 | 33333in" |
| | | height="0.44444444444 |
| | | 44444in"} |
+-----------------------+-----------------------+-----------------------+
| 15 | select rowid, \* from | ![](media/image9.png) |
| | interview where | {width="4.48958333333 |
| | person_id = 67318 | 3333in" |
| | | height="0.56944444444 |
| | | 44444in"} |
+-----------------------+-----------------------+-----------------------+
| 16 | select \* from person | ![](media/image16.png |
| | where license_id = | ){width="4.4895833333 |
| | 183779 | 33333in" |
| | | height="0.45833333333 |
| | | 33333in"} |
+-----------------------+-----------------------+-----------------------+
| 17 | select \* from person | ![](media/image23.png |
| | where | ){width="4.4895833333 |
| | address_street_name | 33333in" |
| | = \"Fisk Rd\" | height="0.70833333333 |
| | | 33334in"} |
+-----------------------+-----------------------+-----------------------+
| 18 | select rowid, \* from | ![](media/image17.png |
| | facebook_event_chec | ){width="4.4895833333 |
| | kin | 33333in" |
| | where event_name = | height="5.97222222222 |
| | \"SQL Symphony | 2222in"} |
| | Concert\" and date | |
| | like \"201712%\" | |
| | order by person_id | |
+-----------------------+-----------------------+-----------------------+
| 19 | INSERT INTO solution | ![](media/image20.png |
| | VALUES (1, \'Jeremy | ){width="4.4895833333 |
| | Bowers\'); | 33333in" |
| | | height="0.80555555555 |
| | SELECT value FROM | 55556in"} |
| | solution; | |
+-----------------------+-----------------------+-----------------------+
| **EXTENSION TASK** | | |
+-----------------------+-----------------------+-----------------------+
| **1** | select \* from | ![](media/image21.png |
| | drivers_license | ){width="4.4895833333 |
| | where hair_color = | 33333in" |
| | \'red\' and gender = | height="0.75in"} |
| | \'female\' and | |
| | car_make = \'Tesla\' | |
+-----------------------+-----------------------+-----------------------+
| **2** | select \* from person | ![](media/image18.png |
| | where license_id = | ){width="4.4895833333 |
| | 202298 or license_id | 33333in" |
| | = 291182 or | height="0.75in"} |
| | license_id = 918773 | |
+-----------------------+-----------------------+-----------------------+
| **3** | select rowid, \* from | ![](media/image24.png |
| | facebook_event_chec | ){width="4.4895833333 |
| | kin | 33333in" |
| | where event_name = | height="1.20833333333 |
| | \'SQL Symphony | 33333in"} |
| | Concert\' and | |
| | person_id = 99716 or | |
| | person_id = 90700 or | |
| | person_id = 78881 | |
+-----------------------+-----------------------+-----------------------+
| **4** | INSERT INTO solution | ![](media/image6.png) |
| | VALUES (1, \'Miranda | {width="4.48958333333 |
| | Priestly\'); | 3333in" |
| | | height="0.45833333333 |
| | SELECT value FROM | 33333in"} |
| | solution; | |
+-----------------------+-----------------------+-----------------------+
