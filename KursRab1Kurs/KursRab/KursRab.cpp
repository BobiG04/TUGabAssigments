#include <stdio.h>
#include <math.h>

// Деклариране на цял брой трапеци
int brTraps;
// Деклариране на лицето на текущия трапец
double S;
// Декларация на функция за сумиране на лицата на трапеците
double SumTrap(float a, float b, float c, float d, float h, float r);
// Декларация на функции
void EnterBrTraps();
void EnterAndCalSums();
void SortSes();
// Масива с всичките стойности за лицата на трапеците
float Ses[50];
// Самите стойности на текущия трапец в масив
float n[6];

int main()
{

    EnterBrTraps();
    if (brTraps > 50) {
        printf("Ne mojesh da nadvishavash poveche ot 50 trapetsa.\n");
        return 0;
    }
    EnterAndCalSums();
    SortSes();

    return 0;

}

void EnterAndCalSums() {
    // Разглеждаме трапеците, които сме въвели първоначално
    for (int t = 0; t < brTraps; t++)
    {
        // Изписваме страните, височината или радиуса.
        printf("Vuvedi stranite na trapets %d: \n",t);
        for (int i = 0; i < 6; i++)
        {
            // Проверка за текуща променлива, на която задаваме стойност
            switch (i) {
            case 0:printf("a = ");
                scanf_s("%f", &n[0]);
                break;
            case 1:printf("b = ");
                scanf_s("%f", &n[1]);
                break;
            case 2:printf("c = ");
                scanf_s("%f", &n[2]);
                break;
            case 3:printf("d = ");
                scanf_s("%f", &n[3]);
                break;
            case 4:printf("h = ");
                scanf_s("%f", &n[4]);
                break;
            case 5:printf("r = ");
                scanf_s("%f", &n[5]);
                break;
            }
        }
        // Изпълняваме функция за сумиране на лицето
        SumTrap(n[0], n[1], n[2], n[3], n[4], n[5]);
        // Задаваме текущия елемент от масива да е равен на лицето на текущия трапец (Записваме лицето)
        Ses[t] = S;
    }
}

void EnterBrTraps() {
    // Въвеждаме броя на трапеците, които ще пресмятаме
    printf("Broi Trapetsi: ");
    scanf_s("%d", &brTraps);
    printf("\n");
}

double SumTrap(float a, float b, float c, float d, float h, float r) {

    // Формула за лице чрез две страни и височина
    if (a!=0 && b!=0 && c==0 && d==0 && h!=0 && r==0) {
        S = 0.5 * (a + b) * h;
        printf("S = %.2lf\n\n", S);
    }
    // Формула за лице чрез четирите страни на трапеца
    else if (a!=0 && b!=0 && c!=0 && d!=0 && h==0 && r==0) {
        S = (a + c) / (4 * (a - c)) * sqrt((a + b - c + d) * (a - b - c + d) * (a + b - c - d) * (-a + b + c + d));
        printf("S = %.2lf\n\n", S);
    }
    // Формула за лице чрез височината и радиуса на описаната окръжност
    else if (a != 0 && b != 0 && c != 0 && d != 0 && h == 0 && r == 0) {
        S = 8 * pow(r, 2);
        printf("S = %.2lf\n\n", S);
    }
    // Когато нито едно от горепосочените не е изпълнено
    else {
        printf("Ima problem.");
    }

    return 0;
}

void SortSes() {
    // Сортиране на масива с лицата по големината им във възходящ ред
    for (int u = 0; u < brTraps; u++)
    {
        for (int p = u + 1; p < brTraps; p++)
        {
            if (Ses[u] > Ses[p]) {
                float Mid = Ses[u];
                Ses[u] = Ses[p];
                Ses[p] = Mid;
            }
        }
    }

    // Изнасяне на резултата накрая
    for (int i = 0; i < brTraps; i++)
    {
        printf("S na trapets %d e: %.2f\n", i, Ses[i]);
    }
}