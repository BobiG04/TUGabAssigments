#include <iostream>
#include <stdio.h>

int main()
{
    int a, b, c, p, S;

    printf("a = ");
    scanf_s("%d", &a);
    printf("b = ");
    scanf_s("%d", &b);
    printf("c = ");
    scanf_s("%d", &c);

    if (a + b > c && b + c > a && a + c > b) {

        if (a == b && b == c) {
            printf("\nTriugulnika e ravnostranen.\n\n");
        }
        else if (b != c && a != c && a != b) {
            printf("\nTriugulnika e raznostranen.\n\n");
        }
        else {
            printf("\nTriugulnika e ravnobedren.\n\n");
        }

        p = (a + b + c) / 2;

        S = sqrt(p * (p - a) * (p - b) * (p - c));

        printf("p = %d\n", p);
        printf("S = %d\n", S);

    }

    return 0;
}
