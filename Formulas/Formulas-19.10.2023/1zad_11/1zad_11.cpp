#include <iostream>
#include <stdio.h>

int main()
{
    float a, b, x, y;

    scanf_s("%f", &a);
    scanf_s("%f", &b);
    scanf_s("%f", &x);

    y = (a + b) / (x - 2 * y);
    /* Връща грешка, тъй като не може да се използва недекларирана променлива.*/

    printf("The result is: %f \n", y);

    return 0;
}