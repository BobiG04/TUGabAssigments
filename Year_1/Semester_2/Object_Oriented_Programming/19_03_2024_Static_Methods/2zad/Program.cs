using System;
using System.Diagnostics.Metrics;
using System.Security.Cryptography;

namespace _2zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			int meters;
			int kilometers;

			meters = int.Parse(Console.ReadLine());
			kilometers = int.Parse(Console.ReadLine());

            Console.WriteLine("Meters per second to kilometers per hour: " + Converter.MpSToKmpH(meters));
            Console.WriteLine("Kilometers per hour to meters per second: " + Converter.KmpHToMpS(kilometers));
        }
	}

	class Converter
	{
		public static double MpSToKmpH(int meters)
		{
			double KmpH = meters * 3.6;
			return Math.Round(KmpH, 2);
		}

		public static double KmpHToMpS(int kilometers)
		{
			double MpS = kilometers / 3.6;
			return Math.Round(MpS, 2);
		}
	}
}
