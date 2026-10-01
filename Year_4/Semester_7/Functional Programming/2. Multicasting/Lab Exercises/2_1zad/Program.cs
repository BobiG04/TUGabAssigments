namespace _2_1zad
{
    class Program
    {
        public static void Main()
        {
            ExampleOperation operation = new ExampleOperation();
            
            ExampleOperation.DelCalculation sum = operation.Sum;
            ExampleOperation.DelCalculation subtract = operation.Subtract;
            ExampleOperation.DelCalculation multiply = operation.Multiply;
            ExampleOperation.DelCalculation devide = operation.Devide;
            ExampleOperation.DelCalculation multicast = sum;

            double a, b;

            Console.WriteLine("Write the a number: ");
            a = double.Parse(Console.ReadLine()!);
            Console.WriteLine("Write the b number: ");
            b = double.Parse(Console.ReadLine()!);

            multicast += subtract;
            multicast += multiply;
            multicast += devide;
            multicast(a, b);
        }
    }
}