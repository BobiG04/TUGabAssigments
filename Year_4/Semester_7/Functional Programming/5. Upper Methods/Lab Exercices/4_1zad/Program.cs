namespace _4_1zad;

class Program
{
    public delegate double Operation(double firstNumber, double secondNumber);

    static void Main()
    {
        Console.Write("Enter the first number: ");
        if (!double.TryParse(Console.ReadLine(), out double firstNumber))
        {
            Console.WriteLine("Please enter a valid first number.");
            return;
        }

        Console.Write("Enter the second number: ");
        if (!double.TryParse(Console.ReadLine(), out double secondNumber))
        {
            Console.WriteLine("Please enter a valid second number.");
            return;
        }

        if (secondNumber == 0)
        {
            Console.WriteLine("Division by zero will be skipped.");
        }

        Console.WriteLine("\nUsing a custom delegate and named methods:");
        Operation addOperation = Add;
        Operation subtractOperation = Subtract;
        Operation multiplyOperation = Multiply;
        Operation divideOperation = Divide;

        DisplayResult(addOperation, "+", firstNumber, secondNumber);
        DisplayResult(subtractOperation, "-", firstNumber, secondNumber);
        DisplayResult(multiplyOperation, "*", firstNumber, secondNumber);
        DisplayDivisionResult(divideOperation, "/", firstNumber, secondNumber);

        Console.WriteLine("\nUsing Func and named methods:");
        Func<double, double, double> add = Add;
        Func<double, double, double> subtract = Subtract;
        Func<double, double, double> multiply = Multiply;
        Func<double, double, double> divide = Divide;

        DisplayResult(add, "+", firstNumber, secondNumber);
        DisplayResult(subtract, "-", firstNumber, secondNumber);
        DisplayResult(multiply, "*", firstNumber, secondNumber);
        DisplayDivisionResult(divide, "/", firstNumber, secondNumber);

        Console.WriteLine("\nUsing Func and lambda functions:");
        Func<double, double, double> addLambda = (first, second) => first + second;
        Func<double, double, double> subtractLambda = (first, second) => first - second;
        Func<double, double, double> multiplyLambda = (first, second) => first * second;
        Func<double, double, double> divideLambda = (first, second) => first / second;

        DisplayResult(addLambda, "+", firstNumber, secondNumber);
        DisplayResult(subtractLambda, "-", firstNumber, secondNumber);
        DisplayResult(multiplyLambda, "*", firstNumber, secondNumber);
        DisplayDivisionResult(divideLambda, "/", firstNumber, secondNumber);
    }

    static void DisplayResult(
        Operation operation,
        string operationSymbol,
        double firstNumber,
        double secondNumber)
    {
        double result = operation(firstNumber, secondNumber);
        Console.WriteLine($"{firstNumber} {operationSymbol} {secondNumber} = {result}");
    }

    static void DisplayResult(
        Func<double, double, double> operation,
        string operationSymbol,
        double firstNumber,
        double secondNumber)
    {
        double result = operation(firstNumber, secondNumber);
        Console.WriteLine($"{firstNumber} {operationSymbol} {secondNumber} = {result}");
    }

    static void DisplayDivisionResult(
        Operation operation,
        string operationSymbol,
        double firstNumber,
        double secondNumber)
    {
        if (secondNumber != 0)
        {
            DisplayResult(operation, operationSymbol, firstNumber, secondNumber);
        }
    }

    static void DisplayDivisionResult(
        Func<double, double, double> operation,
        string operationSymbol,
        double firstNumber,
        double secondNumber)
    {
        if (secondNumber != 0)
        {
            DisplayResult(operation, operationSymbol, firstNumber, secondNumber);
        }
    }

    static double Add(double firstNumber, double secondNumber) =>
        firstNumber + secondNumber;

    static double Subtract(double firstNumber, double secondNumber) =>
        firstNumber - secondNumber;

    static double Multiply(double firstNumber, double secondNumber) =>
        firstNumber * secondNumber;

    static double Divide(double firstNumber, double secondNumber) =>
        firstNumber / secondNumber;
}
