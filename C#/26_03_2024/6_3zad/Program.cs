using System;

namespace _6_3zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			
			int n = int.Parse(Console.ReadLine());
			Triangle[] tris = new Triangle[n];

			double p;
			double s;

            for (int i = 0; i < tris.Length; i++)
            {
				tris[i] = new Triangle();
				tris[i].Input();
				tris[i].Calculations(tris[i],out p, out s);
				Console.WriteLine("The perimeter and the area of triangle " + i + " is respectively " + p + " & " + s);
            }
        }
	}

	class Triangle
	{
		private double a;
		private double b;
		private double c;
		private bool isTris;

		public Triangle()
		{
			a = 0.0; b = 0.0; c = 0.0; isTris = false;
		}

		public void Input()
		{
			a = int.Parse(Console.ReadLine());
			b = int.Parse(Console.ReadLine());
			c = int.Parse(Console.ReadLine());

			if (a + b > c && b + c > a && a + c > b)
			{
				isTris = true;
			}
			else
			{
				isTris = false;
			}
		}

		public void Calculations(in Triangle trisObj, out double p, out double s) 
		{
			p = 0.0;
			s = 0.0;
		
			if (trisObj.isTris)
			{
				p = trisObj.a + trisObj.b + trisObj.c;
				double halfp = p / 2;
				s = Math.Round(Math.Sqrt(halfp * (halfp - trisObj.a) * (halfp - trisObj.b) * (halfp - trisObj.c)), 2);
			} else
			{
                Console.WriteLine("ERROOOOR! Triangle is non-existant.");
				p = 0.0;
				s = 0.0;
            }

		}
	}
}
