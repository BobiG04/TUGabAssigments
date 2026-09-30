using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Operators
{
	internal class Program
	{
		private static int ReadInt(string prompt)
		{
			while (true)
			{
				Console.Write(prompt);
				var input = Console.ReadLine();

				if (int.TryParse(input, out var value))
				{
					return value;
				}

				Console.WriteLine("Invalid integer. Please try again.");
			}
		}

		static void Main(string[] args)
		{
			int a = ReadInt("Enter a: ");
			int b = ReadInt("Enter b: ");

			if (b == 0)
			{
				Console.WriteLine("Division by zero is not allowed.");
				return;
			}

			Console.WriteLine(a + b);
			Console.WriteLine(a - b);
			Console.WriteLine(a * b);
			Console.WriteLine(a / b);
			Console.WriteLine(a % b);
			Console.WriteLine(a++);
			Console.WriteLine(b--);
			Console.WriteLine(b--);
			Console.WriteLine(+a);
			Console.WriteLine(-b);

			if (a > 0) Console.WriteLine("\nA is greater");
			else Console.WriteLine("\nB is greater");

			if (a == b) Console.WriteLine(a + " = " + b);
			else if (a != b) Console.WriteLine(a + " != " + b);

			if (a == 2 && b == 2) Console.WriteLine(a + " = " + b + " = 2");

			if (a == 3 || b == 3) Console.WriteLine("One of them or both of them is equal to 3");
			else if ((a == 3) ^ (b == 3)) Console.WriteLine("One of them is equal to 3, but not both");
		}
	}
}
