using System;

namespace Redove
{
	internal class Program
	{
		static void Main(string[] args)
		{

			int n;

			n = int.Parse(Console.ReadLine());

			for (int i = 0; i <= n; i++)
			{
				Console.Write(" " + i);
			}
            Console.WriteLine("\n");
            for (int i = n; i >= 0; i--)
			{
				Console.Write(" " + i);
			}

		}
	}
}
