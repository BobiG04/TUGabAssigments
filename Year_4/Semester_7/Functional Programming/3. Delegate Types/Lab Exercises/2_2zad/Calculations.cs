using System;

namespace _2_2zad;

public class Calculations
{
    public void Sum(double a, double b) => Console.WriteLine($"{a} + {b} = {a + b}");

    public void Subtract(double a, double b) => Console.WriteLine($"{a} - {b} = {a - b}");

    public void Multiply(double a, double b) => Console.WriteLine($"{a} * {b} = {a * b}");

    public void Devide(double a, double b)
    {
        if (b == 0)
        {
            Console.WriteLine("You cannot devide by zero.");
            return;
        }

        Console.WriteLine($"{a} / {b} = {a / b}");
    }

    /*
    
    public void Devide(double a, double b) =>
    Console.WriteLine(
        b == 0
            ? "You cannot devide by zero."
            : $"{a} / {b} = {a / b}");

    */
}
