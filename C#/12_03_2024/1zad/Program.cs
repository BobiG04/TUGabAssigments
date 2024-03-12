using System;

namespace _1zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			
			Rectangle r = new Rectangle();
			Triangle t = new Triangle();
			Circle c = new Circle();
			int k = int.Parse(Console.ReadLine());

			switch (k)
			{
				case 0: // Rectangle
						r.Input();
						r.Output();
					break;
				case 1: // Triangle
						t.Input();
						t.Output();
					break;
				case 2: // Triangle
						t.Input();
						t.Output();
					break;
			}

		}
	}

	public class Rectangle
	{
		private double width;
		private double height;

		public void Input()
		{

			Console.WriteLine("Enter width: ");
			width = double.Parse(Console.ReadLine());
			Console.WriteLine("Enter height: ");
			height = double.Parse(Console.ReadLine());

		}

		public double Summing() {
		
			return width * height;

		}

		public void Output()
		{
			Console.WriteLine("The area is: " + Summing());
		}
	}
	
	public class Triangle
	{
		private double a;
		private double height;

		public void Input()
		{

			Console.WriteLine("Enter strana: ");
			a = double.Parse(Console.ReadLine());
			Console.WriteLine("Enter height: ");
			height = double.Parse(Console.ReadLine());

		}

		public double Summing() {
		
			return (a * height) / 2;

		}

		public void Output()
		{
			Console.WriteLine("The area is: " + Summing());
		}
	}
	
	public class Circle
	{
		private double r;
		private double Pi = 3.14;

		public void Input()
		{

			Console.WriteLine("Enter radius: ");
			r = double.Parse(Console.ReadLine());

		}

		public double Summing() {

			return Pi * Math.Pow(r, 2);

		}

		public void Output()
		{
			Console.WriteLine("The area is: " + Summing());
		}
	}
}
