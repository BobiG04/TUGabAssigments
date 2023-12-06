#include <stdio.h>
#include <math.h>

int main() {
    int chickenCount, fishCount, veganCount;
    double chickenPrice, fishPrice, veganPrice;

    scanf_s("%d %d %d %lf %lf %lf", &chickenCount, &fishCount, &veganCount, &chickenPrice, &fishPrice, &veganPrice);

    double total_sum = (chickenCount * chickenPrice + fishCount * fishPrice + veganCount * veganPrice);
    double dessert_price = 0.2 * total_sum;
    double final_total_sum = total_sum + dessert_price + 2.50;

    final_total_sum = round(final_total_sum * 1000.0) / 1000.0;

    printf("%.2lf\n", final_total_sum);

    return 0;
}