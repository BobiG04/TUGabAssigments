namespace Publications
{
    internal class Facade
    {

        Lecturer lecturer;
        Book book;
        Paper paper;
        Author author = new Author("","");

        public Facade()
        {
            lecturer = new Lecturer("", "", "", "", "");
            book = new Book("", new Author("", ""), "", "");
            paper = new Paper("", author, "", "", "");
            author = new Author("", "");
        }

        public Lecturer AddLecturer()
        {
            lecturer.AddLecturer();
            return lecturer;
        }

        public void EditLecturer(int index)
        {
            lecturer.EditLecturer(index);
        }

        public void RemoveLecturer(int index)
        {
            lecturer.RemoveLecturer(index);
        }

        public void DisplayLecturers()
        {
            lecturer.DisplayLecturers();
        }

        public void AddBook()
        {
            book.AddBook();
        }

        public void EditBook()
        {
            book.EditBook();
        }

        public void AddPaper()
        {
            paper.AddPaper();
        }

        public void EditPaper()
        {
            paper.EditPaper();
        }

        public void CheckLecturerPublicationAssociation(Lecturer lecturer, Book[] books, Paper[] papers)
        {
            // This method would contain logic to check associations
            // between lecturers and books. Implementation depends on
            // how associations are defined in the system.

            Console.Clear();

            foreach (var book in books)
            {
                if (lecturer.Name == book.author.Name)
                {
                    Console.WriteLine($"The lecturer {lecturer.Name} is the author of the book {book.Title}");
                }
            }

            foreach (var paper in papers)
            {
                    if (lecturer.Name == author.Name)
                    {
                        Console.WriteLine($"The lecturer {lecturer.Name} is associated with the paper {paper.Title}");
                    }
            }

        }
    }
}
