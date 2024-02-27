using System;

namespace Rows
{
	internal class Program
	{
		static void Main(string[] args)
		{

			Console.WriteLine("How big is the array?");
			int n = int.Parse(Console.ReadLine());
			int[] RowArray = new int[n];

			for (int i = 0; i < n; i++)
			{
                Console.WriteLine("Enter an value to element " + i + ": ");
                RowArray[i] = int.Parse(Console.ReadLine());
			}
            Console.WriteLine("\nStraight:");
            Console.WriteLine(String.Join(" ",RowArray));
            Console.WriteLine("Backward:");
            for (int i = n - 1; i >= 0; i--)
			{
				Console.Write(RowArray[i] + " ");
            }
            Console.WriteLine();

        }
	}
}
