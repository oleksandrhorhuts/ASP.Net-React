using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MS.Gana.Domain.Model
{
    public class City
    {
        public ObjectId Id { get; set; }
        public string? CityName { get; set; }

    }
}
