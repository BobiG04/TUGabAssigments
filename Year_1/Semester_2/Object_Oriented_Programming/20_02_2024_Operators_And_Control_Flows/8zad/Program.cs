using System;

namespace PineTree
{
	internal class Program
	{
		static void Main(string[] args)
		{

			int k;

            Console.WriteLine("Star or Number? \n 1 = Star \n 2 = Number");
			k = int.Parse(Console.ReadLine());

			PineTree(k);

		}

		static void PineTree(int k)
		{

			int n;
			Console.WriteLine("Pine tree width: ");
			n = int.Parse(Console.ReadLine());

			switch (k)
			{
				case 1:
					for (int i = 0; i <= n; i++)
					{
						for (int j = 1; j <= n - i; j++)
						{
							Console.Write(" ");
						}

						for (int l = 1; l <= i * 2 - 1; l++)
						{
							Console.Write("*");
						}

						Console.WriteLine();
					}
					break;
				case 2:
					for (int i = 0; i < n; i++)
					{
						for (int j = 0; j < n - i; j++)
						{
							Console.Write(" ");
						}

						for (int l = i; l >= 0; l--)
						{
							Console.Write(l);
						}

						for (int m = 1; m <= i; m++)
						{
							Console.Write(m);
						}

						Console.WriteLine();
					}
					break;
				default:
                    Console.WriteLine("Error");
					break;
            }

		}
	}
}
