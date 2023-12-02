using MS.Gana.Data.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MS.Gana.Data
{
    public class DemoDB
    {

        public DemoModelDB Get(int id)
        {
            return new DemoModelDB()
            {
                ID = 750
            };
        }
    }
}
