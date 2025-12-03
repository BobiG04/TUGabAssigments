using System;
using System.Collections.Generic;

namespace Publications
{
    internal class Paper
    {
        public int numberOfAuthors = 0;
        public List<Author> authors = new List<Author>();

        public string Title { get; set; }
        public string ISBN { get; set; }
        public string Details { get; set; }
        public string Type { get; set; }

        public Paper(int n)
        {
            numberOfAuthors = n;
        }

        public void InputPaperData()
        {
            Console.WriteLine("--- Enter Paper Details ---");

            for (int i = 0; i < numberOfAuthors; i++)
            {
                Author author = new Author();
                Console.WriteLine($"Enter details for Author #{i + 1}:");
                Console.Write("First name: ");
                author.Name = Console.ReadLine();
                Console.Write("Last name: ");
                author.LastName = Console.ReadLine();
                authors.Add(author);
            }

            Console.Write("Title: ");
            Title = Console.ReadLine();
            Console.Write("Details: ");
            Details = Console.ReadLine();
            Console.Write("ISBN: ");
            ISBN = Console.ReadLine();
            Console.Write("Type: ");
            Type = Console.ReadLine();
        }

        public bool SearchAuthor(string name, string lastName)
        {
            foreach (Author author in authors)
            {
                if (author.Name.Trim().ToLower() == name.Trim().ToLower() &&
                    author.LastName.Trim().ToLower() == lastName.Trim().ToLower())
                {
                    return true;
                }
            }
            return false;
        }

        public void DisplayInfo()
        {
            Console.WriteLine($"Paper: {Title}");
        }
    }
}