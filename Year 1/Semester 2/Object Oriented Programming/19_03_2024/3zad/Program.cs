using System;

namespace _3zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			Complex numb1 = new Complex();
			Complex numb2 = new Complex();

			numb1.Input();
			numb2.Input();

			Complex.Output(numb1, numb2);
		}
	}

	class Complex
	{
		double real;
		double imag;

		public void Input ()
		{
			real = double.Parse(Console.ReadLine());
			imag = double.Parse(Console.ReadLine());
		}

		public static void Output (Complex numb1, Complex numb2)
		{
			double realPlus = numb1.real + numb2.real;
			double imagPlus = numb1.imag + numb2.imag;

            Console.WriteLine("The equasion is: " + realPlus + " + j" + imagPlus);
        }
	}
}
