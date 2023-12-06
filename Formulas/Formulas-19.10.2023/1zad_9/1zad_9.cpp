#include <iostream>
#include <stdio.h>

int main()
{
    float a, b, y;

    scanf_s("%f", &a);
    scanf_s("%f", &b);

    y = 2 + abs(a) + abs(1 - b);

    printf("The result is: %f \n", y);

    return 0;
}