using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _1zad
{
	public class Circle : Dot
	{
		protected double radius;

		public Circle() : base()
		{
			radius = 0;
		}

		public Circle(double x, double y, double r) : base(x, y)
		{
			this.radius = r;
		}

		public double Radius
		{
			get { return radius; }
			set { radius = value; }
		}

		public void InputCir()
		{
			Console.WriteLine("Input the radius.");
			radius = double.Parse(Console.ReadLine());
		}

		public void OutputCir()
		{
			Console.WriteLine("Circle radius: {0}", radius);
		}

		public double AreaCir
		{
			get { return radius * radius * Math.PI; }
		}
	}
}
