using System;

namespace KursRab
{
	public class Program
	{
		static void Main(string[] args)
		{
			Hotel[] hotels = new Hotel[5];
            Console.WriteLine("List of commands: \n Input \n Output \n Event Input \n Event Output \n Check Hotel \n End");
            string command = Console.ReadLine();

            while (command != "End") {
				switch (command)
				{
					case "Input":
						Console.Clear();
						for (int i = 0; i < hotels.Length; i++)
						{
							hotels[i] = new Hotel();
							hotels[i].Input();
						}
						Console.WriteLine("List of commands: \n Input \n Output \n Event Input \n Event Output \n Check Hotel \n End");
						command = Console.ReadLine();
						break;
					case "Output":
						Console.Clear();
						for (int i = 0; i < hotels.Length; i++)
						{
							Console.WriteLine(hotels[i].Output());
                        }
						Console.WriteLine("List of commands: \n Input \n Output \n Event Input \n Event Output \n Check Hotel \n End");
						command = Console.ReadLine();
						break;
					case "Event Input":
						Console.Clear();
						for (int i = 0; i < hotels.Length; i++)
						{
							hotels[i].EventInput(i);
						}
						Console.WriteLine("List of commands: \n Input \n Output \n Event Input \n Event Output \n Check Hotel \n End");
						command = Console.ReadLine();
						break;
					case "Event Output":
						Console.Clear();
						for (int i = 0; i < hotels.Length; i++)
						{
							hotels[i].EventOutput(i);
						}
						Console.WriteLine("List of commands: \n Input \n Output \n Event Input \n Event Output \n Check Hotel \n End");
						command = Console.ReadLine();
						break;
					case "Check Hotel":
						Console.Clear();
						string hotelName = "";
						Console.WriteLine("Enter the name of the hotel:");
						hotelName = Console.ReadLine();
						for (int i = 0; i < hotels.Length; i++)
						{
							Console.WriteLine(Hotel.FindHotel(hotelName, hotels[i]));
						}
						Console.WriteLine("List of commands: \n Input \n Output \n Event Input \n Event Output \n Check Hotel \n End");
						command = Console.ReadLine();
						break;
					case "End":
						return;
					default:
						Console.Clear();
                        Console.WriteLine("Command not found!");
						Console.WriteLine("List of commands: \n Input \n Output \n Event Input \n Event Output \n Check Hotel \n End");
						command = Console.ReadLine();
						break;
                }
			}

            // Western Cave Resort 4263 Cameron Road 217,23 35,28
            // Sunrise Shroud Hotel 755 Barrington Court 259,27 52,76
            // Ancient Shore Hotel & Spa 746 Marion Drive 176,34 43,27
            // Nimbus Resort 1873 Emma Street 201,47 32,14
            // Mirage Hotel 3348 Skinner Hollow Road 304,17 34,78
        }
	}
}
