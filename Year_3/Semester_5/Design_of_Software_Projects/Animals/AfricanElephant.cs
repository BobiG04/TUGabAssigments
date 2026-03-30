namespace Animals
{
	public class AfricanElephant : IElephant
	{
		
		public int GetWeight()
		{
			return 6000;
		}
		public int GetHeight()
		{
			return 4;
		}
		public void LivesIn()
		{
			Console.WriteLine("The animal lives in Africa");
		}
		public void NameInLatin()
		{
			Console.WriteLine("The name of the elephant in latin: elephas(genitive elephantis)\n");
		}
	}
}
