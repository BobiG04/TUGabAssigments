using System;
using System.Collections.Generic;
using System.Text;

namespace SandwichPavilion
{
    public class ChickenBuilder : SandwichBuilder
    {
        public ChickenBuilder()
        {
            sandwich = new Sandwiches("Chicken Sandwich");
        }
        public override void BuildBread()
        {
            sandwich.AddIngredient("Whole Wheat Bread");
        }
        public override void BuildProtein()
        {
            sandwich.AddIngredient("Grilled Chicken Breast");
        }
        public override void BuildVeggies()
        {
            sandwich.AddIngredient("Lettuce");
            sandwich.AddIngredient("Tomato");
            sandwich.AddIngredient("Cucumber");
        }
        public override void BuildSauces()
        {
            sandwich.AddIngredient("Honey Mustard Sauce");
        }
    }
}
