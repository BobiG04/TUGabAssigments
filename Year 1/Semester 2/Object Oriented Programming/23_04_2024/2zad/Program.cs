using System;

namespace _2zad
{
	internal class Program
	{
		static void Main(string[] args)
		{

			int n = int.Parse(Console.ReadLine());
			Student[] students = new Student[n];

			// Input
            for (int i = 0; i < n; i++)
            {
				students[i] = new Student();
				students[i].Input();
				students[i].InputSt();
            }

            // Output
            for (int i = 0; i < n; i++)
            {
				Console.WriteLine(students[i].Output() + students[i].OutputSt());
            }

        }
	}
}
