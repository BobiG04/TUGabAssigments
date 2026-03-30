namespace _1zad
{
	public class Square : Figure , IName
	{

		double a;

		public Square()
		{
			this.a = 0.0;
		}

		public Square(double a)
		{
			this.a = a;
		}

		public override void Input()
		{
            Console.WriteLine("Enter a: ");
            a = double.Parse(Console.ReadLine());
		}
		public override void Output()
		{
			Console.WriteLine("The sides of the square are: " + a);
		}

		string IName.FigName()
		{
			return "The figure is a square.";
        }

		public override double Area()
		{
			return a * a;
		}

		public double Areas
		{
			get { return a * a; }
		}

	}
}
