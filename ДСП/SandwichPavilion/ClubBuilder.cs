using System;
using System.Collections.Generic;
using System.Text;

namespace SandwichPavilion
{
    public class ClubBuilder : SandwichBuilder
    { 
        public ClubBuilder()
        {
            sandwich = new Sandwiches("Club Sandwich");
        }
        public override void BuildBread()
        {
            sandwich.AddIngredient("Toasted White Bread");
        }
        public override void BuildProtein()
        {
            sandwich.AddIngredient("Turkey");
            sandwich.AddIngredient("Bacon");
        }
        public override void BuildVeggies()
        {
            sandwich.AddIngredient("Lettuce");
            sandwich.AddIngredient("Tomato");
        }
        public override void BuildSauces()
        {
            sandwich.AddIngredient("Mayonnaise");
        }
    }
}
