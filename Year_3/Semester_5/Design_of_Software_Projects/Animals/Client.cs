namespace Animals
{
	public class Client
	{
		private ILion lion;
		private IElephant elephant; 
		public Client(IContinentalFactory factory) 
		{ 
			lion = factory.CreateLion(); 
			elephant = factory.CreateElephant(); 
		}
		public void Run() {
			Console.WriteLine(elephant.GetType().Name + " weights at around " + elephant.GetWeight() + "kg");
			Console.WriteLine(elephant.GetType().Name + " is tall " + elephant.GetHeight() + "m");
			Console.WriteLine(lion.GetType().Name + lion.GetFeatures());
			lion.CanMeet(elephant);
			elephant.LivesIn();
			elephant.NameInLatin();
			lion.LivesIn();
			lion.NameInLatin();
		}
	}
}
