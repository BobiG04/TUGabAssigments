using System;

namespace _1zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			Dot dot1 = new Dot();
			Dot dot2 = new Dot();
			Dot dot3 = new Dot();

			dot1.Input();
			dot2.Input();
			dot3.Input();

			dot1.Output();
			dot2.Output();
			dot3.Output();

            Console.WriteLine(Dot.Distance(dot1, dot2));
            Console.WriteLine(Dot.Distance(dot2, dot3));
            Console.WriteLine(Dot.Distance(dot1, dot3));
		}
	}

	class Dot
	{
		private int x, y;

		public void Input()
		{
			x = int.Parse(Console.ReadLine());
			y = int.Parse(Console.ReadLine());
		}

		public void Output()
		{
			Console.WriteLine("Coordinates: " + x + " " + y);
		}

		public static double Distance(Dot a, Dot b)
		{
			int dx, dy;
			dx = a.x - b.x;
			dy = a.y - b.y;
			double lenght = Math.Sqrt(dx * dx + dy * dy);
			return Math.Round(lenght,2);
		}
	}
}
