using System;

namespace TemperatureAmplitude
{
	internal class Program
	{
		public static void Main(string[] args)
		{
			string[] cityNames = { "Blagoevgrad", "Burgas", "Varna" ,"Veliko Tarnovo", "Vidin", "Vratsa", "Gabrovo", "Dobrich", "Kurdjali", "Kustendil", "Lovech", "Pleven", "Ruse", "Sofia"};
			int[] temperatures = { 8, 10, 12, 10, 13, 15, 14, 11, 9, 13, 7, 8, 13, 15 };


			CityNames(cityNames,temperatures,cityNames.Length);
		}

		public static void CityNames(string[] cityNames, int[] temps, int arrayLenght)
		{
			string cityNamesHigh = cityNames[0];
			string cityNamesLow = cityNames[0];
			int midPointHigh = temps[0];
			int midPointLow = temps[0];
			int TempDifferance = 0;

            for (int i = 0; i < arrayLenght; i++)
            {
				if (temps[i] < midPointLow)
				{
					midPointLow = temps[i];
					cityNamesLow = cityNames[i];
				}

				if (temps[i] > midPointHigh)
				{
					midPointHigh = temps[i];
					cityNamesHigh = cityNames[i];
				}
			}

			TempDifferance = midPointHigh - midPointLow;

			Console.WriteLine("The hottest place today is: " + cityNamesHigh + " with " + midPointHigh + " degrees Celcius.");
			Console.WriteLine("The coldest place today is: " + cityNamesLow + " with " + midPointLow + " degrees Celcius.");
			Console.WriteLine("The temperature differance is: " + TempDifferance);
		}
	}
}
