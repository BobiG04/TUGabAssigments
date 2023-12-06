#include <iostream>
#include <stdio.h>

int main()
{
    float a, b, y;

    scanf_s("%f", &a);
    scanf_s("%f", &b);

    y = (pow((a + b), 2) - (4 * a * b)) / (sqrt(3 * abs(a)));

    printf("The result is: %f \n", y);

    return 0;
}