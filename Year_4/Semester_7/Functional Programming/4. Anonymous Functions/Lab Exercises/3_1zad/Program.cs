namespace _3_1zad;

class Program
{
    static void Main(string[] args)
    {
        City.CityDelegate displayCity = delegate (City city)
        {
            Console.WriteLine($"City: {city.CityName} | Postal Code: {city.PostalCode}");
        };

        List<City> cities = [
            new City("Gabrovo", 5300),
            new City("Sofia", 1000),
            new City("Plovdiv", 4000),
            new City("Varna", 9000),
            new City("Burgas", 8000)
        ];

        while (true)
        {
            Console.Write("Choose an option: \n 1. Display cities \n 2. Add a city \n 3. Exit \n");

            if (!int.TryParse(Console.ReadLine(), out int option))
            {
                Console.WriteLine("Please enter a valid option.");
                continue;
            }

            switch (option)
            {
                case 1:
                    DisplayCities(cities, displayCity);
                    break;

                case 2:
                    AddCity(cities);
                    break;

                case 3:
                    return;

                default:
                    Console.WriteLine("Please choose an option from 1 to 3.");
                    break;
            }
        }
    }

    static void DisplayCities(List<City> cities, City.CityDelegate displayCity)
    {
        foreach (City city in cities)
        {
            displayCity(city);
        }
    }

    static void AddCity(List<City> cities)
    {
        Console.Write("Enter the city name: ");
        string cityName = Console.ReadLine()!;

        Console.Write("Enter the postal code: ");
        if (!int.TryParse(Console.ReadLine(), out int postalCode))
        {
            Console.WriteLine("Please enter a valid postal code.");
            return;
        }

        cities.Add(new City(cityName, postalCode));
        Console.WriteLine("The city was added.");
    }
}
