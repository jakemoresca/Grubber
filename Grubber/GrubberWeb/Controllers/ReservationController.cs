using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using GrubberApi.Models;
using GrubberWeb.Models;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GrubberWeb.Controllers
{
    [Route("api/[controller]")]
    public class ReservationController : Controller
    {
        private GrubberContext _context;
        public ReservationController(GrubberContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public async Task<BatchTripReservation> Post([FromBody]BatchTripReservation batchTripReservation)
        {
            _context.BatchTripReservations.Add(batchTripReservation);
            await _context.SaveChangesAsync();

            return batchTripReservation;
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
