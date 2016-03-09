namespace GrubberWeb.ViewModels
{
    public class TripLandMarkViewModel
    {
        public int Id { get; set; }
        public string LandMarkName { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }

        public bool IsNew { get; set; }
    }
}
