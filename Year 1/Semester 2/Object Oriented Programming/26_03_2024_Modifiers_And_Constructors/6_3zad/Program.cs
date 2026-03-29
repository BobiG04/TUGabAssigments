using System;

namespace _6_3zad
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Enter number of triangles: ");
            int n = int.Parse(Console.ReadLine());
            Triangle[] tris = new Triangle[n];

            double p;
            double s;

            for (int i = 0; i < tris.Length; i++)
            {
                Console.WriteLine($"\n--- Triangle {i + 1} ---");
                tris[i] = new Triangle();
                tris[i].Input();
                
                // ПОПРАВКА: Методът се извиква чисто, без да му подаваме обекта
                tris[i].Calculations(out p, out s);
                
                if (p > 0) // Принтираме само ако триъгълникът е валиден
                {
                    Console.WriteLine("The perimeter and the area of triangle " + i + " is respectively " + p + " & " + s);
                }
            }
        }
    }

    class Triangle
    {
        private double a;
        private double b;
        private double c;
        private bool isTris;

        public Triangle()
        {
            a = 0.0; b = 0.0; c = 0.0; isTris = false;
        }

        public void Input()
        {
            Console.Write("Enter side a: ");
            a = double.Parse(Console.ReadLine());
            Console.Write("Enter side b: ");
            b = double.Parse(Console.ReadLine());
            Console.Write("Enter side c: ");
            c = double.Parse(Console.ReadLine());

            if (a + b > c && b + c > a && a + c > b)
            {
                isTris = true;
            }
            else
            {
                isTris = false;
            }
        }

        // ПОПРАВКА: Изчистена сигнатура - ползваме само out параметрите
        public void Calculations(out double p, out double s) 
        {
            p = 0.0;
            s = 0.0;
        
            if (this.isTris)
            {
                // ПОПРАВКА: Достъпваме директно полетата на текущия обект чрез this
                p = this.a + this.b + this.c;
                double halfp = p / 2.0;
                s = Math.Round(Math.Sqrt(halfp * (halfp - this.a) * (halfp - this.b) * (halfp - this.c)), 2);
            } 
            else
            {
                Console.WriteLine("ERROOOOR! Triangle is non-existant.");
            }
        }
    }
}