using AutoMapper;
using MS.Gana.Data;
using MS.Gana.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MS.Gana.Domain.Services
{
    public class DemoService
    {
        public DemoModel Model { get; set; }

        public DemoService(IMapper mapper, DemoDB db)
        {
            var dbModel = db.Get(0);

            this.Model = mapper.Map<DemoModel>(dbModel);
        }
    }
}
