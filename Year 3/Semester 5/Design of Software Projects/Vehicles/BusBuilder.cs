namespace Vehicles
{
    public class BusBuilder : VehicleBuilder
    {
        public BusBuilder()
        {
            vehicle = new Vehicle("Bus");
        }
        public override void BuildFrame()
        {
            vehicle.Add("Bus Frame");
        }
        public override void BuildEngine()
        {
            vehicle.Add("Engine 6000 cc");
        }
        public override void BuildWheels()
        {
            vehicle.Add("Wheels 6");
        }
        public override void BuildDoors()
        {
            vehicle.Add("Doors 2");
        }
        public override void BuildSeats()
        {
            vehicle.Add("Seats 40");
        }
    }
}
