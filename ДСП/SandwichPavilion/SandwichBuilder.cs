namespace SandwichPavilion
{
    public abstract class SandwichBuilder
    {

        protected Sandwiches sandwich;

        public Sandwiches Sandwich
        {
            get { return sandwich; }
        }

        public abstract void BuildBread();
        public abstract void BuildProtein();
        public abstract void BuildVeggies();
        public abstract void BuildSauces();

    }
}
