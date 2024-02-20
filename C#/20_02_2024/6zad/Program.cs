using System;

namespace EnterPosNumb
{
	internal class Program
	{
		static void Main(string[] args)
		{

			int numb;

			numb = int.Parse(Console.ReadLine());

			for (int i = 0; numb != 0; i++)
			{
				numb = int.Parse(Console.ReadLine());
			}

		}
	}
}
