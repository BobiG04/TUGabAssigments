using System;
using System.Drawing;

namespace _1_1_1zad
{
    public delegate void Transform2D(double x, double y);
    public delegate void Quaternion(double angle);

    public class PointDelegate
    {
        private double x,y;

        public PointDelegate() { x = 0; y = 0; }
        public PointDelegate(double x, double y) {this.x = x; this.y = y;}

        public void SetPosition(double x, double y) { this.x = x; this.y = y; }
        public void Print() { Console.WriteLine($" Current position: ({x:F2}, {y:F2})"); }

        public void Translate(double dx, double dy)
        {
            x += dx;
            y += dy;
            Console.WriteLine($"\n Translation: ({dx}, {dy})");
        }

        public void Scale(double scaleX, double scaleY)
        {
            x *= scaleX;
            y *= scaleY;
            Console.WriteLine($"\n Scaling: ({scaleX}, {scaleY})");
        }

        public void Rotate(double angleInDegrees)
        {
            double angleInRadians = angleInDegrees * (Math.PI / 180.0);
            double cosTheta = Math.Cos(angleInRadians);
            double sinTheta = Math.Sin(angleInRadians);

            double newX = x * cosTheta - y * sinTheta;
            double newY = x * sinTheta + y * cosTheta;

            x = newX;
            y = newY;
            Console.WriteLine($"\n Rotating {angleInDegrees} degrees.");
        }
    }
}
