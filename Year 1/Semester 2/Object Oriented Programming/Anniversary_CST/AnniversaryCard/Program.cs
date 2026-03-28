using System;

class Program
{
	static void Main(string[] args)
	{
		DrawCard();
	}

	static void DrawCard()
	{
		string message1 = "Happy 40th Anniversary";
		string message2 = "CST";

		Console.WriteLine("┌──────────────────────────────────────────────────┐");

		for (int i = 0; i < 18; i++)
		{
			if (i == 8)
			{
				Console.WriteLine("│              " + message1 + "              │");
			} else if (i == 9)
			{
				Console.WriteLine("│                       " + message2 + "                        │");
			}
			else
			{
				Console.WriteLine("│                                                  │");
			}
		}

		Console.WriteLine("└──────────────────────────────────────────────────┘");
	}
}

// Богомил Георгиев Иванов
// Фак. №: 22372126
// Спец.: СКИ