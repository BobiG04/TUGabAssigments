using System;

namespace _6_2zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			
			Person human1 = new Person();
			Person human2 = new Person();
			Person human3 = new Person();

			human1.Input();
			human2.Input();
			human3.Input();

			human1.Output(2024);
			human2.Output(2024);
			human3.Output(2024);

		}
	}

	class Person
	{
		string firstName;
		string middleName;
		string lastName;
		int birthYear;
		int age;

		public Person () {
			firstName = "";
			middleName = "";
			lastName = "";
			birthYear = 0;
			age = 0;
		}

		public void Input()
		{
			firstName = Console.ReadLine();
			middleName = Console.ReadLine();
			lastName = Console.ReadLine();
			birthYear = int.Parse(Console.ReadLine());
		}

		public void Output (in int currentYear)
		{
			age = currentYear - birthYear;
			Console.WriteLine(String.Join(" ", firstName, middleName, lastName, age));
		}
	}
}
