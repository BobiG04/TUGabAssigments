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
				if (numbMonth < 1 || numbMonth > 12)
				{
					throw new Exception("Invalid month number. Must be between 1 and 12.");
				} else
				{
                    Console.WriteLine(PrintMonth(numbMonth));
                }
			} catch (Exception e)
			{
				Console.WriteLine(e.Message);
            }

			string PrintMonth(int numbMonth)
			{
				string[] months = { " " ,"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" };
				return months[numbMonth];
			}

		}
	}
}
