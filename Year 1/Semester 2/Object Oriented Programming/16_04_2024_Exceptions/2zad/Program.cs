using System;

namespace _2zad
{
	internal class Program
	{
		static void Main(string[] args)
		{

			try
			{
				int numb = int.Parse(Console.ReadLine());
				if (numb <= 0)
				{
					throw new Exception("Number must be positive.");
				} else
				{
					double sqrt = Math.Sqrt(numb);
                    Console.WriteLine(sqrt);
                }
			} catch (Exception e)
			{
                Console.WriteLine(e.Message);
            }
			finally
			{
                Console.WriteLine("End of program.");
            }

		}
	}
}
