using System;
using System.Collections.Generic;
using System.Linq;
using System.Globalization;

namespace _1_1_2zad
{
    class Program
    {
        public static void Main()
        {
            ExampleOperation example = new ExampleOperation();
            ExampleOperation.DelCalculation calculation;

            string? command;
            double a, b;

            while (true)
            {
                Console.WriteLine("Choose a command to calculate: \n 1. Sum \n 2. Subtract \n 3. Multiply \n 4. Devide \n 5. End");

                command = Console.ReadLine();

                switch (command)
                {
                    case "Sum" or "1":
                        InputValues(out a, out b);
                        calculation = new ExampleOperation.DelCalculation(example.Sum);
                        calculation.Invoke(a, b);
                        break;
                    case "Subtract" or "2":
                        InputValues(out a, out b);
                        calculation = new ExampleOperation.DelCalculation(example.Subtract);
                        calculation.Invoke(a, b);
                        break;
                    case "Multiply" or "3":
                        InputValues(out a, out b);
                        calculation = new ExampleOperation.DelCalculation(example.Multiply);
                        calculation.Invoke(a, b);
                        break;
                    case "Devide" or "4":
                        InputValues(out a, out b);
                        calculation = new ExampleOperation.DelCalculation(example.Devide);
                        calculation.Invoke(a, b);
                        break;
                    case "End" or "5" or null or "":
                        return;
                    default:
                        break;
                }
            }

            void InputValues(out double a, out double b)
            {
                Console.WriteLine("Input the a number:\n a = ");
                a = ParseNumber(Console.ReadLine());
                Console.WriteLine("Input the b number:\n b = ");
                b = ParseNumber(Console.ReadLine());
            }

            double ParseNumber(string? input)
            {
                input = input?.Replace(',', '.');
                return double.Parse(input!, CultureInfo.InvariantCulture);
            }
        }


    }
}