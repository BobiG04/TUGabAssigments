namespace Exams
{
    public abstract class Student
    {

        protected string name;
        protected string surname;
        protected string id;
        protected string email;
        protected double score;

        public Student ( string name, string surname, string id, string email, double score )
        {
            this.name = name;
            this.surname = surname;
            this.id = id;
            this.email = email;
            this.score = score;
        }

        public abstract void DisplayInfo();

        public abstract void GetMark();
        public abstract void ProtocolData();
    }
}
