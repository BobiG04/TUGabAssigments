#include <iostream>
#include <stdio.h>

int main()
{
    float a, b, c, d, y;

    scanf_s("%f", &a);
    scanf_s("%f", &b);
    scanf_s("%f", &c);
    scanf_s("%f", &d);

    y = a + (b / (c + 2 * d)) - ((a + b) / (a * c)) + d;

    printf("The result is: %f \n", y);

    return 0;
}