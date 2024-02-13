#include <iostream>
#include <stdio.h>

int main()
{
    float a, b, c, p, S;

    scanf_s("%f", &a);
    scanf_s("%f", &b);
    scanf_s("%f", &c);

    p = (a + b + c) / 2;
    S = sqrt(p * (p - a) * (p - b) * (p - c));

    printf("S is: %f \n", S);

    return 0;
}