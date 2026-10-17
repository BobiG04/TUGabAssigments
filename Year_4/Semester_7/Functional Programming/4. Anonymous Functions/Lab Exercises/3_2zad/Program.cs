namespace _3_2zad;

class Program
{
    public delegate double SquareArea(double a);
    public delegate double RectArea(double a, double b);
    public delegate double CircleArea(double r);
    public delegate double RhombusArea(double a, double h);
    public delegate double ParallelogramArea(double a, double b, double alpha);

    static void Main(string[] args)
    {
        SquareArea sa = (double a) => Math.Pow(a, 2);
        RectArea ra = (double a, double b) => a * b;
        CircleArea ca = (double r) => Math.PI * Math.Pow(r, 2);
        RhombusArea rha = (double a, double h) => a * h;
        ParallelogramArea pa = (double a, double b, double alpha) => a * b * Math.Sin(alpha);

        SquareArea saObj = delegate (double a)
        {
            return Math.Pow(a, 2);
        };

        RectArea raObj = delegate (double a, double b)
        {
            return a * b;
        };

        CircleArea caObj = delegate (double r)
        {
            return Math.PI * Math.Pow(r, 2);
        };

        RhombusArea rhaObj = delegate (double a, double h)
        {
            return a * h;
        };

        ParallelogramArea paObj = delegate (double a, double b, double alpha)
        {
            return a * b * Math.Sin(alpha);
        };

        Console.WriteLine("Choose a figure: \n 1. Square \n 2. Rectangle \n 3. Circle \n 4. Rhombus \n 5. Parallelogram \n Figure:");

        int figure = int.Parse(Console.ReadLine()!);

        switch (figure)
        {
            case 1:
                Console.WriteLine("Side: ");
                double squareSide = double.Parse(Console.ReadLine()!);
                Console.WriteLine($"Lambda: {sa(squareSide)}");
                Console.WriteLine($"Anonymous: {saObj(squareSide)}");
                break;

            case 2:
                Console.WriteLine("Length: ");
                double rectangleLength = double.Parse(Console.ReadLine()!);
                Console.WriteLine("Width: ");
                double rectangleWidth = double.Parse(Console.ReadLine()!);
                Console.WriteLine($"Lambda: {ra(rectangleLength, rectangleWidth)}");
                Console.WriteLine($"Anonymous: {raObj(rectangleLength, rectangleWidth)}");
                break;

            case 3:
                Console.WriteLine("Radius: ");
                double radius = double.Parse(Console.ReadLine()!);
                Console.WriteLine($"Lambda: {ca(radius)}");
                Console.WriteLine($"Anonymous: {caObj(radius)}");
                break;

            case 4:
                Console.WriteLine("Side: ");
                double rhombusSide = double.Parse(Console.ReadLine()!);
                Console.WriteLine("Height: ");
                double rhombusHeight = double.Parse(Console.ReadLine()!);
                Console.WriteLine($"Lambda: {rha(rhombusSide, rhombusHeight)}");
                Console.WriteLine($"Anonymous: {rhaObj(rhombusSide, rhombusHeight)}");
                break;

            case 5:
                Console.WriteLine("Side: ");
                double parallelogramSide = double.Parse(Console.ReadLine()!);
                Console.WriteLine("Second side: ");
                double parallelogramSecondSide = double.Parse(Console.ReadLine()!);
                Console.WriteLine("Angle in radians: ");
                double angle = double.Parse(Console.ReadLine()!);
                Console.WriteLine($"Lambda: {pa(parallelogramSide, parallelogramSecondSide, angle)}");
                Console.WriteLine($"Anonymous: {paObj(parallelogramSide, parallelogramSecondSide, angle)}");
                break;

            default:
                Console.WriteLine("Invalid figure.");
                break;
        }
    }
}
