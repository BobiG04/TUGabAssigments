namespace Points
{
	public class Region
	{

		private static Region instance;

		public double Xmin { get; private set; }
		public double Xmax { get; private set; }
		public double Ymin { get; private set; }
		public double Ymax { get; private set; }

		private Region(double xmin, double xmax, double ymin, double ymax)
		{
			Xmin = xmin;
			Xmax = xmax;
			Ymin = ymin;
			Ymax = ymax;
		}

		public static Region GetInstance(double xmin = 0, double xmax = 10, double ymin = 0, double ymax = 10)
		{
			if (instance == null)
			{
				instance = new Region(xmin, xmax, ymin, ymax);
			}
			return instance;
		}

		public bool Contains(Point p)
		{
			return p.X >= Xmin && p.X <= Xmax && p.Y >= Ymin && p.Y <= Ymax;
		}

		public void PrintRegion()
		{
			Console.WriteLine($"Region: X [{Xmin}, {Xmax}], Y [{Ymin}, {Ymax}]");
		}

	}
}
