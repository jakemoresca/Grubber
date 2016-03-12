using GrubberApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GrubberWeb.Models
{
    public class BatchTripReservation
    {
        public int Id { get; set; }
        public List<TripReservation> Reservations { get; set; }
        public int? AcceptedTripReservationId {get; set;}
        public TripReservation AcceptedTripReservation {get; set;}
    }
}
