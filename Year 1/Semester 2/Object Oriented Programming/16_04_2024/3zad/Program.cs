using System;

namespace _3zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			
			try
			{
				int numbMonth = int.Parse(Console.ReadLine());
				if (numbMonth < 1 || numbMonth > 13)
				{
					throw new Exception();
				} else
				{
                    Console.WriteLine(PrintMonth(numbMonth));
                }
			} catch (Exception ex)
			{
				Console.WriteLine(ex.Message);
                Console.WriteLine("Invalid month number.");
            }

			string PrintMonth(int numbMonth)
			{
				string[] months = { " " ,"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" };
				return months[numbMonth];
			}

		}
	}
}
