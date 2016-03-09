using System.Linq;
using Microsoft.AspNet.Mvc;
using GrubberApi.Models;
using System.Threading.Tasks;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GrubberApi.Controllers
{
    public class CarController : Controller
    {
        private GrubberContext _context;
        public CarController(GrubberContext context)
        {
            _context = context;
        }

        [HttpGet("api/car")]
        public Car[] Get()
        {
            return _context.Cars.ToArray();
        }

        [HttpGet("api/car/{id}")]
        public Car Get(int id)
        {
            return _context.Cars.FirstOrDefault(c => c.Id == id);
        }

        [HttpPost("api/car")]
        public async Task<Car> Post([FromBody]Car car)
        {
            if(car.Id > 0)
                _context.Update(car);
            else
                _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return car;
        }
    }
}
