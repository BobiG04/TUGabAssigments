using System;

namespace _6_4zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			int n = int.Parse(Console.ReadLine());
			double[] arr = new double[n];

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

            for (int i = 0; i < array.Length; i++)
            {
                sum += array[i];
            }

			avr = sum / array.Length;

        }
	}
}
