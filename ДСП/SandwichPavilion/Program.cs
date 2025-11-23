namespace SandwichPavilion
{
    internal class Program
    {
        static void Main(string[] args)
        {
            SandwichBuilder[] sandwichBuilders = new SandwichBuilder[3];
            Director director = new Director();

            sandwichBuilders[0] = new BreakfastBuilder();
            director.Construct(sandwichBuilders[0]);
            sandwichBuilders[0].Sandwich.DisplaySandwich();
            Console.WriteLine();
            sandwichBuilders[1] = new ChickenBuilder();
            director.Construct(sandwichBuilders[1]);
            sandwichBuilders[1].Sandwich.DisplaySandwich();
            Console.WriteLine();
            sandwichBuilders[2] = new ClubBuilder();
            director.Construct(sandwichBuilders[2]);
            sandwichBuilders[2].Sandwich.DisplaySandwich();
            Console.WriteLine();
            sandwichBuilders[3] = new GrilledBuilder();
            director.Construct(sandwichBuilders[3]);
            sandwichBuilders[3].Sandwich.DisplaySandwich();
            Console.WriteLine();
        }
    }
}
