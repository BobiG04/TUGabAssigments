namespace _3_4zad;

class Program
{
    public delegate double Function(double x);
    static void Main(string[] args)
    {
        Function func1 = (double x) => Math.Pow(x, 2) + 4 * x - 5;
        Function func2 = (double x) => Math.Pow(x, 3) - Math.Pow(x, 2) + 2 * x + 6;
        Function func3 = (double x) => x > 0
            ? (3 * Math.Pow(x, 2) - 1) / Math.Sqrt(x)
            : 0;
        Function func4 = (double x) => x <= 0
            ? 2
            : x < 1
                ? x + 2
                : x <= 2
                    ? 3
                    : x < 3
                        ? 5 - x
                        : 2;

        Function func1Anonymous = delegate (double x)
        {
            return Math.Pow(x, 2) + 4 * x - 5;
        };

        Function func2Anonymous = delegate (double x)
        {
            return Math.Pow(x, 3) - Math.Pow(x, 2) + 2 * x + 6;
        };

        Function func3Anonymous = delegate (double x)
        {
            if (x <= 0)
            {
                return 0;
            }

            return (3 * Math.Pow(x, 2) - 1) / Math.Sqrt(x);
        };

        Function func4Anonymous = delegate (double x)
        {
            if (x <= 0)
            {
                return 2;
            }

            if (x < 1)
            {
                return x + 2;
            }

            if (x <= 2)
            {
                return 3;
            }

            if (x < 3)
            {
                return 5 - x;
            }

            return 2;
        };

        Console.Write("Enter x: ");
        if (!double.TryParse(Console.ReadLine(), out double x))
        {
            Console.WriteLine("Please enter a valid number.");
            return;
        }

        Console.WriteLine($"F1 lambda: {func1(x)}");
        Console.WriteLine($"F1 anonymous method: {func1Anonymous(x)}");
        Console.WriteLine($"F2 lambda: {func2(x)}");
        Console.WriteLine($"F2 anonymous method: {func2Anonymous(x)}");
        Console.WriteLine($"F3 lambda: {func3(x)}");
        Console.WriteLine($"F3 anonymous method: {func3Anonymous(x)}");
        Console.WriteLine($"F4 lambda: {func4(x)}");
        Console.WriteLine($"F4 anonymous method: {func4Anonymous(x)}");
    }
}
