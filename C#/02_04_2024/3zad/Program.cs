using System;

namespace _3zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			Person person1 = new Person();
			person1.Input(person1);
			person1.Output(person1);

			Person person2 = new Person("Preslav", "Petkov", 8888888888);
			person2.Output(person2);
		}
	}

	class Person
	{

		private string firstName;
		private string lastName;
		private long phoneNumb;

		public Person()
		{

			firstName = "";
			lastName = "";
			phoneNumb = 0;

		}

		public Person(string fN, string lN, long pN)
		{
			firstName = fN;
			lastName = lN;
			phoneNumb = pN;
		}

		public string FirstName
		{
			get { return firstName; }
			set { firstName = value; }
		}

		public string LastName 
		{ 
			get { return lastName; } 
			set {  lastName = value; } 
		}

		public long PhoneNumb
		{
			get { return phoneNumb; }
			set { phoneNumb = value; }
		}

		public void Input (Person person)
		{
			person.FirstName = Console.ReadLine();
			person.LastName = Console.ReadLine();
			person.phoneNumb = int.Parse(Console.ReadLine());
		}

		public void Output (Person person)
		{
			Console.WriteLine(String.Join(" ", person.FirstName, person.LastName, person.PhoneNumb.ToString()));
		}
	}
}