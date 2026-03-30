using System;
using System.Collections.Generic;
using System.Text;

namespace SandwichPavilion
{
    public class GrilledBuilder : SandwichBuilder
    {
        public GrilledBuilder()
        {
            sandwich = new Sandwiches("Grilled Sandwich");
        }
        public override void BuildBread()
        {
            sandwich.AddIngredient("Sourdough Bread");
        }
        public override void BuildProtein()
        {
            sandwich.AddIngredient("Grilled Chicken");
        }
        public override void BuildVeggies()
        {
            sandwich.AddIngredient("Bell Peppers");
            sandwich.AddIngredient("Onions");
        }
        public override void BuildSauces()
        {
            sandwich.AddIngredient("Pesto Sauce");
        }
    }
}
