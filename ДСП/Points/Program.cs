namespace Points
{
    internal class Program
    {
        static void Main(string[] args)
        {
			Region region = Region.GetInstance(0, 10, 0, 10);
			region.PrintRegion();

			Console.Write("Enter the number of points: ");
			int n = int.Parse(Console.ReadLine());

			List<Point> points = new List<Point>(new Point[n]);

			for (int i = 0; i < n; i++)
			{
				Console.WriteLine($"\nPoint #{i + 1}:");
				Point p = new Point();
				p.Input();
				Point pres = new Point(region.Xmin,region.Ymin);

				if (region.Contains(p))
				{
					Console.WriteLine(" The point is in the region.");
					points[i] = p;
				}
				else
				{
					Console.WriteLine(" The point is outside the region. The point reseted to [0,0].");
					points[i] = pres;
				}
			}

			Console.WriteLine("\nAll entered points are in the region:");
			foreach (var p in points)
			{
				p.Print();
			}
		}
    }
}
