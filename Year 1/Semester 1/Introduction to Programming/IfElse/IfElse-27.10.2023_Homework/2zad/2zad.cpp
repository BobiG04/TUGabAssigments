// Напишете програма която да извършва следните операции :
// - да се въведе едно цяло число
// - да се опреди дали е четно или нечетно

#include <iostream>
#include <stdio.h>

int main()
{
    int a;

    scanf_s("%d", &a);

    if (a %= 2) {
        printf("Chisloto e nechetno");
    }
    else {
        printf("Chisloto e chetno");
    }

    return 0;
}