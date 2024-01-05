using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using MongoDB.Bson;
using MongoDB.Driver;
using MS.Gana.Domain.Model;
using System.Runtime.ConstrainedExecution;
using System.Xml.Linq;

namespace MS.GanaWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubjectController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public SubjectController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;
        }
        public class PaginatedData
        {
            public List<Subject>? Data { get; set; }
            public long TotalCount { get; set; }
        }
        [HttpGet]
        public async Task<JsonResult> Get(int page, int pageSize, string? clientId, string? positionNumber,
            string? declaration, string? plateNumber, string? transporterId, string? serviceTypeId, string? transportTypeId,
            string? goodsTypeId, string? countryId, string? cityId, int? cmrNumber, int? cimNumber, int? invoice)
        {
            

            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));
            var db = dbClient.GetDatabase("ProjectMS");
            var collection = db.GetCollection<Subject>("Subject");

            // Calculate the number of documents to skip based on the page and page size
            int skip = page * pageSize;


            var filterBuilder = Builders<Subject>.Filter;
            FilterDefinition<Subject> filter = filterBuilder.Empty; // Initialize an empty filter

            // Handle null values for query parameters
            
            if (!string.IsNullOrEmpty(clientId))
            {
                filter &= filterBuilder.Regex(s => s.ClientId, new BsonRegularExpression(clientId, "i"));
            }

            if (!string.IsNullOrEmpty(positionNumber))
            {
                filter &= filterBuilder.Regex(s => s.PositionNumber, new BsonRegularExpression(positionNumber, "i"));
            }
            if (!string.IsNullOrEmpty(declaration))
            {
                filter &= filterBuilder.Regex(s => s.Declaration, new BsonRegularExpression(declaration, "i"));
            }
            if (!string.IsNullOrEmpty(plateNumber))
            {
                filter &= filterBuilder.Regex(s => s.PlateNumber, new BsonRegularExpression(plateNumber, "i"));
            }
            if (!string.IsNullOrEmpty(transporterId))
            {
                filter &= filterBuilder.Regex(s => s.TransporterId, new BsonRegularExpression(transporterId, "i"));
            }
            if (!string.IsNullOrEmpty(serviceTypeId))
            {
                filter &= filterBuilder.Regex(s => s.ServiceTypeId, new BsonRegularExpression(serviceTypeId, "i"));
            }
            if (!string.IsNullOrEmpty(transportTypeId))
            {
                filter &= filterBuilder.Regex(s => s.TransportTypeId, new BsonRegularExpression(transportTypeId, "i"));
            }
            if (!string.IsNullOrEmpty(goodsTypeId))
            {
                filter &= filterBuilder.Regex(s => s.GoodsTypeId, new BsonRegularExpression(goodsTypeId, "i"));
            }
            if (!string.IsNullOrEmpty(countryId))
            {
                filter &= filterBuilder.Regex(s => s.Country, new BsonRegularExpression(countryId, "i"));
            }
            if (!string.IsNullOrEmpty(cityId))
            {
                filter &= filterBuilder.Regex(s => s.City, new BsonRegularExpression(cityId, "i"));
            }
             
            if (cmrNumber.HasValue && cmrNumber.Value != 0)
            {
                filter &= filterBuilder.Eq(s => s.CMRNumber, cmrNumber.Value);
            }
            if (cimNumber.HasValue && cimNumber.Value != 0)
            {
                filter &= filterBuilder.Eq(s => s.CIMNumber, cimNumber.Value);
            }
            if (invoice.HasValue && invoice.Value != 0)
            {
                filter &= filterBuilder.Eq(s => s.InvoiceNumber, invoice.Value);
            }


            long dbListLength = await collection.CountDocumentsAsync(filter);

            // Fetch the paginated data from the MongoDB collection with the specified filter
            var dbList = await collection.Find(filter)
                                          .Skip(skip)
                                          .Limit(pageSize)
                                          .ToListAsync();

            var paginatedData = new PaginatedData
            {
                Data = dbList,
                TotalCount = dbListLength
            };
            return new JsonResult(paginatedData);

        }

        [HttpGet("{id}")]
        public JsonResult OneGet(string id)
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));
            var dbList = dbClient.GetDatabase("ProjectMS").GetCollection<Subject>("Subject").AsQueryable();
            var subject = dbList.AsQueryable().FirstOrDefault(s => s.Id == ObjectId.Parse(id));

            return new JsonResult(subject);
        }
        [HttpPost]
        public JsonResult Post(Subject sub)
        {

            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));
            dbClient.GetDatabase("ProjectMS").GetCollection<Subject>("Subject").InsertOne(sub);

            return new JsonResult("Added Successfully");

        }
        [HttpPut("{id}")]
        public JsonResult Put(string id, Subject sub)
        {

            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));

            var filter = Builders<Subject>.Filter.Eq("_id", ObjectId.Parse(id));
            var update = Builders<Subject>.Update.Set("ClientId", sub.ClientId)
                                                 .Set("PositionNumber", sub.PositionNumber)
                                                 .Set("Declaration", sub.Declaration)
                                                 .Set("CMRNumber", sub.CMRNumber)
                                                 .Set("CMRFilePath", sub.CMRFilePath)
                                                 .Set("CIMNumber", sub.CIMNumber)
                                                 .Set("CIMFilePath", sub.CIMFilePath)
                                                 .Set("Record", sub.Record)
                                                 .Set("TransporterId", sub.TransporterId)
                                                 .Set("PlateNumber", sub.PlateNumber)
                                                 .Set("ServiceTypeId", sub.ServiceTypeId)
                                                 .Set("TransportTypeId", sub.TransportTypeId)
                                                 .Set("GoodsTypeId", sub.GoodsTypeId)
                                                 .Set("InvoiceNumber", sub.InvoiceNumber)
                                                 .Set("InvoiceFilePath", sub.InvoiceFilePath)
                                                 .Set("Country", sub.Country)
                                                 .Set("City", sub.City)
                                                 .Set("DepartureDate", sub.DepartureDate)
                                                 .Set("ArrivalDate", sub.ArrivalDate)
                                                 .Set("IsArrived", sub.IsArrived)
                                                 .Set("Notes", sub.Notes)
                                                 .Set("Documents", sub.Documents);
                

            dbClient.GetDatabase("ProjectMS").GetCollection<Subject>("Subject").UpdateOne(filter, update);
            return new JsonResult("Updated Successfully");



        }
        [HttpDelete("{id}")]
        public JsonResult Delete(string id)
        {

            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));

            var filter = Builders<Subject>.Filter.Eq("_id", ObjectId.Parse(id));

            dbClient.GetDatabase("ProjectMS").GetCollection<Subject>("Subject").DeleteOne(filter);

            return new JsonResult("Deleted Successfully");

        }
        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Uploadfiles/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }
                return new JsonResult(filename);
            }
            catch
            {
                return new JsonResult("anonymous.png");
            }
        }
    }
}
