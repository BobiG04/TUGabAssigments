using System;

namespace _2zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			
			Dot d1 = new Dot();
			Dot d2 = new Dot();
			Dot d3 = new Dot();

			d1.Input();
			d2.Input();
			d3.Input();

			d1.Output();
			d2.Output();
			d3.Output();

			d1.Translation(d3.x, d3.y);
			d2.Translation(d1.x, d1.y);
			d3.Translation(d2.x, d2.y);

            Console.WriteLine("\nEnter angle: ");
            int angle = int.Parse(Console.ReadLine());

			d1.Rotation(angle);
			d2.Rotation(angle);
			d3.Rotation(angle);

			Console.WriteLine("\nEnter koefitsient: ");
			int koef = int.Parse(Console.ReadLine());

			d1.Bigger(koef, koef);
			d2.Bigger(koef, koef);
			d3.Bigger(koef, koef);

		}
	}

	public class Dot
	{
		public int x;
		public int y;

		public void Input()
		{
            Console.WriteLine("Enter x: ");
            x = int.Parse(Console.ReadLine());
			Console.WriteLine("Enter y: ");
			y = int.Parse(Console.ReadLine());
		}

		public void Output()
		{
			Console.WriteLine("x = " + x);
			Console.WriteLine("y = " + y);
		}

		public void Translation(int Vx, int Vy)
		{

			int xTrans;
			int yTrans;

			if (Vx > x && Vy > y)
			{
				xTrans = Vx - x; yTrans = Vy - y;
                Console.WriteLine("\nThe translation between the two is: " + xTrans + " & " + yTrans);
            } else
			{
				xTrans = x - Vx; yTrans = y - Vy;
				Console.WriteLine("\nThe translation between the two is: " + xTrans + " & " + yTrans);
			}

		}

		public void Rotation (int alpha)
		{
			if (alpha >= 0 && alpha <= 360)
			{
				double x1 = x * Math.Cos(alpha) - y * Math.Sin(alpha);
				double y1 = x * Math.Sin(alpha) - y * Math.Cos(alpha);
				Console.WriteLine("\nThe new coordinates are: " + Math.Round(x1,2) + " & " + Math.Round(y1, 2));
			} else
			{
                Console.WriteLine("\nThe angle is out of range.");
            }
        }

		public void Bigger (int kX, int kY)
		{
			int bX = x * kX;
			int bY = y * kY;

			Console.WriteLine("\nThe dot is: " + bX + " & " + bY + " times bigger.");
		}
	}
}
