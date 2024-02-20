using System;

namespace PrintStars
{
	internal class Program
	{
		static void Main(string[] args)
		{

			int k;

            Console.WriteLine("Choose a figure \n 1 = Rectangle; \n 2 = Square; \n 3 = Triangle;");
            k = int.Parse(Console.ReadLine());

			switch (k)
			{
				case 1: 
					Rect();
					break;
				case 2: 
					Square();
					break;
				case 3:
					Tris();
					break;
				default: Console.WriteLine("ERROR 404");
					break;
			}
		
		}

		static void Rect()
		{
			int n,m;

			Console.WriteLine("Height of the rectangle");
			n = int.Parse(Console.ReadLine());
			Console.WriteLine("Width of the rectangle");
			m = int.Parse(Console.ReadLine());

			for (int i = 0; i < n; i++)
			{
                for (int j = 0; j < m; j++)
                {
                    Console.Write("*");
                }
				Console.WriteLine();
			}
		}

		static void Square()
		{
			int n;

			Console.WriteLine("Height of the square:");
			n = int.Parse(Console.ReadLine());

			for (int i = 0; i < n; i++)
			{
				for (int j = 0; j < n; j++)
				{
					Console.Write("*");
				}
				Console.WriteLine();
			}
		}

		static void Tris()
		{
			int n;

			Console.WriteLine("Height of the triangle: ");
			n = int.Parse(Console.ReadLine());

			for (int i = 0; i < n; i++)
			{
				for (int j = 0; j <= i; j++)
				{
					Console.Write("*");
				}
				Console.WriteLine();
			}
		}
	}
}
