using System;

namespace _4zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			Time time = new Time();
			time.Message();
		}
	}

	class Time
	{
		int hour;
		int minute;
		int second;

		public Time()
		{
			hour = 0; minute = 0; second = 0;
		}

		public int Hour
		{
			get { return hour; }
			set { hour = value; }
		}

		public int Minute
		{
			get { return minute; }
			set { minute = value; }
		}

		public int Second
		{
			get { return second; }
			set { second = value; }
		}

		public void Message()
		{
			try
			{
				Hour = int.Parse(Console.ReadLine());
				Minute = int.Parse(Console.ReadLine());
				Second = int.Parse(Console.ReadLine());
				if (Hour < 0 || Hour > 23 || Minute < 0 || Minute > 59 || Second < 0 || Second > 59)
				{
					throw new Exception();
				} else
				{
                    Console.WriteLine(String.Join(":", Hour, Minute, Second));
                }
			} catch (Exception e)
			{
                Console.WriteLine(e.Message);
                Console.WriteLine("Invalid number for time.");
            }
		}
	}
}
