using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _1zad
{
	public class Cone : Circle
	{
		protected double height;

		public Cone() : base()
		{
			height = 0;
		}

		public Cone(double x, double y, double r, double height) : base(x, y, r)
		{
			this.height = height;
		}

		public void InputCone()
		{
			Console.WriteLine("Input the height of the cone.");
			height = double.Parse(Console.ReadLine());
		}

		public void OutputCone()
		{
			Console.WriteLine("Cone's height: {0}", height);
		}

		public double VolumeCone()
		{
			return (Math.PI * radius * radius * height) / 3;
		}
	}

}
