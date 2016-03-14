using GrubberWeb.Models;

namespace GrubberApi.Models
{
    public class Car
    {
        public int Id { get; set; }
        public int MakeId { get; set; }
        public CarMake Make { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public string PlateNo { get; set; }
        public int NoOfSeats { get; set; }
        public ApplicationUser User { get; set; }
        public string UserId { get; set; }
    }
}
