#include <iostream>
#include <stdio.h>

int main()
{
    float x, y;

    scanf_s("%f", &x);

    y = ((5 - pow(x, 3)) / (sqrt(3))) + (2 * x) / (8);

    printf("The result is: %f \n", y);

    return 0;
}