using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GrubberApi.Models
{
    public class TripLandMark
    {
        public int Id { get; set; }
        public string LandMarkName { get; set; }
        public int Latitude { get; set; }
        public int Longitude { get; set; }
        public int TripScheduleId { get; set; }
        public TripSchedule TripSchedule { get; set; }
    }
}
