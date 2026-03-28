// Да се създаде конзолно приложение, работещо с едномерен масив от цели n числа. От клавиатурата се въвеждат команди докато не се изпише
// командата End. Командата Insert добавя стойност на определено място, според индекса и стойността, въведени от потребителя. Команда
// Delete изтрива елемент от определен index. Команда Search търси определена стойност и издвежда на коя позиция в масива се намира.
// Ако не се намира се извежда грешка. В края на програмата се извежда масива с n на брой елемента и съответно техните стойности.

using System;

namespace Arrays
{
	internal class Program
	{
		static void Main(string[] args)
		{
			string command = "";
            Console.WriteLine("How big is the array?");
            int n = int.Parse(Console.ReadLine());
			int[] Array = new int[n];

			do {

                Console.WriteLine("Enter command: ");
                command = Console.ReadLine();

				switch (command)
				{
					case "Insert":
                        Console.WriteLine("Enter index:");
                        int index = int.Parse(Console.ReadLine());
                        Console.WriteLine("Enter value:");
                        int value = int.Parse(Console.ReadLine());
						Array[index] = value;
						// add method
						break;
					case "Delete":
						Console.WriteLine("Delete element from index of: ");
						index = int.Parse(Console.ReadLine());
						Array[index] = 0;
						// add method
						break;
					case "Search":
                        Console.WriteLine("Enter value to search in array: ");
                        value = int.Parse(Console.ReadLine());
						index = -1;
                        for (int i = 0; i < Array.Length; i++)
                        {
							if (Array[i]==value)
							{
								index = i;
								break;
							}
                        }						if (index != -1)
						{
							Console.WriteLine("The element is on the index of: " + index);
                        } else
						{
                            Console.WriteLine("EROOOR");
                        }
                        // add method
                        break;
				}

			} while (command != "End");

            Console.WriteLine("Result: ");
            foreach (int item in Array)
            {
				Console.Write(item + " ");
            }
            Console.WriteLine();
        }

		public static void InsertValues(int arrIndex, int indexVal)
		{

		}

		public static void DeleteValues(int arrIndex)
		{

		}

		public static void SearchValues(int value)
		{

		}

		// command Insert, input index and value in the array
		// command Delete, input index to delete
		// command Search, input value, output array index or index not found
	}
}
