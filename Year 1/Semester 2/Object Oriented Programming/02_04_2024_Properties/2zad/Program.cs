using System;

namespace _2zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			
			CarVroom car1 = new CarVroom();
			car1.Input(car1);
			car1.Output(car1);

			CarVroom car2 = new CarVroom("Mercedes", "gray" , "AB 1234 CD");
			car2.Output(car2);

		}
	}

	class CarVroom
	{
		private string brand;
		private string color;
		private string regNumb;

		public CarVroom()
		{
			brand = "";
			color = "";
			regNumb = "";
		}

		public CarVroom(string b, string c, string rN)
		{
			brand = b;
			color = c;
			regNumb = rN;
		}

		public string Brand
		{
			get { return brand; }
			set { brand = value; }
		}

		public string Color
		{
			get { return color; }
			set { color = value; }
		}

		public string RegNumb
		{
			get { return regNumb; }
			set { regNumb = value; }
		}

		public void Input()
		{
			this.Brand = Console.ReadLine();
			this.Color = Console.ReadLine();
			this.RegNumb = Console.ReadLine();
		}

		public void Output()
		{
			Console.WriteLine("The " + String.Join(" ", this.Color, this.Brand) + " is with regestry number : " + carobj.RegNumb);
        }
	}
}
