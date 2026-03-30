using System;

namespace _1zad
{
	internal class Program
	{
		static void Main(string[] args)
		{

			Rectangle rect1 = new Rectangle();
			rect1.Width = Convert.ToDouble(Console.ReadLine());
			rect1.Height = Convert.ToDouble(Console.ReadLine());
            
			Rectangle rect2 = new Rectangle(5, 10);

			Rectangle rect3 = new Rectangle();
			rect3.Input();

			if (rect1.Area > rect2.Area && rect1.Area > rect3.Area)
			{
				Console.WriteLine("The area is: {0}", rect1.Area);
			} else if (rect2.Area > rect1.Area && rect2.Area > rect3.Area)
			{
				Console.WriteLine("The area is: {0}", rect2.Area);
			} else
			{
				Console.WriteLine("The area is: {0}", rect3.Area);
			}

		}
	}

	class Rectangle
	{
		private double width;
		private double height;

		public Rectangle()
		{
			width = 0.0;
			height = 0.0;
		}

		public Rectangle(double w, double h)
		{
			width = w;
			height = h;
		}

		public double Width { set { width = value; } }
		public double Height { set { height = value;} }
		public double Area { get { return width * height; } }
		
		public void Input()
		{
			width = Convert.ToDouble(Console.ReadLine());
			height = Convert.ToDouble(Console.ReadLine());
		}

	}
}
