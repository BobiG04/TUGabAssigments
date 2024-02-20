using System;

namespace TriangleType
{
	internal class Program
	{
		static void Main(string[] args)
		{

			int a, b, c;

			a = int.Parse(Console.ReadLine());
			b = int.Parse(Console.ReadLine());
			c = int.Parse(Console.ReadLine());

			if (a == b ^ c == b)
			{
				IsRavnoB();
			}
			else
			{
				IsRavnoRazno(a, b, c);
			}

		}

		static void IsRavnoRazno(int a, int b, int c)
		{
			if (a == b && b == c)
			{
				Console.WriteLine("triugulnika e ravnostranen");
			}
			else if (b != c && a != c && a != b)
			{
				Console.WriteLine("triugulnika e raznostranen");
			}
		}

		static void IsRavnoB()
		{
			Console.WriteLine("triugulnika e ravnobedren");
		}
	}
}
