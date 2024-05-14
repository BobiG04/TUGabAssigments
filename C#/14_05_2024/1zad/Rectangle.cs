namespace _1zad
{
	public class Rectangle: Figure , IName
	{

		double a, b;

		public Rectangle()
		{
			this.a = 0.0;
			this.b = 0.0;
		}

		public Rectangle (double a, double b)
		{
			this.a = a;
			this.b = b;
		}

		public override void Input()
		{
            Console.WriteLine("Enter a and b:");
            a = double.Parse(Console.ReadLine());
			b = double.Parse(Console.ReadLine());
		}
		public override void Output()
		{
			Console.WriteLine("The sides of the rectangle are: " + a + b);
		}

		string IName.FigName()
		{
			return "The figure is a rectangle.";
		}

		public override double Area()
		{
			return a * b;
		}

		public double Areas
		{
			get { return a * b; }
		}

	}
}
