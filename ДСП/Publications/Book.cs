namespace Publications
{
    internal class Book
    {

        public string Title { get; set; }
        public Author author;

        public string ISBN { get; set; }
        public string Details { get; set; }

        public Book(string title, Author a, string isbn, string details)
        {
            Title = title;
            author = a;
            ISBN = isbn;
            Details = details;
        }

        public void DisplayInfo()
        {
            Console.WriteLine($"Title: {Title}");
            Console.WriteLine($"Author: {author.Name} {author.Surname}");
            Console.WriteLine($"ISBN: {ISBN}");
            Console.WriteLine($"Details: {Details}");
        }

        public void AddBook ()
        {
            Console.Clear();

            Console.WriteLine("Enter book title:");
            Title = Console.ReadLine();
            Console.WriteLine("Enter author name:");
            author.Name = Console.ReadLine();
            Console.WriteLine("Enter author surname:");
            author.Surname = Console.ReadLine();
            Console.WriteLine("Enter ISBN:");
            ISBN = Console.ReadLine();
            Console.WriteLine("Enter book details:");
            Details = Console.ReadLine();
            Console.WriteLine($"Book '{Title}' by {author.DisplayInfo()} has been added.");
        }

        public void EditBook()
        {
            Console.WriteLine("Enter new book title:");
            Title = Console.ReadLine();
            Console.WriteLine("Enter new author name:");
            author.Name = Console.ReadLine();
            Console.WriteLine("Enter new author surname:");
            author.Surname = Console.ReadLine();
            Console.WriteLine("Enter new ISBN:");
            ISBN = Console.ReadLine();
            Console.WriteLine("Enter new book details:");
            Details = Console.ReadLine();
            Console.WriteLine($"Book '{Title}' by {author.DisplayInfo()} has been updated.");
        }
    }
}
