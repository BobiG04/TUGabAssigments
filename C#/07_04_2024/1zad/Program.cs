using System;

namespace _1zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
            Console.WriteLine("Enter the number of cars: ");
            int n = int.Parse(Console.ReadLine());
			Car[] cars = new Car[n];
			string command = "";

			// Input and Calculation
            for (int i = 0; command != "End";)
            {
				if (i <= cars.Length)
				{
					Console.Clear();
					Console.WriteLine("Currently inspecting subject {0}. Enter command:", i);
					Console.WriteLine("List of commands: \n Input \n Drive \n Next \n Prev \n End");
					command = Console.ReadLine();

					switch (command)
					{
						case "Input":
							cars[i] = new Car();
							cars[i].Input(cars[i]);
							Console.Clear();
							break;
						case "Drive":
							if (cars[i] != null)
							{
								cars[i].KMCalc(cars[i]);
								break;
							}
							else
							{
								Console.WriteLine("EROOOR No cars found. :'<");
								return;
							}
						case "Next": Console.Clear(); i++; break;
						case "Prev": Console.Clear(); i--; break;
						case "End":
							Console.Clear();
							break;
						default:
							Console.WriteLine("EROOR No command entered or something is not right. :/");
							break;
					}
				}
            }

            // Output
            for (int i = 0; i < cars.Length; i++)
            {
				if (cars[i] != null)
					cars[i].Output(cars[i]);
				else
				{
					Console.WriteLine("EROOR No car found");
					return;
				}
            }
        }
	}

	class Car
	{
		private string carModel;
		private double fuelAmount;
		private double fuelRatePer1KM;
		private double distance;

		public Car()
		{
			CarModel = "";
			FuelAmount = 0.0;
			FuelRatePer1KM = 0.0;
			Distance = 0.0;
		}

		public Car(string cM, double fA, double fRP1km, double d)
		{
			CarModel = cM;
			FuelAmount = fA;
			FuelRatePer1KM = fRP1km;
			Distance = d;
		}

		public string CarModel { 
			get { return carModel; }
			set { carModel = value; }
		}

		public double FuelAmount
		{
			get { return fuelAmount; }
			set { fuelAmount = value; }
		}

		public double FuelRatePer1KM
		{
			get { return fuelRatePer1KM; }
			set { fuelRatePer1KM = value;}
		}

		public double Distance
		{
			get { return distance; }
			set { distance = value; }
		}

		public void Input(in Car car)
		{
            Console.WriteLine("Enter car model: ");
			car.CarModel = Console.ReadLine();
            Console.WriteLine("Enter the amount of fuel the car can hold:");
            car.FuelAmount = double.Parse(Console.ReadLine());
            Console.WriteLine("Enter the fuel consumption per 1 km:");
            car.FuelRatePer1KM = double.Parse(Console.ReadLine());
        }

		public void KMCalc(in Car car)
		{
            Console.WriteLine("{0} {1}", car.CarModel, car.FuelRatePer1KM);
			double fuelConsumtion;

            // Logic if car can do it or not. 
			if (car.FuelAmount > 0.0)
			{
				// Lower fuel amount by fuelAmountUsed
				// Bump the distance up
				car.Distance = car.FuelAmount * car.FuelRatePer1KM;
				fuelConsumtion = car.Distance * car.fuelRatePer1KM;
				car.FuelAmount -= fuelConsumtion;
			} else
                Console.WriteLine("The car cannot be driven. Not enough fuel.");
		}

		public void Output(in Car car)
		{
            Console.WriteLine("Model: {0} Amount of fuel: {1} Distance traveled: {2}", car.CarModel, Math.Round(car.FuelAmount, 2), Math.Round(car.Distance, 2));
        }
	}
}
