using System;

namespace KursRab
{
	public class Hotel
	{

		protected string name;
		protected string address;
		protected double[] gpsCoords = new double[2];
		protected string[] events = new string[5];
		protected string[] eventDates = new string[5];

		public Hotel()
		{
			name = "";
			address = "";
			gpsCoords[0] = 0.0;
			gpsCoords[1] = 0.0;
		}

		public Hotel(string n, string a, double gps1, double gps2)
		{
			this.name = n;
			this.address = a;
			this.gpsCoords[0] = gps1;
			this.gpsCoords[1] = gps2;
		}

		public string Name
		{
			get { return name; }
			set { name = value; }
		}

		public string Address { 
			get { return address; } 
			set {  address = value; } 
		}

		public double[] GpsCoords
		{
			get { return gpsCoords; }
			set { gpsCoords = value; }
		}

		public void Input()
		{
            Console.WriteLine("Enter the hotel name:");
            Name = Console.ReadLine();
            Console.WriteLine("Enter the hotel address:");
			Address = Console.ReadLine();
            Console.WriteLine("Enter the hotel gps coordinate on x:");
			GpsCoords[0] = double.Parse(Console.ReadLine());
            Console.WriteLine("Enter the hotel gps coordinate on y:");
			GpsCoords[1] = double.Parse(Console.ReadLine());
		}

		public void EventInput(int arrNumb)
		{
            Console.WriteLine("Enter the event title:");
            events[arrNumb] = Console.ReadLine();
            Console.WriteLine("Enter the event date:");
			eventDates[arrNumb] = Console.ReadLine();
		}

		public string Output()
		{
			return String.Join(" ", name, address, gpsCoords[0], gpsCoords[1]);
        }

		public void EventOutput (int arrNumb)
		{
			Console.WriteLine("Current events at " + arrNumb + " hotel.");
			Console.WriteLine(String.Join(" ", events[arrNumb], eventDates[arrNumb]));
		}

		public static string FindHotel(string hotelName, Hotel hotel)
		{
			if (hotelName == hotel.Name)
			{
				return String.Join(" ", hotel.name, hotel.address, hotel.GpsCoords[0], hotel.GpsCoords[1]);
			} else
			{
				return " ";
			}
		}

	}
}
