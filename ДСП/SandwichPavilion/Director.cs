namespace SandwichPavilion
{
    internal class Director
    {
        public void Construct(SandwichBuilder sandwichBuilder)
        {
            sandwichBuilder.BuildBread();
            sandwichBuilder.BuildProtein();
            sandwichBuilder.BuildVeggies();
            sandwichBuilder.BuildSauces();
        }
    }
}
