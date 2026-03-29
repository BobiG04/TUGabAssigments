using System;

namespace Furniture
{
	internal class Program
	{
		static void Main(string[] args)
		{
			List<Creator> creators = new List<Creator>();
			List<FurnitureProducts> products = new List<FurnitureProducts>();
			string command;
			int width, height;

			do
			{
				Console.Write("List of commands: \n1 Add Chair\n2 Add Table\n3 Add Bench\n4 List items\n5 Finish order\n\nEnter a command:");
				command = Console.ReadLine();
				Console.Clear();
				switch (command)
				{
					case "Add Chair" or "1":
						Console.Write("Enter width: ");
						width = int.Parse(Console.ReadLine());
						Console.Write("Enter height: ");
						height = int.Parse(Console.ReadLine());
						creators.Add(new ChairCreator());
						products.Add(creators[creators.Count - 1].FactoryMethod(width, height));
						Console.WriteLine("Item: {0} has been added!\n", products[products.Count - 1].GetType().Name);
						break;
					case "Add Table" or "2":
						Console.Write("Enter width: ");
						width = int.Parse(Console.ReadLine());
						Console.Write("Enter height: ");
						height = int.Parse(Console.ReadLine());
						creators.Add(new TableCreator());
						products.Add(creators[creators.Count - 1].FactoryMethod(width, height));
						Console.WriteLine("Item: {0} has been added!\n", products[products.Count - 1].GetType().Name);
						break;
					case "Add Bench" or "3":
						Console.Write("Enter width: ");
						width = int.Parse(Console.ReadLine());
						Console.Write("Enter height: ");
						height = int.Parse(Console.ReadLine());
						creators.Add(new BenchCreator());
						products.Add(creators[creators.Count - 1].FactoryMethod(width, height));
						Console.WriteLine("Item: {0} has been added!\n", products[products.Count - 1].GetType().Name);
						break;
					case "List items" or "4":
						if (products.Count <= 0)
						{
							Console.WriteLine("No items in the list.");
						}
						else
						{
							Console.WriteLine("The items in the order:");
							int i = 1;
							foreach (var item in products)
							{
								Console.WriteLine("{0} {1} with dimensions: {2}", i, item.GetType().Name, item.GetInfo());
								i++;
							}
						}
						Console.WriteLine(" ");
						break;
					case "Finish order" or "5":
						Console.Clear();
						break;
					default:
						Console.WriteLine("Unrecognised command!\n");
						break;
				}
				if (command == "5" || command == "Finish order")
				{
					break;
				}
			}
			while (true);

			if (products.Count <= 0)
			{
				Console.WriteLine("No items ordered. Have a nice day!");
			}
			else
			{
				Console.WriteLine("Order of: ");
				foreach (var item in products)
				{
					Console.WriteLine(item);
				}
				Console.WriteLine("is finished! Have a nice day!");
			}

		}
	}
}

interface FurnitureProducts
{
	string GetInfo();
}

class Chair : FurnitureProducts
{

	protected int width, height;

	public int Width { get { return width; } set { width = value; } }
	public int Height { get { return height; } set { height = value; } }

	public Chair(int w, int h)
	{
		Width = w;
		Height = h;
	}

	public string GetInfo()
	{
		return width.ToString() + " " + height.ToString();
	}

}

class Table : FurnitureProducts
{
	protected int width, height;

	public int Width { get { return width; } set { width = value; } }
	public int Height { get { return height; } set { height = value; } }

	public Table(int w, int h)
	{
		Width = w;
		Height = h;
	}

	public string GetInfo()
	{
		return width.ToString() + " " + height.ToString();
	}
}

class Bench : FurnitureProducts
{
	protected int width, height;

	public int Width { get { return width; } set { width = value; } }
	public int Height { get { return height; } set { height = value; } }

	public Bench(int w, int h)
	{
		Width = w;
		Height = h;
	}

	public string GetInfo()
	{
		return width.ToString() + " " + height.ToString();
	}
}

interface Creator
{
	public FurnitureProducts FactoryMethod(int w, int h);
}

class ChairCreator : Creator
{
	public FurnitureProducts FactoryMethod(int w, int h)
	{
		return new Chair(w, h);
	}
}

class TableCreator : Creator
{
	public FurnitureProducts FactoryMethod(int w, int h)
	{
		return new Table(w, h);
	}
}

class BenchCreator : Creator
{
	public FurnitureProducts FactoryMethod(int w, int h)
	{
		return new Bench(w, h);
	}
}