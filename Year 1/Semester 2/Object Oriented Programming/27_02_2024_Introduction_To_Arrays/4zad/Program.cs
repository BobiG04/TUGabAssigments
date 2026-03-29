using System;

namespace TemperatureAmplitude
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            string[] cityNames = { "Blagoevgrad", "Burgas", "Varna", "Veliko Tarnovo", "Vidin", "Vratsa", "Gabrovo", "Dobrich", "Kurdjali", "Kustendil", "Lovech", "Pleven", "Ruse", "Sofia" };
            int[] temperatures = { 8, 10, 12, 10, 13, 15, 14, 11, 9, 13, 7, 8, 13, 15 };

            CityNames(cityNames, temperatures, cityNames.Length);
        }

        public static void CityNames(string[] cityNames, int[] temps, int arrayLenght)
        {
            int midPointHigh = temps[0];
            int midPointLow = temps[0];
            int TempDifferance = 0;

            // Стъпка 1: Намираме кои са най-високата и най-ниската температура
            for (int i = 0; i < arrayLenght; i++)
            {
                if (temps[i] < midPointLow)
                {
                    midPointLow = temps[i];
                }

                if (temps[i] > midPointHigh)
                {
                    midPointHigh = temps[i];
                }
            }

            TempDifferance = midPointHigh - midPointLow;

            // Стъпка 2: Извеждаме всички градове, които имат тази температура
            Console.Write("The hottest place(s) today with " + midPointHigh + " degrees Celcius: ");
            for (int i = 0; i < arrayLenght; i++)
            {
                if (temps[i] == midPointHigh)
                {
                    Console.Write(cityNames[i] + " ");
                }
            }
            Console.WriteLine();

            Console.Write("The coldest place(s) today with " + midPointLow + " degrees Celcius: ");
            for (int i = 0; i < arrayLenght; i++)
            {
                if (temps[i] == midPointLow)
                {
                    Console.Write(cityNames[i] + " ");
                }
            }
            Console.WriteLine();

            Console.WriteLine("The temperature differance is: " + TempDifferance);
        }
    }
}