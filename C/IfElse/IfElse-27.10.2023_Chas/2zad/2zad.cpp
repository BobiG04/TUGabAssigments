#include <iostream>
#include <stdio.h>

int main()
{
    int a, b, c;

    printf("a = ");
    scanf_s("%d", &a);
    printf("b = ");
    scanf_s("%d", &b);
    printf("c = ");
    scanf_s("%d", &c);

    if (a == b && b == c) {
        printf("triugulnika e ravnostranen");
    }
    else if (b != c && a != c && a != b) {
        printf("triugulnika e raznostranen");
    }
    else {
        printf("triugulnika e ravnobedren");
    }

    return 0;
}
