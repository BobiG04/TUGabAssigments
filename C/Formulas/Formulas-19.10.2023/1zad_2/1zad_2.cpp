#include <iostream>
#include <stdio.h>

int main()
{
    float a, b, y;

    scanf_s("%f", &a);
    scanf_s("%f", &b);

    y = (2 * a + pow(b, 3)) / sqrt(8);

    printf("The result is: %f \n", y);

    return 0;
}