using System;
using System.Collections.Generic;
using System.Linq;

namespace _2zad
{
    class Vehicle
    {
        public string Type { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public int Horsepower { get; set; }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            List<Vehicle> vehicles = new List<Vehicle>();
            string input;

            // Събиране на автомобили в каталога
            while ((input = Console.ReadLine()) != "Край")
            {
                string[] data = input.Split(' ');
                // Правим първата буква главна за по-красив изход (Кола / Камион)
                string type = char.ToUpper(data[0][0]) + data[0].Substring(1).ToLower();
                string model = data[1];
                string color = data[2];
                int hp = int.Parse(data[3]);

                vehicles.Add(new Vehicle { Type = type, Model = model, Color = color, Horsepower = hp });
            }

            // Търсене на специфични модели
            while ((input = Console.ReadLine()) != "Затваряне на каталога")
            {
                string modelToFind = input;
                Vehicle found = vehicles.FirstOrDefault(v => v.Model == modelToFind);
                
                if (found != null)
                {
                    Console.WriteLine($"Тип: {found.Type}");
                    Console.WriteLine($"Модел: {found.Model}");
                    Console.WriteLine($"Цвят: {found.Color}");
                    Console.WriteLine($"Конски сили: {found.Horsepower}");
                }
            }

            // Изчисляване на средни конски сили (с проверка дали има въведени такива типове)
            double carsAvgHp = 0.0;
            var cars = vehicles.Where(v => v.Type == "Кола").ToList();
            if (cars.Count > 0) 
            {
                carsAvgHp = cars.Average(c => c.Horsepower);
            }

            double trucksAvgHp = 0.0;
            var trucks = vehicles.Where(v => v.Type == "Камион").ToList();
            if (trucks.Count > 0) 
            {
                trucksAvgHp = trucks.Average(t => t.Horsepower);
            }

            Console.WriteLine($"Коли имат средна конска сила от {carsAvgHp:F2}.");
            Console.WriteLine($"Камиони имат средна конска сила от {trucksAvgHp:F2}.");
        }
    }
}