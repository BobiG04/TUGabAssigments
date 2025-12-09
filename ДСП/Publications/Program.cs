using System;
using System.Collections.Generic;

namespace Publications
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Facade facade = new Facade();

            Console.WriteLine("SYSTEM SETUP");
            Console.Write("Enter number of lecturers: ");
            int countLecturers = int.Parse(Console.ReadLine());

            Console.Write("Enter number of books: ");
            int countBooks = int.Parse(Console.ReadLine());

            Console.Write("Enter number of papers: ");
            int countPapers = int.Parse(Console.ReadLine());

            List<Lecturer> lecturers = new List<Lecturer>();
            List<Book> books = new List<Book>();
            List<Paper> papers = new List<Paper>();

            for (int i = 0; i < countLecturers; i++)
            {
                Console.WriteLine($"\n Adding Lecturer {i + 1}/{countLecturers}");
                lecturers.Add(facade.CreateLecturer());
            }

            for (int i = 0; i < countBooks; i++)
            {
                Console.WriteLine($"\nAdding Book {i + 1}/{countBooks}");
                books.Add(facade.CreateBook());
            }

            for (int i = 0; i < countPapers; i++)
            {
                Console.WriteLine($"\nAdding Paper {i + 1}/{countPapers}");
                papers.Add(facade.CreatePaper());
            }

            Console.Clear();
            Console.WriteLine("Data entry complete.");

            while (true)
            {
                Console.WriteLine("\nVERIFICATION MENU");
                Console.WriteLine("1. Check if Lecturer wrote a Book");
                Console.WriteLine("2. Check if Lecturer wrote a Paper");
                Console.WriteLine("3. Exit");
                Console.Write("Choose option: ");
                string choice = Console.ReadLine();

                if (choice == "3") break;

                if (choice == "1")
                {
                    DisplayLecturers(lecturers);
                    Console.Write("Select Lecturer Index (0 to " + (lecturers.Count - 1) + "): ");
                    int lIndex = int.Parse(Console.ReadLine());

                    DisplayBooks(books);
                    Console.Write("Select Book Index (0 to " + (books.Count - 1) + "): ");
                    int bIndex = int.Parse(Console.ReadLine());

                    bool result = facade.IsLecturerBookAuthor(lecturers[lIndex], books[bIndex]);
                    Console.WriteLine(result ? "YES! This lecturer is the author." : "NO. Names do not match.");
                }
                else if (choice == "2")
                {
                    DisplayLecturers(lecturers);
                    Console.Write("Select Lecturer Index (0 to " + (lecturers.Count - 1) + "): ");
                    int lIndex = int.Parse(Console.ReadLine());

                    DisplayPapers(papers);
                    Console.Write("Select Paper Index (0 to " + (papers.Count - 1) + "): ");
                    int pIndex = int.Parse(Console.ReadLine());

                    bool result = facade.IsLecturerPaperAuthor(lecturers[lIndex], papers[pIndex]);
                    Console.WriteLine(result ? "YES! This lecturer is among the authors." : "NO. Author not found.");
                }
            }
        }

        static void DisplayLecturers(List<Lecturer> list)
        {
            Console.WriteLine("Available Lecturers:");
            for (int i = 0; i < list.Count; i++)
                Console.WriteLine($"[{i}] {list[i].Name} {list[i].LastName}");
        }

        static void DisplayBooks(List<Book> list)
        {
            Console.WriteLine("Available Books:");
            for (int i = 0; i < list.Count; i++)
                Console.WriteLine($"[{i}] Title: {list[i].Title} (Author: {list[i].GetAuhtorName()})");
        }

        static void DisplayPapers(List<Paper> list)
        {
            Console.WriteLine("Available Papers:");
            for (int i = 0; i < list.Count; i++)
                Console.WriteLine($"[{i}] Title: {list[i].Title}");
        }
    }
}