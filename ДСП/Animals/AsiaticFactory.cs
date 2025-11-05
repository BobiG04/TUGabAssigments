namespace Animals
{
	internal class AsiaticFactory : IContinentalFactory
	{
		public ILion CreateLion() { return new AsiaticLion(); }
		public IElephant CreateElephant() { return new AsiaticElephant(); }
	}
}
