namespace Exams
{
    internal class Group
    {

        private string[] data = { "Иван", "Иванов", "21905111", "i.ivanov@gmail.com" };
        private double score = 18.7;

        public string GetItem( string item )
        {
            switch(item.ToLower())
            {
                case "name":
                    return data[0];
                case "surname":
                    return data[1];
                case "id":
                    return data[2];
                case "email":
                    return data[3];
                default:
                    return "Item not found";
            }
        }

        public double GetScore()
        {
            return score;
        }

    }
}
