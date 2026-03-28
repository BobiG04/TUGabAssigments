using System;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace _2zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			
			int n = int.Parse(Console.ReadLine());
			int[] Arr = new int[n];
			int addResult = 0;
			int avrResult = 0;

			for (int i = 0; i < Arr.Length; i++)
			{
				Arr[i] = int.Parse(Console.ReadLine());
				addResult += Arr[i];
				avrResult = addResult / n;
			}

            Console.WriteLine("Subirane: " + addResult);
            Console.WriteLine("Sredno aritmetichno: " + avrResult);

        }
	}
}
