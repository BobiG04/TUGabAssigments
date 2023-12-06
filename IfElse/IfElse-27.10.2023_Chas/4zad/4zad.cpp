#include <iostream>
#include <stdio.h>

int main()
{
    int a, b, c;
    double D, x1, x2;

    printf("1vi koefitsient: ");
    scanf_s("%d", &a);
    printf("2ri koefitsient: ");
    scanf_s("%d", &b);
    printf("3ti koefitsient: ");
    scanf_s("%d", &c);

    D = b * b - 4 * a * c;

    if (D == 0) {
        x1 = (-b) / (2 * a);
    }
    else if (D < 0) {
        printf("\nNqma realni koreni. \n");
    }
    else {
        x1 = (-b + sqrt(D)) / (2 * a);
        x2 = (-b - sqrt(D)) / (2 * a);

        printf("x1 = %f\n", x1);
        printf("x2 = %f\n", x2);
    }

    return 0;
}