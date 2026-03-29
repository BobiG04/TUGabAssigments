using System;

namespace StValentine
{
	internal class Program
	{
		static void Main(string[] args)
		{

			int brRoses, brTulip, brOrchid;
			float prRoses = 7.89f, prTulip = 5.89f, prOrchid = 45.32f, totalPrice = 0f;
			string season;

			Console.WriteLine("The current season is: ");
			season = Console.ReadLine();

            Console.WriteLine("Number of tulips: ");
            brTulip = int.Parse(Console.ReadLine());
            Console.WriteLine("Number of roses: ");
			brRoses = int.Parse(Console.ReadLine());
            Console.WriteLine("Number of orchids: ");
			brOrchid = int.Parse(Console.ReadLine());

			prRoses *= (15f / 100f);
			prTulip *= (15f / 100f);
			prOrchid *= (15f / 100f);

			totalPrice = Sales(prTulip, brTulip, season, "Tulip") + Sales(prRoses, brRoses, season, "Rose") + Sales(prTulip, brTulip, season, "Orchid");

			Console.WriteLine("The Tulips are worth: " + Sales(prTulip, brTulip, season, "Tulip").ToString("0.00"));
            Console.WriteLine("The Roses are worth: " + Sales(prRoses, brRoses, season, "Rose").ToString("0.00"));
            Console.WriteLine("The Orchids are worth: " + Sales(prTulip, brTulip, season, "Orchid").ToString("0.00"));

            Console.WriteLine("The total price is: " + totalPrice.ToString("0.00"));

        }

		static float Sales(float price, int broi, string season, string FlowerType)
		{
			float finalPrice = 0f;

			if (broi == 3 && season == "Spring" && FlowerType == "Tulip")
			{
				finalPrice += (price * 3f) - (15f / 100f) + 5f; return finalPrice;
			} else if (broi == 12 && season == "Spring" && FlowerType == "Rose")
			{
				finalPrice += (price * 12f) - (10f / 100f) + 5f; return finalPrice; 
			} else if (broi == 22 && season == "Spring" || season == "Summer")
			{
				finalPrice += (price * broi) - (23f / 100f) + 5f; return finalPrice;
			} else
			{
				finalPrice += (price * broi) + 5f;
				return finalPrice;
			}

		}
	}
}
