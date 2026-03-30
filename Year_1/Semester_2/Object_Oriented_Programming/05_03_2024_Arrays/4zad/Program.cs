using System;

namespace _4zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("Enter a word or sentance: ");
			string word = Console.ReadLine();

			char[] reversedWord = word.ToCharArray();
			Array.Reverse(reversedWord);
			string theReversedWord = new string(reversedWord);

			Console.WriteLine("The word in reverse is: " + theReversedWord);
		}
	}
}
