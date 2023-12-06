#include <iostream>
#include <stdio.h>

int main()
{
    int x, y;

    printf("x = ");
    scanf_s("%d", &x);
    printf("y = ");
    scanf_s("%d", &y);

    if (x > y) {
        printf("x is greater than y");
    }
    else {
        printf("y is greater than x");
    }

    return 0;
}