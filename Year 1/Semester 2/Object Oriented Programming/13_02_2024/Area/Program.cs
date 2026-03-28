using System;

namespace Area
{
	internal class Program
	{
		static void Main(string[] args)
		{
			
			double a,b,c,d,r,ha,hb,h;

			#region Input

			Console.WriteLine("Enter radius: ");
			r = double.Parse(Console.ReadLine());
			Console.WriteLine("Enter a: ");
			a = double.Parse(Console.ReadLine());
			Console.WriteLine("Enter b: ");
			b = double.Parse(Console.ReadLine());
			Console.WriteLine("Enter c: ");
			c = double.Parse(Console.ReadLine());
			Console.WriteLine("Enter d: ");
			d = double.Parse(Console.ReadLine());
			Console.WriteLine("Enter ha: ");
			ha = double.Parse(Console.ReadLine());
			Console.WriteLine("Enter hb: ");
			hb = double.Parse(Console.ReadLine());
			Console.WriteLine("Enter h: ");
			h = double.Parse(Console.ReadLine());

			#endregion

			Console.WriteLine("The area for the circle is: " + Math.Round(AreaCircle(r),2));
			Console.WriteLine("The area for the parallelogram is: " + Math.Round(AreaParallelogram(a, ha, b, hb),2));
			Console.WriteLine("The area for the square is: " + Math.Round(AreaSquare(a),2));
			Console.WriteLine("The area for the triangle is: " + Math.Round(AreaTriangle(a, b, c), 2));
			Console.WriteLine("The area for the trapezoid is: " + Math.Round(AreaTrapezoid(a, b, h), 2));

		}

		static double AreaCircle(double radius)
		{
			double S = 0;
			double Pi = 3.14;

			S = Pi * Math.Sqrt(radius);

			return S;
		}

		static double AreaParallelogram(double a, double ha,double b, double hb)
		{
			double S = 0;

			if (a != 0 && ha != 0 && b != 0 && hb != 0)
			{
				if (a != 0 && ha != 0)
				{
					S = a * ha;
					return S;
				} else
				{
					S = b * hb;
					return S;
				}
			} else
			{
				return S;
			}
		}

		static double AreaSquare(double a)
		{
			double S = 0;

			S = Math.Pow(a, 4);

			return S;
		}

		static double AreaTriangle (double a,double b,double c)
		{
			double S = 0;

			double p = (a + b + c) / 2;
			S = Math.Sqrt(p * (p - a) * (p - b) * (p - c));

			return S;
		}

		static double AreaTrapezoid (double a,double b, double h)
		{
			double S = 0;

			S = ((a + b) * h) / 2;

			return S;
		}
	}
}
