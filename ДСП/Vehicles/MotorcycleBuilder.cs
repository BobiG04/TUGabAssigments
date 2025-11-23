using System;
using System.Collections.Generic;
using System.Text;

namespace Vehicles
{
    public class MotorcycleBuilder : VehicleBuilder
    {
        public MotorcycleBuilder()
        {
            vehicle = new Vehicle("Motorcycle");
        }
        public override void BuildFrame()
        {
            vehicle.Add("Motorcycle Frame");
        }
        public override void BuildEngine()
        {
            vehicle.Add("Engine 500 cc");
        }
        public override void BuildWheels()
        {
            vehicle.Add("Wheels 2");
        }
        public override void BuildDoors()
        {
            vehicle.Add("Doors 0");
        }
        public override void BuildSeats()
        {
            vehicle.Add("Seats 2");
        }
    }
    
}

