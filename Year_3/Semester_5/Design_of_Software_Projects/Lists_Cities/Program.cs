namespace Lists_Cities
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string command;
            List<Cities> cities = new List<Cities>();

            do
            {
				Console.Write("List of commands: \n 1. Add \n 2. Delete \n 3. Add Anywhere \n 4. List the cities \n 5. End \n Enter a command: ");
                command = Console.ReadLine();
                switch (command)
                {
                    case "Add" or "1":
                        Console.Write("Enter city name: ");
                        string cityName1 = Console.ReadLine();
						Console.Write("Enter post code for the city: ");
                        int postCode1 = int.Parse(Console.ReadLine());
                        Cities city1 = new Cities(cityName1, postCode1);
                        cities.Add(city1);
                        break;
                    case "Delete" or "2":
						Console.Write("Enter the name of the city to delete: ");
                        string cN = Console.ReadLine();
                        for (int i = 0; i < cities.Count; i++)
                        {
                            if (cities[i].CityName == cN)
                            {
                                Console.WriteLine("Removed " + cities[i].CityName + " from the list");
                                cities.Remove(cities[i]);
                                break;
                            }
                            else if (cities[i].CityName != cN)
                            {
                                i++;
                            }
						}
                        break;
                    case "Add Anywhere" or "3":
						Console.Write("Enter city name: ");
						string cityName2 = Console.ReadLine();
						Console.Write("Enter post code for the city: ");
						int postCode2 = int.Parse(Console.ReadLine());
						Console.Write("Enter the number of where the city should be in the list: ");
                        int listNumb = int.Parse(Console.ReadLine());
                        for (int i = 0; i < cities.Count; i++)
                        {
                            if (i == listNumb)
                            {
								Cities city2 = new Cities(cityName2, postCode2);
                                cities.Insert(i, city2);
								Console.WriteLine("Added " + city2.CityName + " after the element with number: " + i);
                            }
                        }
						break;
                    case "List the cities" or "4":
						foreach (var c in cities)
						{
							Console.WriteLine(c.CityName + " " + c.PostCode);
						}
                        break;
					case "End" or "5":
                        return;
                    default:
                        Console.WriteLine("Invalid command!");
                        break;
                }
            } while (command != "End" || command != "5");
        }
    }

    class Cities
    {
        public string CityName { get; set; }
        public int PostCode { get; set; }

        public Cities(string cn, int pc) { 
        
            CityName = cn;
            PostCode = pc;

        }

    }
}
