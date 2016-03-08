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
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public int TripScheduleId { get; set; }
        public TripSchedule TripSchedule { get; set; }
    }
}
