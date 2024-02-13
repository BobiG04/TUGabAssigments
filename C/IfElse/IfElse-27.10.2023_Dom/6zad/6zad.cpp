// Да се напише програма, която въвежда стойности за три числа(х, у и z) и извежда на екрана стойността 
// на най - голямото от тях.

#include <iostream>
#include <stdio.h>

int main()
{
    int x, y, z;

    scanf_s("%d", &x);
    scanf_s("%d", &y);
    scanf_s("%d", &z);

    if (x > y && x > z) {
        printf("%d", x);
    }
    else if (y > x && y > z) {
        printf("%d", y);
    }
    else {
        printf("%d", z);
    }

    return 0;
}