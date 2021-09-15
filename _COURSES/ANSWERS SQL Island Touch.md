**[SQL Island Touch]{.underline}**

_Your challenge is to find out the name of the diamond thief. You
**cannot save** your progress, so ensure that you **take note of all**
your commands for each task. _

_Good luck!_

**Task** **SQL Commands **

---

**1** SELECT \* FROM people
**2** SELECT hair FROM people
**3** SELECT hair, name FROM people
**4** SELECT \* FROM people WHERE gender = 'male'
**5** SELECT \* FROM people WHERE gender = 'male' AND hair = 'red'
**6** SELECT \* FROM people WHERE hair != 'red' OR gender = 'female'
**7** SELECT \* FROM suitcase
**8** SELECT \* FROM person NATURAL JOIN suitcase
**9** SELECT \* FROM person NATURAL JOIN suitcase WHERE gender = 'male' AND weight \> 20
**10** SELECT \* FROM people WHERE gender = 'female' AND hair = 'red'
**11** SELECT weight FROM person NATURAL JOIN suitcase WHERE gender = 'female' AND hair = 'red'
**Thief is** **Katja**
