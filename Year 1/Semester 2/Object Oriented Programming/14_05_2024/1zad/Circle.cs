namespace _1zad
{
	internal class Circle : Figure, IName
	{
		double r;

		public Circle ()
		{
			this.r = 0.0;
		}

		public Circle (double r)
		{
			this.r = r;
		}

		public override void Input()
		{
            Console.WriteLine("Enter r: ");
            r = double.Parse(Console.ReadLine());
		}
		public override void Output() 
		{
            Console.WriteLine("The circle's radius is: " + r);
        }

		string IName.FigName()
		{
			return "The figure is a circle.";
		}

		public override double Area()
		{
			return Math.Round(Math.PI * Math.Pow(r, 2), 2);
		}

		public double Areas
		{
			get { return Math.Round(Math.PI * Math.Pow(r, 2), 2); }
		}
	}
}
