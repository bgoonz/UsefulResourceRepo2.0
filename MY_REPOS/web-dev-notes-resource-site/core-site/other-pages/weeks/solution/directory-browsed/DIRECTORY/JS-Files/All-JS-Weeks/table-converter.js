function table_to_array(table1) {
  myData = document.getElementById(table1);
  console.log("myData: ", myData);

  myDataRowsRows = document.getElementById(table1).rows;
  console.log(myDataRowsRows);
  my_list = [];
  for (let i = 0; i < myDataRowsRows.length; i++) {
    el = myDataRowsRows[i].children;
    my_el = [];
    for (let j = 0; j < el.length; j++) {
      my_el.push(el[j].innerText);
    }
    my_list.push(my_el);
  }
  console.log(my_list);
  return my_list;
}
