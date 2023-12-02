using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MS.Gana.Data
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddDataProject(this IServiceCollection services)
        {
            services.AddTransient<DemoDB>();
            return services;
        }
    }
}
