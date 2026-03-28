#include <iostream>
#include <stdio.h>

int main()
{
    int y, x;

    printf("x = ");
    scanf_s("%d", &x);

    if (x <= 0) {
        y = 2;
        printf("y = %d", y);
    }
    else if (x > 0 && x < 1) {
        y = x + 2;
        printf("y = %d", y);
    }
    else if (x >= 1 && x <= 2) {
        y = 3;
        printf("y = %d", y);
    }
    else if (x > 2 && x < 3) {
        y = 5 - x;
        printf("y = %d", y);
    }
    else if (x >= 3) {
        y = 2;
        printf("y = %d", y);
    }

    return 0;
}