var obj = {
    a: 1,
    b: 2,
    c: 3
};
obj.a = 4;
obj.b = 5;
obj.c = 6;

with (obj) {
    a = 7;
    b = 8;
    c = 9;
}

//不建议使用