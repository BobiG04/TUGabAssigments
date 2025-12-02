namespace Publications
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Facade facade = new Facade();

            Lecturer[] lecturer;
            Book[] book;
            Paper[] paper;

            #region ArraysInitialization

            Console.WriteLine("Enter number of lecturers, books, and papers:");
            int countLecturers = int.Parse(Console.ReadLine());
            int countBooks = int.Parse(Console.ReadLine());
            int countPapers = int.Parse(Console.ReadLine());

            lecturer = new Lecturer[countLecturers];
            book = new Book[countBooks];
            paper = new Paper[countPapers];

            #endregion

            for (int i = 0; i < lecturer.Length; i++)
            {
                lecturer[i] = facade.AddLecturer();
            }

            facade.DisplayLecturers();

            Console.ReadLine();

            facade.AddBook();
            facade.AddPaper();

        }
    }
}
