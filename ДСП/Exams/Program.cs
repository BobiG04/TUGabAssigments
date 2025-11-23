namespace Exams
{
    internal class Program
    {
        static void Main(string[] args)
        {
            Console.Write("Enter first name: ");
            string firstName = Console.ReadLine();

            Console.Write("Enter last name: ");
            string lastName = Console.ReadLine();

            Console.Write("Enter student id: ");
            string id = Console.ReadLine();

            Console.Write("Enter email: ");
            string email = Console.ReadLine();

            Console.Write("Enter grade (use '.' for decimal): ");
            double grade = double.Parse(Console.ReadLine());
            Console.WriteLine("Invalid input. Please enter a numeric grade (e.g. 14.5).");

            MyStudent student = new MyStudent(firstName, lastName, id, email, grade);

            Target target = new Adapter();
            target.Request();

            
        }
    }
}
