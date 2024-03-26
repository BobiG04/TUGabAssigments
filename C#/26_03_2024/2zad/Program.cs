using System;

namespace _2zad
{
	internal class Program
	{
		static void Main(string[] args)
		{

			int k = int.Parse(Console.ReadLine());

			switch(k)
			{
				case 0:
					Rectangle r1 = new Rectangle();
					r1.Input();
					r1.Summing();
					Rectangle r2 = new Rectangle(2.5, 3.7);
					r2.Summing();
					r1.Output("blank constructor");
					r2.Output("predetermined constructor");
					break;
				case 1:
					Square square1 = new Square();
					square1.Input();
					square1.Summing();
					Square square2 = new Square(5.7);
					square2.Summing();
					square1.Output("blank constructor");
					square2.Output("predetermined constructor");
					break;
				case 2:
					Circle c1 = new Circle();
					c1.Input();
					c1.Summing();
					Circle c2 = new Circle(9.7);
					c2.Summing();
					c1.Output("blank constructor");
					c2.Output("predetermined constructor");
					break;
				default:
                    Console.WriteLine("EROOR!");
					break;
            }

		}
	}
	public class Rectangle
	{
		private double width;
		private double height;

		public Rectangle ()
		{
			width = 0.0;
			height = 0.0;
		}

		public Rectangle (double width, double height)
		{
			this.width = width;
			this.height = height;
		}

		public void Input()
		{

			Console.WriteLine("Enter width: ");
			width = double.Parse(Console.ReadLine());
			Console.WriteLine("Enter height: ");
			height = double.Parse(Console.ReadLine());

		}

		public double Summing()
		{

			return Math.Round(width * height,2);

		}

		public void Output(string text)
		{
			Console.WriteLine("The area is: " + Summing() + " - " + text);
		}
	}

	public class Square
	{
		private double a;

		public Square ()
		{
			a = 0.0;
		}

		public Square (double a)
		{
			this.a = a;
		}

		public void Input()
		{

			Console.WriteLine("Enter strana: ");
			a = double.Parse(Console.ReadLine());

		}

		public double Summing()
		{

			return Math.Round(a * a,2);

		}

		public void Output(string text)
		{
			Console.WriteLine("The area is: " + Summing() + " - " + text);
		}
	}

	public class Circle
	{
		private double r;

		public Circle ()
		{
			r = 0.0;
		}

		public Circle (double r)
		{
			this.r = r;
		}

		public void Input()
		{

			Console.WriteLine("Enter radius: ");
			r = double.Parse(Console.ReadLine());

		}

		public double Summing()
		{

			return Math.Round(Math.PI * Math.Pow(r, 2), 2);

		}

		public void Output(string text)
		{
			Console.WriteLine("The area is: " + Summing() + " - " + text);
		}
	}
}
