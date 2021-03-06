﻿using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNet.Mvc;
using GrubberApi.Models;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace GrubberApi.Controllers
{
    public class PeopleController : Controller
    {
        [HttpGet("api/people")]
        public Person[] Get()
        {
            var people = new List<Person>();
            people.Add(new Person() { Id = 1, First = "Shayne", Last = "Boyer", Age = 42, FavoriteBeer = "Guiness" });
            people.Add(new Person() { Id = 2, First = "Kirsty", Last = "Boyer", Age = 38, FavoriteBeer = "Golden Monkey" });
            people.Add(new Person() { Id = 3, First = "Jen", Last = "Lockrem", Age = 38, FavoriteBeer = "Golden Monkey" });
            people.Add(new Person() { Id = 4, First = "Wes", Last = "Smith", Age = 50, FavoriteBeer = "Michelob Ultra" });
            people.Add(new Person() { Id = 5, First = "Chris", Last = "Goodreau", Age = 52, FavoriteBeer = "Miller Lite" });

            return people.ToArray();
        }

        [HttpGet("api/people/{id}")]
        public Person Get(int id)
        {
            return Get().Where(p => p.Id == id).FirstOrDefault();
        }
    }
}
