using System.Globalization;

namespace _2_3zad;

class Program
{
    static void Main()
    {
        Func<double, double, double, string> parallelepipedVol = (a, b, c) => $"{a * b * c} cm³";
        //    in      in      in      out
        Func<double, double, string> coneVol = (r, h) => $"{(1d / 3d) * Math.PI * Math.Pow(r, 2d) * h} cm³";
        //    in      in      out
        Func<double, double, double, string> rectPyramidVol = (a, b, h) => $"{(1d / 3d) * a * b * h} cm³";
        Func<double, double, string> cylinderVol = (r, h) => $"{Math.PI * Math.Pow(r, 2d) * h} cm³";

        while (true)
        {
            Console.WriteLine(
                "\nChoose a solid to calculate:\n" +
                "1. Parallelepiped\n" +
                "2. Rectangular pyramid\n" +
                "3. Cone\n" +
                "4. Cylinder\n" +
                "5. End");

            string? command = Console.ReadLine();

            if (command is "5" or "End" or null or "")
            {
                return;
            }

            string volume;
            string solidName;

            switch (command)
            {
                case "1":
                case "Parallelepiped":
                    double a = ReadMeasurement("a");
                    double b = ReadMeasurement("b");
                    double c = ReadMeasurement("c");
                    volume = parallelepipedVol(a, b, c);
                    solidName = "parallelepiped";
                    break;
                case "2":
                case "Rectangular pyramid":
                    double pyramidA = ReadMeasurement("a");
                    double pyramidB = ReadMeasurement("b");
                    double pyramidH = ReadMeasurement("h");
                    volume = rectPyramidVol(pyramidA, pyramidB, pyramidH);
                    solidName = "rectangular pyramid";
                    break;
                case "3":
                case "Cone":
                    double coneR = ReadMeasurement("r");
                    double coneH = ReadMeasurement("h");
                    volume = coneVol(coneR, coneH);
                    solidName = "cone";
                    break;
                case "4":
                case "Cylinder":
                    double cylinderR = ReadMeasurement("r");
                    double cylinderH = ReadMeasurement("h");
                    volume = cylinderVol(cylinderR, cylinderH);
                    solidName = "cylinder";
                    break;
                default:
                    Console.WriteLine("Unknown command.");
                    continue;
            }

            Console.WriteLine($"The volume of the {solidName} is {volume}.");
        }
    }

    static double ReadMeasurement(string name)
    {
        while (true)
        {
            Console.Write($"Input measurement {name}: ");
            string? input = Console.ReadLine()?.Replace(',', '.');

            if (double.TryParse(input, NumberStyles.Float, CultureInfo.InvariantCulture, out double value) &&
                value >= 0)
            {
                return value;
            }

            Console.WriteLine("Please enter a non-negative number.");
        }
    }
}
