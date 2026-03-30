using System;

namespace _1zad
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Dot dot1 = new Dot();
            Dot dot2 = new Dot();
            Dot dot3 = new Dot();

            Console.WriteLine("--- Dot 1 ---");
            dot1.Input();
            
            Console.WriteLine("--- Dot 2 ---");
            dot2.Input();
            
            Console.WriteLine("--- Dot 3 ---");
            // Демонстрация на новия метод за въвеждане с параметри
            dot3.InputValues(5, 10);

            Console.WriteLine("\n--- Coordinates ---");
            dot1.Output();
            dot2.Output();
            dot3.Output();

            Console.WriteLine("\n--- Distance (Static Method) ---");
            Console.WriteLine("Dot1 to Dot2: " + Dot.Distance(dot1, dot2));
            
            Console.WriteLine("\n--- Distance (Instance Method) ---");
            // Демонстрация на новия метод на екземпляра
            Console.WriteLine("Dot2 to Dot3: " + dot2.DistanceTo(dot3));
            Console.WriteLine("Dot1 to Dot3: " + dot1.DistanceTo(dot3));
        }
    }

    class Dot
    {
        private int x, y;

        // 1. Метод за въвеждане без параметри (от конзолата)
        public void Input()
        {
            Console.Write("Enter x: ");
            x = int.Parse(Console.ReadLine());
            Console.Write("Enter y: ");
            y = int.Parse(Console.ReadLine());
        }

        // 2. Метод за въвеждане с параметри
        public void InputValues(int setX, int setY)
        {
            x = setX;
            y = setY;
            Console.WriteLine($"Automatically set to: {x}, {y}");
        }

        public void Output()
        {
            Console.WriteLine("Coordinates: " + x + ", " + y);
        }

        // 3. Статичен метод за разстояние
        public static double Distance(Dot a, Dot b)
        {
            int dx = a.x - b.x;
            int dy = a.y - b.y;
            double length = Math.Sqrt(dx * dx + dy * dy);
            return Math.Round(length, 2);
        }

        // 4. Метод на екземпляра за разстояние
        public double DistanceTo(Dot otherDot)
        {
            int dx = this.x - otherDot.x;
            int dy = this.y - otherDot.y;
            double length = Math.Sqrt(dx * dx + dy * dy);
            return Math.Round(length, 2);
        }
    }
}