using System;
using System.Collections.Generic;
using System.Text;

namespace Vehicles
{
    internal class Director
    {
        public void Construct(VehicleBuilder vehicleBuilder) { 
            vehicleBuilder.BuildFrame(); 
            vehicleBuilder.BuildEngine(); 
            vehicleBuilder.BuildWheels(); 
            vehicleBuilder.BuildDoors(); 
            vehicleBuilder.BuildSeats();
        }
    }
}
