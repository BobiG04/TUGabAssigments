#include <iostream>
#include <stdio.h>

int main()
{
	int k, a, b, c, r;
	float S = 0, Pi = 3.14, p;

	printf("Vuvedi stoinost na k: ");
	scanf_s("%d", &k);

	switch (k)
	{
	case 1:/*S na triugulnik*/
		printf("\nVuvedi strana a na triugulnik: ");
		scanf_s("%d", &a);
		printf("Vuvedi strana b na triugulnik: ");
		scanf_s("%d", &b);
		printf("Vuvedi strana c na triugulnik: ");
		scanf_s("%d", &c);
		p = (a + b + c) / 2;
		S = sqrt(p * (p - a) * (p - b) * (p - c));
		printf("\nLitseto na triugulnika e: %f\n", S);
		break;
	case 2:/*S na kvadrat*/
		printf("\nVuvedi strana a na kvadrat: ");
		scanf_s("%d", &a);
		S = a * a;
		printf("\nLitseto na kvadrata e: %f\n", S);
		break;
	case 3:/*S na pravougulnik*/
		printf("\nVuvedi strana a na pravougulnik: ");
		scanf_s("%d", &a);
		printf("Vuvedi strana b na pravougulnik: ");
		scanf_s("%d", &b);
		S = a * b;
		printf("\nLitseto na pravougulnika e: %f\n", S);
		break;
	case 4:/*S na krug*/
		printf("\nVuvedi radius na krug: ");
		scanf_s("%d", &r);
		S = Pi * r * r;
		printf("\nLitseto na kruga e: %f\n", S);
		break;
	default: printf("\nNepravilno vuvedena stoinost na k. \n");
		break;
	}

	return 0;
}