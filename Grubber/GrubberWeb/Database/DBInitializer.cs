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
            await CreateCarMakesAsync();
        }

        private async Task CreateUsersAsync()
        {
            var pwHasher = new PasswordHasher<ApplicationUser>();

            var driver = new ApplicationUser
            {
                Email = "testdriver@infor.com",
                UserName = "testdriver"
            };
//            driver.PasswordHash = pwHasher.HashPassword(driver, "driver");

            var passenger = new ApplicationUser
            {
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

        private async Task CreateCarMakesAsync()
        {
            var bmw = new CarMake { Name = "BMW" };
            var chevrolet = new CarMake { Name = "Chevrolet" };
            var chrysler = new CarMake { Name = "Chrysler" };
            var ferrari = new CarMake { Name = "Ferrari" };
            var ford = new CarMake { Name = "Ford" };
            var honda = new CarMake { Name = "Honda" };
            var hyundai = new CarMake { Name = "Hyundai" };
            var kia = new CarMake { Name = "Kia" };
            var lamborghini = new CarMake { Name = "Lamborghini" };
            var lexus = new CarMake { Name = "Lexus" };
            var maserati = new CarMake { Name = "Maserati" };
            var mazda = new CarMake { Name = "Mazda" };
            var mclaren = new CarMake { Name = "McLaren" };
            var mercedesBenz = new CarMake { Name = "Mercedes-Benz" };
            var mini = new CarMake { Name = "Mini" };
            var mitsubishi = new CarMake { Name = "Mitsubishi" };
            var nissan = new CarMake { Name = "Nissan" };
            var peugeot = new CarMake { Name = "Peugeot" };
            var porsche = new CarMake { Name = "Porsche" };
            var rollsRoyce = new CarMake { Name = "Rolls Royce" };
            var subaru = new CarMake { Name = "Subaru" };
            var suzuki = new CarMake { Name = "suzuki" };
            var tata = new CarMake { Name = "Tata" };
            var toyota = new CarMake { Name = "Toyota" };
            var volkswagen = new CarMake { Name = "Volkswagen" };
            var volvo = new CarMake { Name = "Volvo" };

            var carMakesToAdd = new List<CarMake>
            {
                bmw, chevrolet, chrysler, ferrari, ford, honda, hyundai, kia, lamborghini, lexus, maserati, mazda, mclaren, mercedesBenz,
                mini, mitsubishi, nissan, peugeot, porsche, rollsRoyce, subaru, suzuki, tata, toyota, volkswagen, volvo
            };

            foreach (var carMakeToAdd in carMakesToAdd)
            {
                await CreateCarMakeAsync(carMakeToAdd);
            }
        }

        private async Task CreateCarMakeAsync(CarMake carMake)
        {
            var existingCarMake = _ctx.CarMakes.FirstOrDefault(cm => cm.Name == carMake.Name);
            if(existingCarMake == null)
            {
                _ctx.CarMakes.Add(carMake);
                await _ctx.SaveChangesAsync();
            }
        }
    }
}
