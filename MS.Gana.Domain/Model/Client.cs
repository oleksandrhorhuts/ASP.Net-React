using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Bson;

namespace MS.Gana.Domain.Model
{
    public class Client
    {
        public ObjectId Id {  get; set; }   
        public string? ClientName { get; set; }

    }
}
