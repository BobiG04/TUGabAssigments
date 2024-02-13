#include <iostream>
#include <stdio.h>

int main()
{
    float a, b, y;

    scanf_s("%f", &a);
    scanf_s("%f", &b);

    y = sqrt(a + b) - sqrt(a - b);

    printf("The result is: %f \n", y);

    return 0;
}