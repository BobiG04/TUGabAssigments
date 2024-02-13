#include <iostream>
#include <stdio.h>

int main()
{
    float x, y;

    scanf_s("%f", &x);

    y = abs((sqrt(2 + pow(x, 5)) / (pow(x, 4) + 5 * x)));

    printf("The result is: %f \n", y);

    return 0;
}