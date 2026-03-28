using System;

namespace _2zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			Console.WriteLine("Enter the number of cars in the catalouge: ");
			int n = int.Parse(Console.ReadLine());
			if (n > 50)
			{
				Console.Clear();
				Console.WriteLine("Too many vehicles");
				return;
			}
			Console.Clear();
			string command = "";
			Catalouge[] catalouges = new Catalouge[n];

			// Input
			for (int i = 0; i <= catalouges.Length; i++)
			{
				if (command != "End")
				{
					catalouges[i] = new Catalouge();
					catalouges[i].Input(catalouges);
					Console.WriteLine("Enter command:");
					Console.WriteLine("List of commands: \n Next \n End");
					command = Console.ReadLine();
					Console.Clear();
				}
				else if (command == "End")
				{
					break;
				} else
				{
					Console.Clear();
					Console.WriteLine("Unknown command.");
					return;
				}
			}

            // Output
            for (int i = 0; ; i++)
            {
                if(i < catalouges.Length)
				{
					if (catalouges[i] != null)
					{
						Console.WriteLine("\n Type: {0} \n Model: {1} \n Color: {2} \n Horse power: {3}", catalouges[i].TypeOfVehicle, catalouges[i].Model, catalouges[i].Color, catalouges[i].HorsePower);
					}
				} else
				{
					Console.WriteLine("\n Enter command:");
					Console.WriteLine(" List of commands: \n Close catalouge \n End");
					command = Console.ReadLine();
					if (command == "Close catalouge")
					{
                        Console.WriteLine("\n The avarage horse power is: \n for cars: {0} \n for trucks: {1}", Catalouge.CalAvr(catalouges,"Car"), Catalouge.CalAvr(catalouges, "Truck"));
						return;
                    }
					else if (command == "End")
						return;
					else
					{
						Console.Clear();
						Console.WriteLine("Unknown command.");
						return;
					}
                }
            }
        }
	}

	class Catalouge
	{
		private string typeOfVehicle;
		private string model;
		private string color;
		private int horsePower;

		public Catalouge()
		{
			typeOfVehicle = "";
			model = "";
			color = "";
			horsePower = 0;
		}

		public string TypeOfVehicle 
		{
			get { return typeOfVehicle; } 
			set {  typeOfVehicle = value; }
		}

		public string Model
		{
			get { return model; } 
			set { model = value; }
		}

		public string Color
		{
			get { return color; } 
			set { color = value; }
		}

		public int HorsePower
		{
			get { return horsePower; }
			set { horsePower = value; }
		}

		public void Input(Catalouge[] catalouges)
		{

			Console.WriteLine("Enter the type of vehicle:");
			TypeOfVehicle = Console.ReadLine();
			if (typeOfVehicle == "Car" ^ typeOfVehicle == "Truck")
			{
				Console.WriteLine("Enter it's model:");
				Model = Console.ReadLine();
                for (int i = 0; i < catalouges.Length; i++)
                {
                    if (Model == catalouges[i].Model)
                    {
                        Console.WriteLine("Two same models cannot exist.");
						Model = "";
                    }
                }
                Console.WriteLine("Enter it's color:");
				Color = Console.ReadLine();
				Console.WriteLine("Enter it's horse power:");
				HorsePower = int.Parse(Console.ReadLine());
				Console.Clear();
			}
			else
			{
				Console.Clear();
				Console.WriteLine("Vehicle not supported...");
				Thread.Sleep(4000);
				Console.Clear();
			}

		}

		public static int CalAvr(Catalouge[] catalouges, string type)
		{
			int VehicleSum = 0;

			if (catalouges != null && type == "Car")
			{

				for (int i = 0; i < catalouges.Length; i++)
				{
					if (catalouges[i].TypeOfVehicle == "Car")
						VehicleSum += catalouges[i].HorsePower;
				}

				return VehicleSum / (catalouges.Length + 1);

			} else if (catalouges != null && type == "Truck")
			{

				for (int i = 0; i < catalouges.Length; i++)
				{
					if (catalouges[i].TypeOfVehicle == "Truck")
						VehicleSum += catalouges[i].HorsePower;

				}

				return VehicleSum / (catalouges.Length + 1);

			} else
				return 0;
        }
	}
}
