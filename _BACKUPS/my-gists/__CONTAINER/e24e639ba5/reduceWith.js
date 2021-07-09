

const reduceWhich = ( arr, comparator = ( a, b ) => a - b ) =>
  arr.reduce( ( a, b ) => ( comparator( a, b ) >= 0 ? b : a ) );

//--------------------------------


reduceWhich( [ 1, 3, 2 ] ); // 1
reduceWhich( [ 1, 3, 2 ], ( a, b ) => b - a ); // 3
reduceWhich(
  [ {
      name: 'Tom',
      age: 12
    },
    {
      name: 'Jack',
      age: 18
    },
    {
      name: 'Lucy',
      age: 9
    }
  ],
  ( a, b ) => a.age - b.age
); // {name: 'Lucy', age: 9}

//--------------------------------