namespace Vehicles
{
    internal class Program
    {
        static void Main(string[] args)
        {
            VehicleBuilder[] vehicleBuilders = new VehicleBuilder[2]; 
            Director producer = new Director(); 
            
            vehicleBuilders[0] = new CarBuilder(); 
            producer.Construct(vehicleBuilders[0]); 
            vehicleBuilders[0].Vehicle.Show(); 
            Console.WriteLine(); 
            vehicleBuilders[1] = new MotorcycleBuilder(); 
            producer.Construct(vehicleBuilders[1]); 
            vehicleBuilders[1].Vehicle.Show();
            Console.WriteLine();
            vehicleBuilders[2] = new BusBuilder();
            producer.Construct(vehicleBuilders[2]);
            vehicleBuilders[2].Vehicle.Show();
            Console.WriteLine();
        }
    }
}
