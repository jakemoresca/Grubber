namespace GrubberWeb.ViewModels
{
    public class TripReservationViewModel
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public string TripStart { get; set; }
        public float TripStartLat { get; set; }
        public float TripStartLng { get; set; }
        public string TripTo { get; set; }
        public float TripToLat { get; set; }
        public float TripToLng { get; set; }
        public int TripScheduleId { get; set; }
        public int Status { get; set; }
    }
}
