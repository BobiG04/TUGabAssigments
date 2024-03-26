using System;

namespace _6_1zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			
		}
	}

	class Doggo
	{
		private string name;
		private int age;

		public Doggo () {
			name = "";
			age = 0;
		}

		public Doggo (string name, int age)
		{
			this.name = name;
			this.age = age;
		}

		public void Input ()
		{
			Console.WriteLine("Enter a doggo name: ");
			name = Console.ReadLine();

            Console.WriteLine("Enter it's age: ");
			age = int.Parse(Console.ReadLine());
        }

		public static void Input(out string name, out int age)
		{
			name = Console.ReadLine();
			age = int.Parse (Console.ReadLine());
        }

		public static void Output(in string name, in int age)
		{
			Console.WriteLine(String.Join(" ", name, age));
		}
	}
}
