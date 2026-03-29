namespace Vehicles
{
    public class CarBuilder : VehicleBuilder
    {

        public CarBuilder() { 
            vehicle = new Vehicle("Car"); 
        }
        public override void BuildFrame() { 
            vehicle.Add("CarFrame"); 
        }
        public override void BuildEngine() { 
            vehicle.Add("Engine 2500 cc"); 
        }
        public override void BuildWheels() { 
            vehicle.Add("Wheels 4"); 
        }
        public override void BuildDoors() { 
            vehicle.Add("Doors 4"); 
        }
        public override void BuildSeats() {
            vehicle.Add("Seats 5");
        }

    }
}
