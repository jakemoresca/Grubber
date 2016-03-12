using GrubberApi.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace GrubberWeb.Models
{
    public class ApplicationUser : IdentityUser
    {
        [Key]
        public int UserId { get; set; }
        public int? CarId { get; set; }
        public Car Car { get; set; }
    }
}
