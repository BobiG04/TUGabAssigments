using System;
using System.Collections.Generic;
using System.Text;

namespace Exams
{
    public class MyStudent : Student
    {
        private int mark;

        public MyStudent(string name, string surname, string id, string email, double score) : base(name, surname, id, email, score){}

        public override void GetMark()
        {
           Console.WriteLine("The score is: " + score + "The mark is: " + GetTheMark());
        }

        private int GetTheMark()
        {
            if (score < 13.5)
            {
                mark = 2;
                return 2;
            }
            else if (score >= 13.5 && score <= 17.5)
            {
                mark = 3;
                return 3;
            }
            else if (score >= 18 && score <= 22)
            {
                mark = 4;
                return 4;
            }
            else if (score >= 22.5 && score <= 25)
            {
                mark = 5;
                return 5;
            }
            else if (score >= 25.5)
            {
                mark = 6;
                return 6;
            }
            else
            {
                mark = -1;
                return -1;
            }
        }

        public override void DisplayInfo()
        {
            Console.WriteLine("Student Information:");
            Console.WriteLine($"Name: {name}");
            Console.WriteLine($"Surname: {surname}");
            Console.WriteLine($"ID: {id}");
            Console.WriteLine($"Email: {email}");
            GetMark();
        }

        public override void ProtocolData()
        {
            Console.WriteLine("Student Information:");
            Console.WriteLine($"Name: {name}");
            Console.WriteLine($"Surname: {surname}");
            Console.WriteLine($"Mark: {mark}");
        }
    }
}
