using System;

namespace EnterPosNumb
{
	internal class Program
	{
		static void Main(string[] args)
		{

			int numb, sum=0;

			numb = int.Parse(Console.ReadLine());
			sum += numb;

			while (numb != 0)
			{
				numb = int.Parse(Console.ReadLine());
				sum += numb;
			}

			Console.WriteLine(" The final sum is: "+sum);

		}
	}
}
