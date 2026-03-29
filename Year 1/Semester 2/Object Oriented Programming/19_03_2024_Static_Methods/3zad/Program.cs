using System;

namespace _3zad
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Complex numb1 = new Complex();
            Complex numb2 = new Complex();

            Console.WriteLine("--- Number 1 ---");
            numb1.Input();
            
            Console.WriteLine("--- Number 2 ---");
            numb2.Input();

            Console.WriteLine("\n--- Summing (Static Method) ---");
            Complex.SumStatic(numb1, numb2);

            Console.WriteLine("\n--- Summing (Instance Method) ---");
            // Добавяме numb2 към numb1 чрез метода на екземпляра
            numb1.SumInstance(numb2); 
        }
    }

    class Complex
    {
        double real;
        double imag;

        public void Input()
        {
            Console.Write("Enter real part: ");
            real = double.Parse(Console.ReadLine());
            Console.Write("Enter imaginary part: ");
            imag = double.Parse(Console.ReadLine());
        }

        public void Output()
        {
            Console.WriteLine("Value: " + real + " + j" + imag);
        }

        // 1. Статичен метод
        public static void SumStatic(Complex a, Complex b)
        {
            double realPlus = a.real + b.real;
            double imagPlus = a.imag + b.imag;
            Console.WriteLine("The static sum is: " + realPlus + " + j" + imagPlus);
        }

        // 2. Метод на екземпляра (променя текущия обект)
        public void SumInstance(Complex otherNumb)
        {
            this.real += otherNumb.real;
            this.imag += otherNumb.imag;
            Console.WriteLine("The instance sum (updated current object) is: " + this.real + " + j" + this.imag);
        }
    }
}