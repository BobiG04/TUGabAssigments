using System;

namespace PosArrayNumber
{
	internal class Program
	{
		static void Main(string[] args)
		{

			Console.WriteLine("How big is the array?");
			int n = int.Parse(Console.ReadLine());
			int[] DfltArray = new int[n];
			int[] PosArray = new int[n];

            for (int i = 0; i < DfltArray.Length; i++)
            {
				Console.WriteLine("Enter any number: ");
				DfltArray[i] = int.Parse(Console.ReadLine());

				if (DfltArray[i] > 0)
				{
					PosArray[i] = DfltArray[i];
				} else
				{
					PosArray[i] = 0;
				}
            }

			Console.WriteLine("\nAll the elements are: ");
			Console.WriteLine(String.Join(" ",DfltArray));
            Console.WriteLine("The positive elements are: ");
            Console.WriteLine(String.Join(" ", PosArray));

		}
	}
}
