char c = 'A'; // size 1 byte [0101 0101]
short s = 123; // size 2 bytes [0101 0101 0101 0101]
int i = 128; // size 4 bytes [0101 0101 0101 0101 0101 0101 0101 0101]
long int l = 23; // size 8 bytes [0101 0101 0101 0101 0101 0101 0101 0101 0101 0101 0101 0101 0101 0101 0101 0101]
int x = 120002020;


int add(int a, int b)
{
    return a + b;
}

float add(float a, float b) {
    return a + b;
}

int main() {

    int x = add(34.0f, 34.0f);
    return 0;
}