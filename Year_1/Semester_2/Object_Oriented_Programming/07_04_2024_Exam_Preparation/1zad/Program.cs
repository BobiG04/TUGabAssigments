using System;
using System.Collections.Generic;
using System.Linq;

namespace _1zad
{
    class Car
    {
        public string Model { get; set; }
        public double FuelAmount { get; set; }
        public double FuelConsumptionPerKm { get; set; }
        public double DistanceTraveled { get; set; }

        public Car(string model, double fuelAmount, double fuelConsumptionPerKm)
        {
            Model = model;
            FuelAmount = fuelAmount;
            FuelConsumptionPerKm = fuelConsumptionPerKm;
            DistanceTraveled = 0.0; // Всички стартират от 0 км
        }

        public void Drive(double distance)
        {
            double neededFuel = distance * FuelConsumptionPerKm;

            // Проверка дали горивото е достатъчно
            if (FuelAmount >= neededFuel)
            {
                FuelAmount -= neededFuel;
                DistanceTraveled += distance;
            }
            else
            {
                Console.WriteLine("Недостатъчно гориво за движение");
            }
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            int n = int.Parse(Console.ReadLine());
            List<Car> cars = new List<Car>();

            // Въвеждане на първоначалните данни за колите
            for (int i = 0; i < n; i++)
            {
                string[] input = Console.ReadLine().Split(' ');
                string model = input[0];
                double fuelAmount = double.Parse(input[1]);
                double fuelConsumption = double.Parse(input[2]);
                
                cars.Add(new Car(model, fuelAmount, fuelConsumption));
            }

            // Четене на команди за шофиране
            string command;
            while ((command = Console.ReadLine()) != "Край")
            {
                string[] cmdArgs = command.Split(' ');
                if (cmdArgs[0] == "Карай")
                {
                    string model = cmdArgs[1];
                    double distance = double.Parse(cmdArgs[2]);

                    // Намираме колата по модел
                    Car carToDrive = cars.FirstOrDefault(c => c.Model == model);
                    if (carToDrive != null)
                    {
                        carToDrive.Drive(distance);
                    }
                }
            }

            // Извеждане на финалния резултат
            foreach (var car in cars)
            {
                Console.WriteLine($"{car.Model} {car.FuelAmount:F2} {car.DistanceTraveled}");
            }
        }
    }
}