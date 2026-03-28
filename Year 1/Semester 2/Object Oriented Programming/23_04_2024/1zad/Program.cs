using System;

namespace _1zad
{
	internal class Program
	{
		static void Main(string[] args)
		{

			Dot dot1 = new Dot();
			dot1.InputDot();
			dot1.OutputDot();

			Circle circle1 = new Circle();
			circle1.InputDot();
			circle1.OutputDot();
			circle1.InputCir();
			circle1.OutputCir();
			Console.WriteLine("Area circle: " + Math.Round(circle1.AreaCir), 2);

			Cylinder cylinder1 = new Cylinder();
			cylinder1.InputDot();
			cylinder1.OutputDot();
			cylinder1.InputCir();
			cylinder1.OutputCir();
			Console.WriteLine("Area circle: " + cylinder1.AreaCir);
			cylinder1.InputCyl();
			cylinder1.OutputCyl();
			Console.WriteLine("Volume cylinder: " + Math.Round(cylinder1.VolumeCyl(), 2));

			Cone cone1 = new Cone();
			cone1.InputDot();
			cone1.OutputDot();
			cone1.InputCir();
			cone1.OutputCir();
			Console.WriteLine("Area circle: " + Math.Round(cylinder1.AreaCir, 2));
			cone1.InputCone();
			cone1.OutputCone();
			Console.WriteLine("Volume cone: " + Math.Round(cone1.VolumeCone(), 2));

			Dot dot2 = new Dot(10, 5);
			dot2.OutputDot();
			Circle circle2 = new Circle(dot2.X, dot2.Y, 15);
			circle2.OutputCir();
			Console.WriteLine("Area circle: " + Math.Round(circle2.AreaCir), 2);
			Cylinder cylinder2 = new Cylinder(dot2.X, dot2.Y, circle2.Radius, 10);
			Console.WriteLine("Volume cylinder: " + Math.Round(cylinder2.VolumeCyl(), 2));
			Cone cone2 = new Cone(dot2.X, dot2.Y, circle2.Radius, 20);
			Console.WriteLine("Volume cone: " + Math.Round(cone2.VolumeCone(), 2));

		}
	}

}
