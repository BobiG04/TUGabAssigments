using System;

namespace _6_4zad
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Enter number of elements: ");
            int n = int.Parse(Console.ReadLine());
            double[] arr = new double[n];

            // ПОПРАВКА: Въвеждаме реалните стойности в масива преди изчисленията
            for (int i = 0; i < n; i++)
            {
                Console.Write($"Element {i + 1}: ");
                arr[i] = double.Parse(Console.ReadLine());
            }

            double sum;
            double avr;

            Calcuation.Calc(out sum, out avr, arr);

            Console.WriteLine("The sum of all elements is: " + sum);
            Console.WriteLine("The avarage of all elements is: " + avr);
        }
    }

    public class Calcuation
    {
        public static void Calc(out double sum, out double avr, params double[] array) 
        { 
            sum = 0.0;
            avr = 0.0;

            // Защита, ако масивът е празен
            if (array.Length == 0) return; 

            for (int i = 0; i < array.Length; i++)
            {
                sum += array[i];
            }

            avr = Math.Round(sum / array.Length, 2);
        }
    }
}