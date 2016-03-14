using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using GrubberWeb.ViewModels;
using Microsoft.AspNet.Identity;
using GrubberWeb.Models;
using Microsoft.AspNet.Authorization;
using GrubberApi.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GrubberWeb.Controllers
{
    public class AccountController : Controller
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private GrubberContext _context;

        public AccountController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, GrubberContext context)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _context = context;
        }

        [Route("api/account/login")]
        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] LoginViewModel model)
        {
            // Verify that the model is valid according to the validation rules
            // in the model itself.  If it isn't valid, return a 400 Bad Request
            // with some JSON reviewing the errors
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }

            // Find the user in our database.  If the user does not exist, then
            // return a 400 Bad Request with a general error.
            var user = await _userManager.FindByNameAsync(model.UserName);
            if (user == null)
            {
                ModelState.AddModelError("", "Invalid Username or Password");
                return new BadRequestObjectResult(ModelState);
            }
            // If the user has not confirmed his/her email address, then return a
            // 400 Bad Request with a request to activate the account.
            //if (!user.EmailConfirmed)
            //{
            //    ModelState.AddModelError("Email", "Please activate your account");
            //    return new BadRequestObjectResult(ModelState);
            //}
            // Authenticate the user with the Sign-In Manager
            //var result = await signInManager.SignInAsync(user, false);
            await _signInManager.SignInAsync(user, false);
            // If the authentication failed, add the same error that we add when
            // we can't find the user (so you can't tell the difference between
            // a bad username and a bad password) and return a 400 Bad Request
            //if (!result.Succeeded)
            //{
            //    ModelState.AddModelError("", "Invalid Username or Password");
            //    return new BadRequestObjectResult(ModelState);
            //}

            return new HttpStatusCodeResult(200);
        }

        [Route("api/account/logout")]
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return new HttpStatusCodeResult(200);
        }

        [Route("api/account/getcurrentuser")]
        [HttpGet]
        public async Task<ApplicationUser> GetCurrentUser()
        {
            if (User.Identity.Name == null)
                return new ApplicationUser();

            var user = await _userManager.FindByNameAsync(User.Identity.Name);
            return user;
        }

        [Route("api/account/")]
        [HttpGet]
        public ApplicationUser[] Get()
        {
            return _context.Users.ToArray();
        }
    }
}
