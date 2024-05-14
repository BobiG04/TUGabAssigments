namespace _1zad
{
	internal class Program
	{
		static void Main(string[] args)
		{
			Figure[] figs = { new Rectangle(), new Square(), new Circle(), new Rhombus() };

			for (int i = 0; i < figs.Length; i++)
            {
				figs[i].Input();
				figs[i].Output();
				Console.WriteLine("The area of the figure is: {0}", figs[i].Area);
            }
        }
	}
}
