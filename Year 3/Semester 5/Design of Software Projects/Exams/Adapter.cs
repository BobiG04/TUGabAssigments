namespace Exams
{
    internal class Adapter : Target
    {

        private Adaptee adaptee = new Adaptee(); 

        public override void Request()
        {             
            adaptee.SpecificRequest();         
        } 

    }
}
