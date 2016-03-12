using GrubberApi.Models;
using GrubberWeb.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GrubberWeb.Database
{
    public class DBInitializer
    {
        private GrubberContext _ctx;
        private UserManager<ApplicationUser> _userManager;

        public DBInitializer(GrubberContext ctx, UserManager<ApplicationUser> userManager)
        {
            _ctx = ctx;
            _userManager = userManager;
        }

        public async Task InitializeDataAsync()
        {
            await CreateUsersAsync();
        }

        private async Task CreateUsersAsync()
        {
            var pwHasher = new PasswordHasher<ApplicationUser>();

            var driver = new ApplicationUser
            {
                UserId = 1,
                Email = "testdriver@infor.com",
                CarId = 1,
                UserName = "testdriver"
            };
//            driver.PasswordHash = pwHasher.HashPassword(driver, "driver");

            var passenger = new ApplicationUser
            {
                UserId = 2,
                Email = "passenger1@infor.com",
                UserName = "passenger1"
            };
            //          driver.PasswordHash = pwHasher.HashPassword(passenger, "passenger");
            await _userManager.CreateAsync(driver);
            await _userManager.CreateAsync(passenger);
            await _userManager.AddPasswordAsync(driver, "driver");
            await _userManager.AddPasswordAsync(passenger, "passenger");
        }

        private async Task CreateUserAsync(ApplicationUser newUser)
        {
            var user = await _userManager.FindByEmailAsync(newUser.Email);
            if (user == null)
            {
                await _userManager.CreateAsync(newUser);
            }
        }
    }
}
