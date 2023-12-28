using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MS.Gana.Domain.Model
{
    public class Subject
    {
        public ObjectId Id { get; set; }

        //Basic Info
        public string? ClientId { get; set; }
        public string? PositionNumber { get; set;}
        public string? Declaration { get; set; }
        public int? CMRNumber { get; set; }
        public string? CMRFilePath { get; set; }
        public int? CIMNumber { get; set;}
        public string? CIMFilePath { get; set; }
        public DateTime Record { get; set; }

        //Transport
        public string? TransporterId { get; set; }
        public string? PlateNumber { get; set; }
        public string? ServiceTypeId { get; set; }
        public string? TransportTypeId { get; set; }
        public string? GoodsTypeId { get; set; } 
        
        //Invoice
        public int? InvoiceNumber { get; set; }
        public string? InvoiceFilePath { get; set; }

        //Documents
        public List<Document>? Documents { get; set; }


        //Destination
        public string? Country { get; set; }
        public string? City { get; set; }
        public DateTime? DepartureDate { get; set; }
        public DateTime? ArrivalDate { get; set; }
        public bool? IsArrived { get; set; }

        //Extras
        public string? Notes { get; set; }
    }
}
