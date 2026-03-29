namespace Animals
{
	public class AfricanLion : ILion
	{
		public string GetFeatures()
		{
			return "It has big mane";
		}
		public void LivesIn()
		{
			Console.WriteLine("The animal lives in Africa");
		}
		public void CanMeet(IElephant elephant)
		{
			Console.WriteLine(this.GetType().Name + " can meet " + elephant.GetType().Name);
		}
		public void NameInLatin()
		{
			Console.WriteLine("The name of the lion in latin: leo(leonis/leones)\n");
		}
	}
}
