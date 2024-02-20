using System;

namespace NFactoriel
{
	internal class Program
	{
		static void Main(string[] args)
		{

			int n, nFact = 1;

			n = int.Parse(Console.ReadLine());

			for (int i = 1; i <= n; i++)
			{
				nFact *= i;
			}
				
			Console.WriteLine(nFact);

		}
	}
}
