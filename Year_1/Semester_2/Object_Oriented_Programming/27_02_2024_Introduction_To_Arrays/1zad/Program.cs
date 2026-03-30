using System;

namespace Rows
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("How big is the array?");
            int n = int.Parse(Console.ReadLine());
            int[] RowArray = new int[n];

            for (int i = 0; i < n; i++)
            {
                Console.WriteLine("Enter an value to element " + i + ": ");
                RowArray[i] = int.Parse(Console.ReadLine());
            }

            Console.WriteLine("\nStraight:");
            Console.WriteLine(String.Join(" ", RowArray));
            
            Console.WriteLine("Backward:");
            for (int i = n - 1; i >= 0; i--)
            {
                Console.Write(RowArray[i] + " ");
            }
            Console.WriteLine();

            // ПОПРАВКА: Извеждане на елементите с четен индекс (0, 2, 4...)
            Console.WriteLine("Elements with even index:");
            for (int i = 0; i < n; i += 2)
            {
                Console.Write(RowArray[i] + " ");
            }
            Console.WriteLine();

            // ПОПРАВКА: Извеждане на елементите с нечетен индекс (1, 3, 5...)
            Console.WriteLine("Elements with odd index:");
            for (int i = 1; i < n; i += 2)
            {
                Console.Write(RowArray[i] + " ");
            }
            Console.WriteLine();
        }
    }
}