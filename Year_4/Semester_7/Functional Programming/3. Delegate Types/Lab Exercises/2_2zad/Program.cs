using System.Globalization;

namespace _2_2zad;

class Program
{
    static void Main()
    {
        var calculations = new Calculations();

        while (true)
        {
            Console.WriteLine("Choose a command to calculate: \n 1. Sum \n 2. Subtract \n 3. Multiply \n 4. Devide \n 5. End");

            string? command = Console.ReadLine();

            if (command is "End" or "5" or null or "")
            {
                return;
            }

            Action<double, double>? calAction = command switch
            {
                "Sum" or "1" => (a, b) => calculations.Sum(a, b),
                "Subtract" or "2" => (a, b) => calculations.Subtract(a, b),
                "Multiply" or "3" => (a, b) => calculations.Multiply(a, b),
                "Devide" or "4" => (a, b) => calculations.Devide(a, b),
                _ => null
            };

            if (calAction is null)
            {
                Console.WriteLine("Unknown command.");
                continue;
            }

            InputValues(out double a, out double b);
            calAction(a, b);
        }
    }

    static void InputValues(out double a, out double b)
    {
        Console.WriteLine("Input the a number:\n a = ");
        a = ParseNumber(Console.ReadLine());
        Console.WriteLine("Input the b number:\n b = ");
        b = ParseNumber(Console.ReadLine());
    }

    static double ParseNumber(string? input)
    {
        input = input?.Replace(',', '.');
        return double.Parse(input!, CultureInfo.InvariantCulture);
    }

}
