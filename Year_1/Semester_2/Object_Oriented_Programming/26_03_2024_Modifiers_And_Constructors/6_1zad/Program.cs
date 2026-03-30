using System;
using System.Runtime.CompilerServices;

namespace _6_1zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			Doggo dog1 = new Doggo("Sparky", 10);
			Doggo dog2 = new Doggo();
			dog2.Input();
			Doggo dog3 = new Doggo("Rex", 13);

			dog1.Output(dog1.name, dog1.age);
			dog2.Output(dog2.name, dog2.age);
			dog3.Output(dog3.name, dog3.age);

		}
	}

	class Doggo
	{
		public string name;
		public int age;

		public Doggo () {
			name = "";
			age = 0;
		}

		public Doggo (string name, int age)
		{
			this.name = name;
			this.age = age;
		}

		public void Input()
		{
			name = Console.ReadLine();
			age = int.Parse (Console.ReadLine());
        }

		public void Output(in string name, in int age)
		{
			Console.WriteLine(String.Join(" ", name, age));
		}
	}
}
