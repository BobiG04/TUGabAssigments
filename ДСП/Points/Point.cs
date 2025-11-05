using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Points
{
	public class Point
	{
		public double X { get; private set; }
		public double Y { get; private set; }

		public Point()
		{
			X = 0;
			Y = 0;
		}

		public Point(double xcor, double ycor)
		{
			X = xcor;
			Y = ycor;
		}

		public void Input()
		{
			Console.Write("Enter X coordinate: ");
			X = double.Parse(Console.ReadLine());
			Console.Write("Enter Y coordinate: ");
			Y = double.Parse(Console.ReadLine());
		}

		public void Print()
		{
			Console.WriteLine($"Point ({X}, {Y})");
		}
	}
}
