using System;

namespace _1zad
{
    internal class Program
    {
        static void Main(string[] args)
        {
            // 1. Генерираме студентите чрез статичния метод на тестовия клас
            StudentTest.GenerateStudents();

            // 2. Достъпваме ги чрез статичното свойство и ги отпечатваме
            Console.WriteLine("--- Списък със студенти ---");
            foreach (Student student in StudentTest.GeneratedStudents)
            {
                if (student != null)
                {
                    Console.WriteLine(student.ToString());
                }
            }
        }
    }

    class Student
    {
        private string firstName;
        private string middleName;
        private string lastName;
        private string course;
        private string speciality;
        private string university;
        private string email;
        private string phoneNumber;

        // Празен конструктор
        public Student()
        {
            firstName = null;
            middleName = null;
            lastName = null;
            course = null;
            speciality = null;
            university = null;
            email = null;
            phoneNumber = null;
        }

        // Параметризиран конструктор
        public Student(string fN, string mN, string lN) : this() // Извиква празния, за да нулира останалите
        {
            firstName = fN;
            middleName = mN;
            lastName = lN;
        }

        // Свойства за Капсулация
        public string FirstName { get { return firstName; } set { firstName = value; } }
        public string MiddleName { get { return middleName; } set { middleName = value; } }
        public string LastName { get { return lastName; } set { lastName = value; } }
        public string Course { get { return course; } set { course = value; } }
        public string Speciality { get { return speciality; } set { speciality = value; } }
        public string University { get { return university; } set { university = value; } }
        public string Email { get { return email; } set { email = value; } }
        public string PhoneNumber { get { return phoneNumber; } set { phoneNumber = value; } }

        // Предефиниране на ToString() за лесно отпечатване на обекта
        public override string ToString()
        {
            return $"Име: {FirstName} {MiddleName} {LastName} | Спец: {Speciality ?? "Няма"} | Уни: {University ?? "Няма"}";
        }
    }

    // НАПЪЛНО ОТДЕЛЕН КЛАС според условието
    class StudentTest
    {
        // Статично поле, което съхранява обектите
        private static Student[] studentsArray;

        // Статично свойство за достъп до полето
        public static Student[] GeneratedStudents
        {
            get { return studentsArray; }
        }

        // Статичен метод, който създава обектите
        public static void GenerateStudents()
        {
            studentsArray = new Student[3];

            studentsArray[0] = new Student("Bogomil", "Georgiev", "Ivanov");
            studentsArray[0].University = "ТУ-Габрово";
            studentsArray[0].Speciality = "КСТ";

            studentsArray[1] = new Student("Preslav", "Georgiev", "Petkov");
            
            studentsArray[2] = new Student("Shtefan", "Georgiev", "Bacho");
            studentsArray[2].University = "СУ";
        }
    }
}