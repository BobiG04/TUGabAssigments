using System;
using System.Security.Cryptography.X509Certificates;
namespace _1zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			
		}
	}

	class Student
	{
		private string firstName;
		private string middleName;
		private string lastName;
		private string course;
		private string speciality;
		private string university;
		private string email;
		private string phoneNumber;

		public Student()
		{
			firstName = string.Empty;
			middleName = string.Empty;
			lastName = string.Empty;
			course = string.Empty;
			speciality = string.Empty;
			university = string.Empty;
			email = string.Empty;
			phoneNumber = string.Empty;
		}

		public Student(string fN, string mN, string lN) 
		{ 
			firstName = fN;
			middleName = mN;
			lastName = lN;
			course = string.Empty;
			speciality = string.Empty;
			university = string.Empty;
			email = string.Empty;
			phoneNumber = string.Empty;
		}

		public string FirstName
		{
			get { return firstName; }
			set { firstName = value; }
		}

		public string MiddleName
		{
			get { return middleName; }
			set { middleName = value; }
		}

		public string LastName
		{
			get { return lastName; }
			set { lastName = value; }
		}

		public string Course
		{
			get { return course; }
			set { course = value; }
		}
		
		public string Speciality
		{
			get { return speciality; }
			set { speciality = value; }
		}

		public string University
		{
			get { return university; }
			set { university = value; }
		}

		public string Email
		{
			get { return email; }
			set { email = value; }
		}

		public string PhoneNumber
		{
			get { return phoneNumber; }
			set { phoneNumber = value; }
		}

		public static Student StudentTest(int stN)
		{
			Student student1 = new Student("Bogomil", "Georgiev", "Ivanov");
			Student student2 = new Student("Preslav", "Georgiev", "Petkov");
			Student student3 = new Student("Shtefan", "Georgiev", "Bacho");

			switch (stN) {
				case 0:
					Student.Input();
					return student1;
				case 1: return student2;
				case 2: return student3;
				default: return null;
			}
		}

		public static void Input()
		{

		}

		public string StudentOutput
		{
			get
			{
				return String.Join(" ", StudentTest(1));
			}
		}
	}
}
