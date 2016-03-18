using System.Collections.Generic;

namespace GrubberWeb.ViewModels
{
    public class BatchTripReservationViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public IList<TripReservationViewModel> Reservations { get; set; }
        public int? AcceptedTripReservationId { get; set; }
    }
}
