using System;

namespace _3zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("Enter elements in the array: ");
			int n = int.Parse(Console.ReadLine());
			int currentLength = 1;
			int maxLength = 1;

			int[] numbers = new int[n];

			for (int i = 0; i < n; i++)
			{
				numbers[i] = int.Parse(Console.ReadLine());
			}

			for (int i = 1; i < n; i++)
			{
				if (numbers[i] > numbers[i - 1])
				{
					currentLength++;
				}
				else
				{
					currentLength = 1;
				}

				if (currentLength > maxLength)
				{
					maxLength = currentLength;
				}
			}

			Console.WriteLine("Nai dulgata poreditsa e do chisloto " + maxLength);
		}
	}
}
