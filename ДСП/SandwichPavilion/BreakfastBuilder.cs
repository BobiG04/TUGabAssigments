using System;
using System.Collections.Generic;
using System.Text;

namespace SandwichPavilion
{
    public class BreakfastBuilder : SandwichBuilder
    {
        public BreakfastBuilder()
        {
            sandwich = new Sandwiches("Breakfast Sandwich");
        }
        public override void BuildBread()
        {
            sandwich.AddIngredient("English Muffin");
        }
        public override void BuildProtein()
        {
            sandwich.AddIngredient("Eggs");
            sandwich.AddIngredient("Sausage Patty");
        }
        public override void BuildVeggies()
        {
            sandwich.AddIngredient("Spinach");
            sandwich.AddIngredient("Tomato");
        }
        public override void BuildSauces()
        {
            sandwich.AddIngredient("Hollandaise Sauce");
        }
    }
}
