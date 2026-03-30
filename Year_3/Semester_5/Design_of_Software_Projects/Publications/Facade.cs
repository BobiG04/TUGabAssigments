using System;

namespace Publications
{
    internal class Facade
    {
        public Lecturer CreateLecturer()
        {
            Lecturer l = new Lecturer();
            l.AddLecturer(); 
            return l;
        }

        public Book CreateBook()
        {
            Book b = new Book();
            b.InputBookData();
            return b;
        }

        public Paper CreatePaper()
        {
            Console.Write("How many authors for this paper? ");
            int n = int.Parse(Console.ReadLine());

            Paper p = new Paper(n);
            p.InputPaperData();
            return p;
        }

        public bool IsLecturerBookAuthor(Lecturer lecturer, Book book)
        {
            string bookAuthorName = book.GetAuhtorName().ToLower().Trim();
            string lecturerFullName = (lecturer.Name + " " + lecturer.LastName).ToLower().Trim();

            return bookAuthorName == lecturerFullName;
        }

        public bool IsLecturerPaperAuthor(Lecturer lecturer, Paper paper)
        {
            return paper.SearchAuthor(lecturer.Name, lecturer.LastName);
        }
    }
}