using System;
using System.ComponentModel.Design;

namespace Tickets
{
	internal class Program
	{
		static void Main()
		{

			double budget, transFine = 0, finalBudget;
			float VIPTicket = 497.54f;
			float Ticket = 245.80f;

			Console.WriteLine("How many people are there?");
			int persons = Int32.Parse(Console.ReadLine());
			Console.WriteLine("How much moneh do you have?");
			budget = float.Parse(Console.ReadLine());

			Summing(persons,budget,transFine);

			finalBudget = budget - transFine;

			if (finalBudget > VIPTicket)
			{
				Console.WriteLine("There is enough money for VIP Ticket.");
				Console.WriteLine("There's " + Math.Round((finalBudget - VIPTicket), 2) + " left.");
			}
			else if (finalBudget > Ticket)
			{
				Console.WriteLine("There is enough money for Regular Ticket.");
				Console.WriteLine("You need: " + Math.Round((VIPTicket - finalBudget), 2) + " for VIP Ticket.");
				Console.WriteLine("There's " + Math.Round((finalBudget - Ticket), 2) + " left.");
			}
			else if (finalBudget < Ticket)
			{
				Console.WriteLine("There is not enough money for any Ticket.");
				Console.WriteLine("You need: " + Math.Round((Ticket - finalBudget), 2));
			}

			//metodi

		}

		public static void Summing(int person, double budget, double transFine) {

			if (person < 5)
				transFine = budget - ((budget * 75) / 100);
			else if (person > 4 && person < 10)
				transFine = budget - ((budget * 60) / 100);
			else if (person > 9 && person < 25)
				transFine = budget - ((budget * 50) / 100);
			else if (person > 24 && person < 50)
				transFine = budget - ((budget * 40) / 100);
			else if (person > 49)
				transFine = budget - ((budget * 25) / 100);

		}
	}
}
