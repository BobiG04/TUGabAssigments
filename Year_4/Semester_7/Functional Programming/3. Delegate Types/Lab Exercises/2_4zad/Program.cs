namespace _2_4zad;

class Program
{
    static void Main(string[] args)
    {
        Predicate<int> isOddOrEven = IsOddOrEven;

        Console.WriteLine("Enter a number: ");
        int n = Int32.Parse(Console.ReadLine());
        bool result = isOddOrEven(n);
        Console.WriteLine(result ? "The number is even." : "The number is odd.");
    }

    static bool IsOddOrEven(int n)
    {
        if (n % 2 == 0)
        {
            return true;
        }
        else
        {
            return false;
        }
    }
}
