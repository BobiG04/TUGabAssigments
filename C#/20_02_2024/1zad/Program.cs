using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Operators
{
	internal class Program
	{
		static void Main(string[] args)
		{

			int a, b;

			a = int.Parse(Console.ReadLine());
			b = int.Parse(Console.ReadLine());

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

			if (a > 0) Console.WriteLine("\n A is greater");
			else Console.WriteLine("\n B is garter");

			if (a == b) Console.WriteLine(a + " = " + b);
			else if (a != b) Console.WriteLine(a + " != " + b);

			if (a == 2 && b == 2) Console.WriteLine(a + " = " + b + " = 2");

			if (a == 3 || b == 3) Console.WriteLine("One of them or both of them is equal to 3");
			else if (a == 3 ^ b == 3) Console.WriteLine("One of them is equal to 3, but not both");

        }
	}
}
