using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using GrubberApi.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GrubberApi.Controllers
{
    public class CarMakeController : Controller
    {
        private GrubberContext _context;
        public CarMakeController(GrubberContext context)
        {
            _context = context;
        }

        [HttpGet("api/carmake")]
        public CarMake[] Get()
        {
            return _context.CarMakes.ToArray();
        }

        [HttpGet("api/carmake/{id}")]
        public CarMake Get(int id)
        {
            return _context.CarMakes.FirstOrDefault(cm => cm.Id == id);
        }
    }
}
