namespace Publications
{
    internal class Author
    {
        private string name = "";
        private string surname = "";

        public string Name
        {
            get { return name; }
            set { name = value; }
        }
        public string Surname
        {
            get { return surname; }
            set { surname = value; }
        }

        public Author(string name, string surname)
        {
            this.name = name;
            this.surname = surname;
        }

        public string DisplayInfo()
        {
            return $"{name} {surname}";
        }
    }
}
