using System;
using System.Xml.Schema;

namespace _3zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			Battery batteryInfo = new Battery("Li-Ion", 200, 10);
			Display displayInfo = new Display(5.5, "16M");

			Phone phone1 = new Phone("iPhone 12", "Apple", 1200, "John Doe", batteryInfo, displayInfo);

			string[] calledNumbers = { "0888123456", "0899123456", "0287654321" };
			phone1.CallNumbs(calledNumbers);
		}
	}

	class Phone
	{
		private string model;
		private string manufacturer;
		private double price;
		private string owner;
		private Battery battery;
		private Display display;

		public Phone()
		{
			model = null;
			manufacturer = null;
			price = 0.0;
			owner = null;
			battery = null;
			display = null;
		}
		public Phone(string m, string man, double p, string o, Battery b, Display d)
		{
			model = m;
			manufacturer = man;
			price = p;
			owner = o;
			battery = b;
			display = d;
		}

		public string Model
		{
			get { return model; }
			set { model = value; }
		}

		public string Manufacturer
		{
			get { return manufacturer; }
			set { manufacturer = value; }
		}

		public double Price
		{
			get { return price; }
			set { price = value; }
		}

		public string Owner
		{
			get { return owner; }
			set { owner = value; }
		}

		public void PhoneNumber (string number)
		{
			if (number.Length == 9)
				Console.WriteLine("The number is stationary.");
			else
				Console.WriteLine("The number isn't stationary.");
        }

		public void CallNumbs(string[] numbers)
		{
			foreach(string number in numbers)
			{
				Console.WriteLine($"{number}");
			}
		}
	}

	class Battery
	{
		private string batteryModel;
		private double idleTime;
		private double talkHours;

		public Battery()
		{
			batteryModel = null;
			idleTime = 0.0;
			talkHours = 0.0;
		}

		public Battery(string bM, double iT, double tH)
		{
			batteryModel = bM;
			idleTime = iT;
			talkHours = tH;
		}

		public string BatteryModel
		{
			get { return batteryModel; }
			set { batteryModel = value; }
		}

		public double IdleTime
		{
			get { return idleTime; }
			set { idleTime = value; }
		}

		public double TalkHours
		{
			get { return talkHours; }
			set { talkHours = value; }
		}
	}

	class Display
	{
		private double screenSize; //in inches
		private string screenColor;

		public Display()
		{
			screenSize = 0.0;
			screenColor = null;
		}
		
		public Display(double sS, string sC)
		{
			screenSize = sS;
			screenColor = sC;
		}

		public double ScreenSize
		{
			get { return screenSize; }
			set { screenSize = value; }
		}
	}
}
