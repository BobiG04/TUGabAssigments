using System;

namespace _1zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			
			int hour = int.Parse(Console.ReadLine());
			int minute = int.Parse(Console.ReadLine());
			int second = int.Parse(Console.ReadLine());

			Time time = new Time();
			Time timeArgs = new Time(hour, minute, second);

			time.Output(hour, minute, second);
			timeArgs.Output();

		}
	}

	class Time
	{
		private int hour;
		private int minute;
		private int second;

		public Time() { 
		
			hour = 0;
			minute = 0;
			second = 0;
		
		}

		public Time(int hour, int minute, int second)
		{
			this.hour = hour;
			this.minute = minute;
			this.second = second;
		}

		public void Output()
		{
			Console.WriteLine(hour + ":" + minute + ":" + second);
        }

		public void Output(int hour, int minute, int second)
		{
			Console.WriteLine(hour + ":" + minute + ":" + second);
		}
	}
}
