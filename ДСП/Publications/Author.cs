namespace Publications
{
    internal class Author
    {
        public string Name { get; set; }
        public string LastName { get; set; }

        public string DisplayInfo()
        {
            return $"{Name} {LastName}";
        }
    }
}