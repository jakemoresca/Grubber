using System.Collections.Generic;
using Microsoft.AspNet.Mvc;
using GrubberApi.Models;
using GrubberWeb.Models;
using System.Threading.Tasks;
using GrubberWeb.ViewModels;
using GrubberWeb.Mappers;
using System.Linq;
using Microsoft.Data.Entity;
using Microsoft.AspNet.Identity;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GrubberWeb.Controllers
{

    public class ReservationController : Controller
    {
        private GrubberContext _context;
        private ITripReservationMapper _reservationMapper;
        private ITripScheduleMapper _scheduleMapper;
        private UserManager<ApplicationUser> _userManager;
        public ReservationController(GrubberContext context, ITripReservationMapper reservationMapper, ITripScheduleMapper scheduleMapper, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _reservationMapper = reservationMapper;
            _scheduleMapper = scheduleMapper;
            _userManager = userManager;
        }

        // GET: api/values
        [Route("api/reservation")]
        [HttpGet]
        public async Task<TripScheduleViewModel[]> Get()
        {
            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            var batchTripScheduleModels = await _context.TripSchedules
                .Include(ts => ts.TripLandMarks).Include(ts => ts.TripReservations)
                .Where(ts => ts.UserId == user.Id).ToListAsync();

            return batchTripScheduleModels.Select(b => _scheduleMapper.ToViewModel(b, true)).ToArray();
        }

        // POST api/values
        [Route("api/reservation")]
        [HttpPost]
        public async Task<BatchTripReservationViewModel> Post([FromBody]BatchTripReservationViewModel batchTripReservation)
        {
            var batchTripReservationModel = _reservationMapper.ToModel(batchTripReservation);

            _context.BatchTripReservations.Add(batchTripReservationModel);
            await _context.SaveChangesAsync();

            var batchTripReservationViewModel = _reservationMapper.ToViewModel(batchTripReservationModel);

            return batchTripReservationViewModel;
        }


    }
}
