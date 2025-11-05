namespace Animals
{
	public class AfricanFactory:IContinentalFactory
	{
		public ILion CreateLion() { return new AfricanLion(); }
		public IElephant CreateElephant() { return new AfricanElephant(); }
	}
}
