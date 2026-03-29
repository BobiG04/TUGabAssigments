using System;

namespace _2zad
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Dot d1 = new Dot();
            Dot d2 = new Dot();
            Dot d3 = new Dot();

            Console.WriteLine("--- Input Dot 1 ---");
            d1.Input();
            Console.WriteLine("--- Input Dot 2 ---");
            d2.Input();
            Console.WriteLine("--- Input Dot 3 ---");
            d3.Input();

            Console.WriteLine("\n--- Original Coordinates ---");
            d1.Output();
            d2.Output();
            d3.Output();

            // 1. Транслация
            Console.WriteLine("\n--- Translation ---");
            Console.Write("Enter Vx for translation: ");
            double vx = double.Parse(Console.ReadLine());
            Console.Write("Enter Vy for translation: ");
            double vy = double.Parse(Console.ReadLine());

            d1.Translation(vx, vy);
            d2.Translation(vx, vy);
            d3.Translation(vx, vy);

            // 2. Ротация
            Console.WriteLine("\n--- Rotation ---");
            Console.Write("Enter angle in degrees: ");
            double angle = double.Parse(Console.ReadLine());

            d1.Rotation(angle);
            d2.Rotation(angle);
            d3.Rotation(angle);

            // 3. Мащабиране
            Console.WriteLine("\n--- Scaling ---");
            Console.Write("Enter kX koefitsient: ");
            double kx = double.Parse(Console.ReadLine());
            Console.Write("Enter kY koefitsient: ");
            double ky = double.Parse(Console.ReadLine());

            d1.Bigger(kx, ky);
            d2.Bigger(kx, ky);
            d3.Bigger(kx, ky);
        }
    }

    public class Dot
    {
        // Използваме double за по-голяма прецизност при тригонометричните функции
        public double x;
        public double y;

        public void Input()
        {
            Console.Write("Enter x: ");
            x = double.Parse(Console.ReadLine());
            Console.Write("Enter y: ");
            y = double.Parse(Console.ReadLine());
        }

        public void Output()
        {
            Console.WriteLine($"Dot coordinates: ({Math.Round(x, 2)}, {Math.Round(y, 2)})");
        }

        public void Translation(double Vx, double Vy)
        {
            [cite_start]// ООП принцип: Променяме състоянието на самия обект (this) чрез събиране [cite: 569, 571]
            this.x = this.x + Vx;
            this.y = this.y + Vy;
            
            Console.Write("After translation - ");
            this.Output();
        }

        public void Rotation(double alphaDegrees)
        {
            // 1. Преобразуваме градусите в радиани (Math.Sin и Math.Cos работят само с радиани)
            double radians = alphaDegrees * Math.PI / 180.0;

            // 2. Пазим старите координати, за да не счупим изчислението за Y!
            double oldX = this.x;
            double oldY = this.y;

            [cite_start]// 3. Прилагаме ротационната матрица (формулите от условието) [cite: 574, 575]
            this.x = oldX * Math.Cos(radians) - oldY * Math.Sin(radians);
            this.y = oldX * Math.Sin(radians) + oldY * Math.Cos(radians);

            Console.Write($"After rotation by {alphaDegrees} degrees - ");
            this.Output();
        }

        public void Bigger(double kX, double kY)
        {
            [cite_start]// ООП принцип: Променяме координатите чрез умножение с мащабния коефициент [cite: 578]
            this.x = this.x * kX;
            this.y = this.y * kY;
            
            Console.Write("After scaling - ");
            this.Output();
        }
    }
}