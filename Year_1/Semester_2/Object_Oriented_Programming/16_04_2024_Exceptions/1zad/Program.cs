using System;

namespace _1zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			
			try
			{
				int a = int.Parse(Console.ReadLine());
				int b = int.Parse(Console.ReadLine());
				int result = a / b;
			} catch (Exception e)
			{
				Console.WriteLine(e.Message);
			} finally
			{
				Console.WriteLine("God bye!");
			}

		}
	}
}
