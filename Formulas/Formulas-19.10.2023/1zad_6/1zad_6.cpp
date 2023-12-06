#include <iostream>
#include <stdio.h>

int main()
{
    float x, y;

    scanf_s("%f", &x);

    y = ((5 - pow(x, 5)) / 3) - x + 1;

    printf("The result is: %f \n", y);

    return 0;
}