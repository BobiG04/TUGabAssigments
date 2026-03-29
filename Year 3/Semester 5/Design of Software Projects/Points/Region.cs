namespace Points
{
	public class Region
	{

		private static Region instance;

		private double xmin;
		private double xmax;
		private double ymin;
		private double ymax;

		public double Xmin { get { return xmin; } private set { xmin = value; } }
		public double Xmax { get { return xmax; } set { xmax = value; } }
		public double Ymin { get { return ymin; } private set { ymin = value; } }
		public double Ymax { get { return ymax; } set { ymax = value; } }

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
