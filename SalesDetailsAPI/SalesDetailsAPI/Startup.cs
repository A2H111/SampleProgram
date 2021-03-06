using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using SalesDetailsAPI.DataAccess;
using Microsoft.EntityFrameworkCore;
using SalesDetailsAPI.Repository;

namespace SalesDetailsAPI
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddDbContext<SalesDBContext>(options => options.UseSqlite("Data Source=./salesdetails.db"));
            services.AddSingleton<ISalesRepository, SalesRepository>(serviceProvider => {
                var builder = new DbContextOptionsBuilder<SalesDBContext>();
                builder.UseSqlite("Data Source=./salesdetails.db");
                return new SalesRepository(builder.Options);
            });
            services.AddCors(options =>
            {
        //        options.AddDefaultPolicy(
        //builder =>
        //{
        //    builder.WithOrigins("https://localhost:44331")
        //    .AllowAnyHeader()
        //    .AllowAnyMethod()
        //    .AllowCredentials();
        //});
                options.AddPolicy(name: "SalesDetailsCorsPolicy",
                                  builder =>
                                  {
                                      builder.WithOrigins("http://localhost:4200")
                                      .AllowAnyHeader()
                                      .AllowAnyMethod()
                                      .AllowCredentials();
                                  });
            });
            services.AddControllers();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("SalesDetailsCorsPolicy");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
