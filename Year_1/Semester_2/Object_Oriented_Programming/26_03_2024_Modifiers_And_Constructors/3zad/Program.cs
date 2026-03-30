using System;

namespace _3zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			Student student1 = new Student();
			student1.Input();
			Student student2 = new Student("Bogomil", "Ivanov", 22372126);
			Student student3 = new Student("Preslav", "Petkov", 22372127, "first");

			Console.WriteLine(student1.Output());
            Console.WriteLine(student2.Output());
			Console.WriteLine(student3.Output());
        }
	}

	public class Student
	{
		public string firstName;
		public string lastName;
		public int facNumber;
		public string year;

		public Student() {

			firstName = "";
			lastName = "";
			facNumber = 0;
			year = "";

		}

		public Student(string firstName, string lastName, int facNumber)
		{

			this.firstName = firstName;
			this.lastName = lastName;
			this.facNumber = facNumber;

		}

		public Student(string firstName, string lastName, int facNumber, string year)
		{

			this.firstName = firstName;
			this.lastName = lastName;
			this.facNumber = facNumber;
			this.year = year;

		}

		public void Input()
		{
			Console.WriteLine(" Enter a name: (aka first name, last name)");
			firstName = Console.ReadLine();
			lastName = Console.ReadLine();
			Console.WriteLine(" Enter faculty number");
			facNumber = int.Parse(Console.ReadLine());
			Console.WriteLine(" Enter a year");
			year = Console.ReadLine();
		}

		public string Output()
		{
			return String.Join(" ", facNumber, firstName, lastName, year) + " year";
		}
	}
}
