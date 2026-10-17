using System.Linq;

namespace _3_1zad;

public class City
{
    public string CityName { get; set; }
    public int PostalCode { get; set; }

    public City(string name, int postalCode)
    {
        CityName = name;
        PostalCode = postalCode;
    }

    public delegate void CityDelegate(City city);

}
