namespace _3_3zad;

class Program
{
    public delegate int Sum(int a, int b);
    public delegate int Subtract(int a, int b);
    public delegate int Multiply(int a, int b);
    public delegate int Divide(int a, int b);

    static void Main(string[] args)
    {
        Sum sumNumbs = (int a, int b) => a + b;
        Subtract subNums = (int a, int b) => a - b;
        Multiply multNumbs = (int a, int b) => a * b;
        Divide divideNums = (int a, int b) => a / b;

        Sum sumNumbsAnonymous = delegate (int a, int b)
        {
            return a + b;
        };

        Subtract subNumsAnonymous = delegate (int a, int b)
        {
            return a - b;
        };

        Multiply multNumbsAnonymous = delegate (int a, int b)
        {
            return a * b;
        };

        Divide divideNumsAnonymous = delegate (int a, int b)
        {
            return a / b;
        };

        Console.WriteLine("""
            1. Add
            2. Subtract
            3. Multiply
            4. Divide
            """);
        Console.Write("Choose an operation: ");

        if (!int.TryParse(Console.ReadLine(), out int operation))
        {
            Console.WriteLine("Please enter a valid operation.");
            return;
        }

        if (operation < 1 || operation > 4)
        {
            Console.WriteLine("Please choose an operation from 1 to 4.");
            return;
        }

        Console.Write("Enter the first number: ");
        if (!int.TryParse(Console.ReadLine(), out int firstNumber))
        {
            Console.WriteLine("Please enter a valid first number.");
            return;
        }

        Console.Write("Enter the second number: ");
        if (!int.TryParse(Console.ReadLine(), out int secondNumber))
        {
            Console.WriteLine("Please enter a valid second number.");
            return;
        }

        switch (operation)
        {
            case 1:
                Console.WriteLine($"Lambda result: {sumNumbs(firstNumber, secondNumber)}");
                Console.WriteLine($"Anonymous method result: {sumNumbsAnonymous(firstNumber, secondNumber)}");
                break;

            case 2:
                Console.WriteLine($"Lambda result: {subNums(firstNumber, secondNumber)}");
                Console.WriteLine($"Anonymous method result: {subNumsAnonymous(firstNumber, secondNumber)}");
                break;

            case 3:
                Console.WriteLine($"Lambda result: {multNumbs(firstNumber, secondNumber)}");
                Console.WriteLine($"Anonymous method result: {multNumbsAnonymous(firstNumber, secondNumber)}");
                break;

            case 4:
                if (secondNumber == 0)
                {
                    Console.WriteLine("Division by zero is not allowed.");
                    break;
                }

                Console.WriteLine($"Lambda result: {divideNums(firstNumber, secondNumber)}");
                Console.WriteLine($"Anonymous method result: {divideNumsAnonymous(firstNumber, secondNumber)}");
                break;

            default:
                break;
        }
    }
}
