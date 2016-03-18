using GrubberApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GrubberWeb.Models
{
    public class TripReservation
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string TripStart { get; set; }
        public float TripStartLat {get; set;}
        public float TripStartLng {get; set;}
        public string TripTo { get; set; }
        public float TripToLat {get; set;}
        public float TripToLng {get; set;}
        public int TripScheduleId {get; set;}
        public TripSchedule TripSchedule { get; set; }
        public ReservationStatus Status { get; set; }
    }

    public enum ReservationStatus
    {
        Requested = 0,
        Accepted = 1,
        Rejected = 2,
        OnTrip = 3,
        Done = 4,
        AcceptedByOther = 5
    }
}
