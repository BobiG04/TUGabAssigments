using System;

namespace _3zad
{
	internal class Program
	{
		
		static void Main(string[] args)
		{
			Console.WriteLine(" How many students?");
			int n = int.Parse(Console.ReadLine());
			Student[] students = new Student[n];
			string command = Commands();

			do
			{
				switch (command)
				{
					case "Input":
						for (int i = 0; i < students.Length; i++)
						{
							students[i] = new Student();
							InputCycle(students, i);
						}
						command = Commands();
						break;
					case "FindByFacultyNumber":
						Console.WriteLine(" Enter a faculty number: ");
						int facNum = int.Parse(Console.ReadLine());
						for (int i = 0; i < students.Length; i++)
						{
							if (students[i] != null)
								OutputCycle(students, facNum, i);
						}
						command = Commands();
						break;
					default:
						Console.WriteLine("EROOR");
						return;
				}
			} while (command != "End");
			
		}

		static string Commands()
		{
			Console.WriteLine(" Enter a command:");
			Console.WriteLine(" Input - For inputing student data.");
			Console.WriteLine(" FindByFacultyNumber - For finding student's name and specialty by the faculty number.");
			Console.WriteLine(" End - Ends the program.");
			string command = Console.ReadLine();
			if (command != null) return command;
			else return "EROOR";
		}

		public static void InputCycle(Student[] students, int index)
		{
			students[index].Input();
        }

		public static void OutputCycle(Student[] students, int inputFacNum, int index)
		{
			if (inputFacNum == students[index].facNumber) students[index].Output();
		}
	}

	public class Student
	{
		public string name = "";
		public int facNumber;
		public string speciality = "";

		public void Input()
		{
            Console.WriteLine(" Enter a name: ");
			name = Console.ReadLine();
            Console.WriteLine(" Enter faculty number");
			facNumber = int.Parse(Console.ReadLine());
			Console.WriteLine(" Enter speciality");
			speciality = Console.ReadLine();
        }

		public void Output()
		{
            Console.WriteLine(facNumber + " " + name + " " + speciality);
        }
	}
}
