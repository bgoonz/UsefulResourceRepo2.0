select d.id, d.name, e.id, e.first_name, e.last_name, e.salary
from employees as e
join departments as d
  on e.department_id = d.id
order by d.name, e.last_name