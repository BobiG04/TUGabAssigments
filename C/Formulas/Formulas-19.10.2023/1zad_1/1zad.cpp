#include <iostream>
#include <stdio.h>

int main()
{
    float a, b, y;

    scanf_s("%f", &a);
    scanf_s("%f", &b);

    y = sqrt(pow(a, 2) + (2 * a * b) + pow(b, 2));

    printf("The result is: %.2f \n", y);

    return 0;
}