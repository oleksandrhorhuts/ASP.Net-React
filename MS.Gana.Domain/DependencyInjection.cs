using MS.Gana.Data;
using MS.Gana.Data.Model;
using MS.Gana.Domain.Model;
using MS.Gana.Domain.Services;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MS.Gana.Domain
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDomainProject(this IServiceCollection services)
        {
            services.AddSingleton<DemoService>();
            services.AddAutoMapper(cfg =>
            {
                cfg.CreateMap<DemoModel, DemoModelDB>();
            });


            services.AddDataProject();
            return services;
        }
    }
}
