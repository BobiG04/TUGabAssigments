using System;

namespace Factory_Shapes
{
	class Program
	{
		public static void Main(string[] args)
		{
			Console.Write("Enter the number of shapes: ");
			int numbObjects = int.Parse(Console.ReadLine());
			Creator[] creators = new Creator[numbObjects];
			Shape[] shapes = new Shape[numbObjects];

			string command = "";
			for (int i = 0; i < shapes.Length; i++)
			{
				Console.Write("List of commands: \n 1 Make a Circle \n 2 Make a Rectangle \n 3 Make a Square \n 4 Check List \n 5 Calculate Areas \n 6 End Program \nEnter a command: ");
				command = Console.ReadLine();
				switch (command)
				{
					case "Make a Circle" or "1":
						Console.Write("Enter the radius: ");
						int r = int.Parse(Console.ReadLine());
						creators[i] = new CircleCreator(r);
						shapes[i] = creators[i].FactoryMethod();
						Console.WriteLine("Created {0}", shapes[i].GetType().Name);
						break;
					case "Make a Rectangle" or "2":
						Console.Write("Enter the width: ");
						int w = int.Parse(Console.ReadLine());
						Console.Write("Enter the height: ");
						int h = int.Parse(Console.ReadLine());
						creators[i] = new RectangleCreator(w, h);
						shapes[i] = creators[i].FactoryMethod();
						Console.WriteLine("Created {0}", shapes[i].GetType().Name);
						break;
					case "Make a Square" or "3":
						Console.Write("Enter the side lenght: ");
						int a = int.Parse(Console.ReadLine());
						creators[i] = new SquareCreator(a);
						shapes[i] = creators[i].FactoryMethod();
						Console.WriteLine("Created {0}", shapes[i].GetType().Name);
						break;
					case "Check List" or "4":
						foreach (var shape in shapes)
						{
							Console.WriteLine("{0}", shape);
						}
						i--;
						break;
					case "Calculate Areas" or "5":
						Console.Write("Enter the number in the list of shapes: ");
						int listNum = int.Parse(Console.ReadLine());
						for (int j = 0; j < shapes.Length; j++)
						{
							if (j == listNum && shapes[j] != null)
								Console.WriteLine("The area of {0} is: {1}", shapes[j].GetType().Name, shapes[j].Area());
							else
							{
								Console.WriteLine("No shape found!");
								return;
							}
						}
						i--;
						break;
					case "End Program" or "6":
						return;
					default:
						break;
				}
			}

			do
			{
				Console.Write("List of commands: \n 4 Check List \n 6 End program \nEnter a command: ");
				command = Console.ReadLine();
				switch (command)
				{
					case "Check List" or "4":
						foreach (var shape in shapes)
						{
							Console.WriteLine("{0}", shape);
						}
						break;
					case "Calculate Areas" or "5":
						int listNum = int.Parse(Console.ReadLine());
						foreach (var item in shapes)
						{
							Console.WriteLine("The area of {0} is: {1}", item.GetType().Name, item.Area());
						}
						break;
					case "End Program" or "6":
						return;
					default:
						break;
				}
			} while (command != "5");

			/*creators[0] = new CircleCreator();
			creators[1] = new RectangleCreator();
			creators[2] = new SquareCreator();

			foreach (var creator in creators) {
				Shape shape = creator.FactoryMethod();
				Console.WriteLine("Created {0}", shape.GetType().Name);
			}*/
		}
	}

	abstract class Shape
	{
		public abstract double Area();
	}// Product class
	
	class Circle : Shape // Product A
	{
		protected int radius;

		public int Radius { get { return radius; } set { radius = value; }  }

		public Circle(int r)
		{
			Radius = r;
		}

		public override double Area()
		{
			return Math.PI * radius * radius;
		}
	}

	class Rectangle : Shape // Product B
	{
		protected int width;
		protected int height;

		public int Width { get { return width;  } set { width = value; }  }
		public int Height { get { return height; } set { height = value; }  }

		public Rectangle(int w, int h)
		{
			Width = w;
			Height = h;
		}

		public override double Area()
		{
			return width * height;
		}
	}

	class Square : Shape // Product C
	{
		protected int a;
		public int A { get { return a; } set { a = value; }  }

		public Square (int aSide)
		{
			A = aSide;
		}

		public override double Area()
		{
			return a * a;
		}
	}

	abstract class Creator
	{
		public abstract Shape FactoryMethod();
	}

	class CircleCreator (int r) : Creator
	{
		public override Shape FactoryMethod()
		{
			return new Circle(r);
		}
	}

	class RectangleCreator (int w, int h) : Creator
	{
		public override Shape FactoryMethod()
		{
			return new Rectangle(w, h);
		}
	}

	class SquareCreator (int a) : Creator
	{
		public override Shape FactoryMethod()
		{
			return new Square(a);
		}
	}
}