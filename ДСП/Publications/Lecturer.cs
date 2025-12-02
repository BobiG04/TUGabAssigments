namespace Publications
{
    internal class Lecturer
    {

        public string Name { get; set; }
        public string Surname { get; set; }
        public string LastName { get; set; }

        public string Affiliation { get; set; }
        public string Department { get; set; }

        public Lecturer(string name, string surname, string lastName, string affiliation, string department)
        {
            Name = name;
            Surname = surname;
            LastName = lastName;
            Affiliation = affiliation;
            Department = department;
        }


        public void AddLecturer()
        {
            Console.Clear();

            Console.WriteLine("Enter lecturer name:");
            Name = Console.ReadLine();
            Console.WriteLine("Enter lecturer surname:");
            Surname = Console.ReadLine();
            Console.WriteLine("Enter lecturer last name:");
            LastName = Console.ReadLine();
            Console.WriteLine("Enter lecturer affiliation:");
            Affiliation = Console.ReadLine();
            Console.WriteLine("Enter lecturer department:");
            Department = Console.ReadLine();

            Console.WriteLine($"Lecturer {Name} {Surname} {LastName} from {Department}, {Affiliation} has been added.");
        }

        public void EditLecturer(int index)
        {
            Console.WriteLine("Enter new lecturer details:");
            Name = Console.ReadLine();
            Surname = Console.ReadLine();
            LastName = Console.ReadLine();
            Affiliation = Console.ReadLine();
            Department = Console.ReadLine();
            Console.WriteLine($"Lecturer at index {index} has been updated to {Name} {Surname} {LastName}, {Department}, {Affiliation}.");
        }

        public void RemoveLecturer(int index)
        {

            Console.WriteLine($"Lecturer at index {index} has been removed.");

        }

        public void DisplayLecturers()
        {
            Console.WriteLine($"Lecturer: {Name} {Surname} {LastName}, Department: {Department}, Affiliation: {Affiliation}");
        }
    }
}
