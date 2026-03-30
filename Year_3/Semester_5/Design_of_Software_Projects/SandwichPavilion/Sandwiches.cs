namespace SandwichPavilion
{
    public class Sandwiches
    {

        private string sandwichType;
        private List<string> ingredients = new List<string>();

        public Sandwiches(string sT)
        {
            sandwichType = sT;
        }

        public void AddIngredient(string ingredient)
        {
            ingredients.Add(ingredient);
        }

        public void DisplaySandwich()
        {
            Console.WriteLine($"Sandwich Type: {sandwichType}");
            Console.WriteLine("Ingredients:");
            foreach (var ingredient in ingredients)
            {
                Console.WriteLine($"- {ingredient}");
            }
        }

    }
}
