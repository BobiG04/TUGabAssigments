#include <iostream>
#include <stdio.h>

int main()
{
    float x, a, y;

    scanf_s("%f", &x);
    scanf_s("%f", &a);

    y = (pow((x + a), 5) + abs(x + 2 * a)) / (5 * a + sqrt(pow(a, 5)));

    printf("The result is: %f \n", y);

    return 0;
}