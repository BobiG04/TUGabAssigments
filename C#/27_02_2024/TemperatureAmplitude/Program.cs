using System;

namespace TemperatureAmplitude
{
	internal class Program
	{
		public static void Main(string[] args)
		{
			string[] cityNames = { "Blagoevgrad", "Burgas", "Varna" ,"Veliko Tarnovo", "Vidin", "Vratsa", "Gabrovo", "Dobrich", "Kurdjali", "Kustendil", "Lovech", "Pleven", "Ruse", "Sofia"};
			int[] temperatures = { 8, 10, 12, 10, 13, 15, 14, 11, 9, 13, 7, 8, 13, 15 };

            Console.WriteLine("The hottest places today are:" + CityNames(true, cityNames, temperatures, cityNames.Length));
			Console.WriteLine("The coldest places today are:" + CityNames(false, cityNames, temperatures, cityNames.Length));

		}

		public static string CityNames(bool highOrLow, string[] cityNames, int[] temps, int arrayLenght)
		{
			string[] cityNamesHigh = cityNames;
			string[] cityNamesLow = cityNames;
			int midPointHigh = temps[0];
			int midPointLow = temps[0];

			if (highOrLow)
			{
				for (int i = 0; i < arrayLenght; i++)
				{
					if (temps[i] > midPointHigh)
					{
						midPointHigh = temps[i];
						cityNamesHigh[i] = cityNames[i];
					} else
					{
						cityNamesHigh[i] = "";
					}
				}
				return String.Join(" ",cityNamesHigh) + "with " + midPointHigh.ToString() + " degrees Celsius.";
            } else
			{
				for (int i = 0; i < arrayLenght; i++)
				{
					if (temps[i] < midPointLow)
					{
						midPointLow = temps[i];
						cityNamesLow[i] = cityNames[i];
					}
					else
					{
						cityNamesLow[i] = "";
					}
				}
				return String.Join(" ", cityNamesLow) + "with " + midPointLow.ToString() + " degrees Celsius.";
			}
		}
	}
}
