namespace Animals
{
	public class AsiaticElephant : IElephant
	{
		public int GetWeight()
		{
			return 5500;
		}
		public int GetHeight()
		{
			return 3;
		}
		public void LivesIn()
		{
			Console.WriteLine("The animal lives in Asia");
		}
		public void NameInLatin()
		{
			Console.WriteLine("The name of the elephant in latin: elephas(genitive elephantis)\n");
		}
	}
}
