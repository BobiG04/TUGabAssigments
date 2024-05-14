namespace _1zad
{
	public class Rhombus : Figure, IName
	{

		double a, h;

		public Rhombus ()
		{
			this.a = 0.0;
			this.h = 0.0;
		}

		public Rhombus (double a, double h)
		{
			this.a = a;
			this.h = h;
		}

		public override void Input()
		{
            Console.WriteLine("Enter a and h:");
            a = double.Parse(Console.ReadLine());
			h = double.Parse(Console.ReadLine());
		}

		public override void Output()
		{
            Console.WriteLine("The side of the rhombus is: {0} The height of it is: {1}", a, h);
        }

		public void IName.FigName()
		{
			return "The figure is a rhombus.";
		}

		public override double Area()
		{
			return a * h;
		}

		public double Areas
		{
			get { return a * h; }
		}
	}
}
