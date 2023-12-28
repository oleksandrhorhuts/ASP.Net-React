using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using MS.Gana.Domain.Model;

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
        [HttpGet]
        public JsonResult Get()
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));
            var dbList = dbClient.GetDatabase("ProjectMS").GetCollection<Subject>("Subject").AsQueryable();

            return new JsonResult(dbList);
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
