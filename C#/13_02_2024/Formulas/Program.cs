namespace Formulas
{
	internal class Program
	{
		static void Main(string[] args)
		{

			double a, b, x;
			// double y;

            Console.WriteLine(" Enter a:");
            a = int.Parse(Console.ReadLine());
			Console.WriteLine(" Enter b:");
			b = int.Parse(Console.ReadLine());
			Console.WriteLine(" Enter x:");
			x = int.Parse(Console.ReadLine());

			Console.WriteLine(" y = " + Math.Round((1 / (1 / (x - 1)))), 2);
			Console.WriteLine(" y = " + Math.Round((Math.Sqrt((Math.Pow(x, 2) * (x + 3))))), 2);
			Console.WriteLine(" y = " + Math.Round(((Math.Pow((a + b), 2) - (4 * Math.Pow(a, 3))) / (Math.Sqrt(3 * Math.Abs(a)) + 1))), 2);
			Console.WriteLine(" y = " + Math.Round((1 - (Math.Pow((Math.Pow(x, 2) - 1), 5))) / Math.Sqrt(Math.Pow(x, 2) + (2 * x) + 1)), 2);
			Console.WriteLine(" y = " + Math.Round((((5 - Math.Pow(x, 3)) / 3) - ((x - 1) / (x + 3)))), 2);
			Console.WriteLine(" y = " + Math.Round((Math.Abs(Math.Sqrt(2 + Math.Pow(x, 5)) / (Math.Pow(x, 4) + 5 * x)))), 2);

		}
	}
}
