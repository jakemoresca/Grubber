using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNet.Mvc.Formatters;
using GrubberApi.Models;
using Microsoft.Data.Entity;
using GrubberWeb.Mappers;
using Microsoft.AspNet.Diagnostics;
using GrubberWeb.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using GrubberWeb.Database;

namespace GrubberWeb
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            // Set up configuration sources.
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; set; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddMvc(options =>
            {
                (options.OutputFormatters.First(f => f is JsonOutputFormatter) as JsonOutputFormatter)
                    .SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                (options.OutputFormatters.First(f => f is JsonOutputFormatter) as JsonOutputFormatter)
                    .SerializerSettings.DateFormatHandling = Newtonsoft.Json.DateFormatHandling.IsoDateFormat;
            });
            // Add application services.
            services.AddTransient<ITripScheduleMapper, TripScheduleMapper>();
            services.AddTransient<ITripReservationMapper, TripReservationMapper>();
            services.AddTransient<DBInitializer>();
            //services.AddTransient<ISmsSender, AuthMessageSender>();

            var connection = @"Server=.\tdcidev;Database=Grubber;Trusted_Connection=True;";
            //var connection = @"Server=.\SQLEXPRESS;Database=Grubber;Trusted_Connection=True;";

            services.AddEntityFramework()
                .AddSqlServer()
                .AddDbContext<GrubberContext>(options => options.UseSqlServer(connection));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<GrubberContext>()
                .AddDefaultTokenProviders();

            services.AddMvc().AddJsonOptions(options => {
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public async void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory, DBInitializer dbInitializer)
        {
            app.UseStaticFiles();
            app.UseIdentity();
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseIISPlatformHandler(options => options.AuthenticationDescriptions.Clear());

            app.UseStaticFiles();

            //app.UseIdentity();

            // To configure external authentication please see http://go.microsoft.com/fwlink/?LinkID=532715

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            await dbInitializer.InitializeDataAsync();
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
