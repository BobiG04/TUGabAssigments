using System;

namespace DaysInMonth
{
	internal class Program
	{
		static void Main(string[] args)
		{

			string[,] Data = { {"January","February","March","April","May","June","July","August","September","October","November","December"},{"31","28/29","31","30","31","30","31","31","30","31","30","31"} };

            Console.WriteLine("Enter month name: ");
            string monthName = Console.ReadLine();

			switch (monthName)
			{
				case "January":
					Console.WriteLine(Data[0, 0] + " has " + Data[1, 0] + " days.");
					break;
				case "February":
					Console.WriteLine(Data[0, 1] + " has " + Data[1, 1] + " days, depending on the year.");
					break;
				case "March":
					Console.WriteLine(Data[0, 2] + " has " + Data[1, 2] + " days.");
					break;
				case "April":
					Console.WriteLine(Data[0, 3] + " has " + Data[1, 3] + " days.");
					break;
				case "May":
					Console.WriteLine(Data[0, 4] + " has " + Data[1, 4] + " days.");
					break;
				case "June":
					Console.WriteLine(Data[0, 5] + " has " + Data[1, 5] + " days.");
					break;
				case "July":
					Console.WriteLine(Data[0, 6] + " has " + Data[1, 6] + " days.");
					break;
				case "August":
					Console.WriteLine(Data[0, 7] + " has " + Data[1, 7] + " days.");
					break;
				case "September":
					Console.WriteLine(Data[0, 8] + " has " + Data[1, 8] + " days.");
					break;
				case "October":
					Console.WriteLine(Data[0, 9] + " has " + Data[1, 9] + " days.");
					break;
				case "November":
					Console.WriteLine(Data[0, 10] + " has " + Data[1, 10] + " days.");
					break;
				case "December":
					Console.WriteLine(Data[0, 11] + " has " + Data[1, 11] + " days.");
					break;
			}

		}
	}
}
