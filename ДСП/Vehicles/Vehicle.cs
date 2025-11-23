namespace Vehicles
{
    public class Vehicle
    {

        private string vehicleType; 
        private List<string> parts = new List<string>(); 
        public Vehicle(string type) { 
            vehicleType = type; 
        }
        public void Add(string part) {
            parts.Add(part); 
        }
        public void Show() {
            Console.WriteLine(vehicleType); 
            foreach (string part in parts) { 
                Console.WriteLine(part); 
            } 
        }

    }
}
