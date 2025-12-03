using System;

namespace Publications
{
    internal class Book
    {
        public string Title { get; set; }
        public Author author;
        public string ISBN { get; set; }
        public string Details { get; set; }
        public string Type { get; set; }

        public Book()
        {
            author = new Author();
        }

        public void InputBookData()
        {
            Console.WriteLine("--- Enter Book Details ---");
            Console.Write("Book Title: ");
            Title = Console.ReadLine();

            Console.Write("Author First Name: ");
            author.Name = Console.ReadLine();

            Console.Write("Author Last Name: ");
            author.LastName = Console.ReadLine();

            Console.Write("ISBN: ");
            ISBN = Console.ReadLine();

            Console.Write("Details: ");
            Details = Console.ReadLine();
        }

        public string GetAuhtorName()
        {
            return author.Name + " " + author.LastName;
        }

        public void DisplayInfo()
        {
            Console.WriteLine($"Book: {Title}, Author: {GetAuhtorName()}");
        }
    }
}