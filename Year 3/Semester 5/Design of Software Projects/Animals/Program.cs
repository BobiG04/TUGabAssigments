namespace Animals
{
    internal class Program
    {
        static void Main(string[] args)
        {
			IContinentalFactory factory1 = new AfricanFactory();
            Client client1 = new Client(factory1); 
            client1.Run();

            IContinentalFactory factory2 = new AsiaticFactory(); 
            Client client2 = new Client(factory2); 
            client2.Run();
		}
    }
}