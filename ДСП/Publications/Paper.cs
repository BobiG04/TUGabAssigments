namespace Publications
{
    internal class Paper
    {

        public Author author;

        public string Title { get; set; }
        public string ISBN { get; set; }
        public string Details { get; set; }
        public string Type { get; set; }

        public Paper(string title, Author a, string isbn, string details, string type)
        {
            Title = title;
            author = a;
            ISBN = isbn;
            Details = details;
            Type = type;
        }

        public void DisplayInfo()
        {
            Console.WriteLine($"Title: {Title}");
            Console.Write($"Author: {author.Name} {author.Surname}");
            
            Console.WriteLine();
            Console.WriteLine($"ISBN: {ISBN}");
            Console.WriteLine($"Details: {Details}");
            Console.WriteLine($"Type: {Type}");
        }

        public void AddPaper()
        {
            Console.Clear();

            Console.WriteLine("Enter paper title:");
            Title = Console.ReadLine();
            
            Console.WriteLine($"Enter name of author:");
            author.Name = Console.ReadLine();
            Console.WriteLine($"Enter surname of author:");
            author.Surname = Console.ReadLine();

            Console.WriteLine("Enter ISBN:");
            ISBN = Console.ReadLine();
            Console.WriteLine("Enter paper details:");
            Details = Console.ReadLine();
            Console.WriteLine("Enter paper type:");
            Type = Console.ReadLine();
            Console.WriteLine($"Paper '{Title}' has been added.");
        }

        public void EditPaper()
        {
            Console.WriteLine("Enter new paper title:");
            Title = Console.ReadLine();
            
            Console.WriteLine($"Enter name of author:");
            author.Name = Console.ReadLine();
            Console.WriteLine($"Enter surname of author:");
            author.Surname = Console.ReadLine();

            Console.WriteLine("Enter new ISBN:");
            ISBN = Console.ReadLine();
            Console.WriteLine("Enter new paper details:");
            Details = Console.ReadLine();
            Console.WriteLine("Enter new paper type:");
            Type = Console.ReadLine();
            Console.WriteLine($"Paper '{Title}' has been updated.");
        }

        public void RemovePaper()
        {
            Title = string.Empty;
            author = null;
            ISBN = string.Empty;
            Details = string.Empty;
            Type = string.Empty;
            Console.WriteLine("Paper has been removed.");
        }

    }
}
