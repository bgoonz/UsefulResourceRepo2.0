**[SQL Island ]{.underline}**

_Your challenge is to escape SQL Island using your knowledge of SQL
commands to get off the island. You **cannot save** your progress, so
ensure that you **take note of all** your commands for each task. _

_Good luck!_

+-----------------------------------+-----------------------------------+
| **Task** | **SQL Commands ** |
+===================================+===================================+
| **1** | SELECT \* FROM INHABITANT |
+-----------------------------------+-----------------------------------+
| **2** | SELECT \* FROM inhabitant WHERE |
| | state = \'friendly\' |
+-----------------------------------+-----------------------------------+
| **3** | SELECT \* FROM inhabitant WHERE |
| | state = \'friendly\' |
| | |
| | AND job = \'weaponsmith\' |
+-----------------------------------+-----------------------------------+
| **4** | SELECT \* FROM inhabitant WHERE |
| | state = \'friendly\' |
| | |
| | AND job LIKE \'%smith\' |
+-----------------------------------+-----------------------------------+
| **5** | SELECT personid FROM inhabitant |
| | where name = \'Stranger\' |
+-----------------------------------+-----------------------------------+
| **6** | SELECT gold FROM inhabitant where |
| | personid = 20 |
+-----------------------------------+-----------------------------------+
| **7** | SELECT \* FROM item where owner |
| | is null |
+-----------------------------------+-----------------------------------+
| **8** | UPDATE item SET owner = 20 WHERE |
| | owner is null |
+-----------------------------------+-----------------------------------+
| **9** | SELECT \* FROM ITEM WHERE OWNER = |
| | 20 |
+-----------------------------------+-----------------------------------+
| **10** | SELECT \* FROM INHABITANT WHERE |
| | JOB = \'dealer\' AND state = |
| | \'friendly\' OR JOB = |
| | \'merchant\' AND state = |
| | \'friendly\' |
+-----------------------------------+-----------------------------------+
| **11** | UPDATE item SET owner = 15 WHERE |
| | item = \'teapot\' OR item = |
| | \'ring\' |
+-----------------------------------+-----------------------------------+
| **12** | UPDATE INHABITANT SET name = |
| | \'Toni\' WHERE personid = 20 |
+-----------------------------------+-----------------------------------+
| **13** | SELECT \* FROM INHABITANT WHERE |
| | JOB = \'baker\' order by gold |
| | desc |
+-----------------------------------+-----------------------------------+
| **14** | SELECT \* FROM INHABITANT WHERE |
| | JOB = \'pilot\' |
+-----------------------------------+-----------------------------------+

**Task** **SQL Commands **

---

**15** SELECT inhabitant.name FROM village, inhabitant WHERE village.chief = inhabitant.personid AND village.name = \'Onionville\'
**16** SELECT COUNT(\*) FROM inhabitant, village WHERE village.villageid = inhabitant.villageid AND inhabitant.gender = \'f\' AND village.name = \'Onionville\'

**17** SELECT inhabitant.name FROM inhabitant, village WHERE village.villageid = inhabitant.villageid AND inhabitant.gender = \'f\' AND village.name = \'Onionville\'
**18** SELECT SUM(inhabitant.gold) FROM inhabitant, village WHERE village.villageid = inhabitant.villageid AND (inhabitant.job = \'baker\' OR inhabitant.job = \'dealer\' OR inhabitant.job = \'merchant\')

**19** SELECT state, AVG(inhabitant.gold) FROM inhabitant GROUP BY state ORDER BY AVG(inhabitant.gold)

**20** DELETE FROM inhabitant WHERE name = \'Dirty Diane\'
**21** UPDATE INHABITANT SET state = \'friendly\' WHERE job = \'pilot\'

_If you get this far congratulations on your certificate. Share this
with your teacher._
