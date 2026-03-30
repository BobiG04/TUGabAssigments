#include <iostream>
#include <stdio.h>

int main()
{
    float x, A, B;

    scanf_s("%f", &x);

    A = sqrt(x) + 3 * pow(x, 3);

    B = abs((2 + x) * 3) / (pow(x, 4) - 2);

    printf("A is: %f \n", A);
    printf("B is: %f \n", B);

    return 0;
}