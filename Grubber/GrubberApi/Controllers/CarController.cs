using System.Linq;
using Microsoft.AspNet.Mvc;
using GrubberApi.Models;

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
    }
}
