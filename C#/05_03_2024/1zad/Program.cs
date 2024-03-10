using System;
using System.Linq;

namespace _1zad
{
	internal class Program
	{
		static void Main(string[] args)
		{

			int[] Array = new int[20];

			for (int i=0; i<Array.Length; i++)
			{
				Array[i] = int.Parse(Console.ReadLine());
				Array[i] *= 5;
			}

            foreach (int number in Array)
            {
				Console.Write(" " + number);
			}

        }
	}
}
