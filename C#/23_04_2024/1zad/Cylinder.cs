using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _1zad
{
	public class Cylinder : Circle
	{
		protected double height;

		public Cylinder() : base()
		{
			height = 0;
		}

		public Cylinder(double x, double y, double r, double height) : base(x, y, r)
		{
			this.height = height;
		}

		public void InputCyl()
		{
			Console.WriteLine("Input the height of the cylinder.");
			height = double.Parse(Console.ReadLine());
		}

		public void OutputCyl()
		{
			Console.WriteLine("Cylinder height: {0}", height);
		}

		public double VolumeCyl()
		{
			return Math.PI * radius * radius * height;
		}
	}

}
