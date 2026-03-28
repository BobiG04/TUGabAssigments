using System;

namespace SqrtUravn
{
	internal class Program
	{
		static void Main(string[] args)
		{

			int a, b, c;

			a = int.Parse(Console.ReadLine());
			b = int.Parse(Console.ReadLine());
			c = int.Parse(Console.ReadLine());

			SquareEquation(a,b,c);

		}

		static void SquareEquation(int a, int b, int c)
		{

			double D;
			double x1, x2;

			D = Math.Pow(b, 2) - 4 * a * c;

			x1 = (-b + Math.Sqrt(D)) / (2 * a);
			x2 = (-b - Math.Sqrt(D)) / (2 * a);

            Console.WriteLine("x1 = " + x1);
            Console.WriteLine("x2 = " + x2);

        }
	}
}
