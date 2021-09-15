# Subroutines

## python addprog.py

```python
    def add(a, b):     #     add:
        return a + b   #        ADD R0, R1
                       #        RET


    x = 10 # SAVE R0
    y = 20 # SAVE R1
    z = add(x, y) # CALL @add # SAV R3, 30

```
O/S (fork) <--- SP
---------
python <--- SP
---------
<!-- --------
padding
@add
x = 10
y = 20
z = 30
padding
-------- -->
<!-- --------
padding
a = 10
b = 20
padding
------- -->


```C

    int add(int a, int b) {
        return a + b;
    }

    int main() {
        int x = 10;
        int y = 20;
        int z = add(x, y);
    }

```
