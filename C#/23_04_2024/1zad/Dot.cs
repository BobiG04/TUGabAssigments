using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _1zad
{
	public class Dot
	{
		protected double x, y;

		public Dot()
		{
			x = 0;
			y = 0;
		}

		public Dot(double x, double y)
		{
			this.x = x;
			this.y = y;
		}

		public double X
		{
			get { return x; }
			set { x = value; }
		}

		public double Y
		{
			get { return y; }
			set { y = value; }
		}

		public void InputDot()
		{
			Console.WriteLine("Input the x coordinate.");
			x = double.Parse(Console.ReadLine());
			Console.WriteLine("Input the y coordinate.");
			y = double.Parse(Console.ReadLine());
		}

		public void OutputDot()
		{
			Console.WriteLine("Coordinates: {0}, {1}", x, y);
		}

	}
}
