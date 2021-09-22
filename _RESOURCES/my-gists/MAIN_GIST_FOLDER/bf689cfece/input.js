if (x) x++, y++;
if (x) x++; else x--;
if (x) x++; else if (y) y++;
while (x) x--;
do x--; while (x);
for (var i = 0; i < 10; i++) x++;
for (x in x) x++;
for (x of y) x++;
switch (x) {
  case 1:
  case 2:
    x++;
    break;
  case 3: {
    x++;
    break;
  }
  default:
    x--;
}