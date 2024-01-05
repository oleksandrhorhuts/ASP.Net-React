using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using MS.Gana.Domain.Model;

namespace MS.GanaWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ClientController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));
            var dbList = dbClient.GetDatabase("ProjectMS").GetCollection<Client>("Client").AsQueryable();

            return new JsonResult(dbList);
        }
        
        [Route("RelationTable")]
        [HttpGet]
        public JsonResult RelationTable()
        {
            try
            {
                MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));
                var subjectCollection = dbClient.GetDatabase("ProjectMS").GetCollection<Subject>("Subject");

                var subjects = subjectCollection.Aggregate()
                    .Lookup("Client", "ClientId", "_id", "ClientName")
                    .Lookup("GoodsType", "GoodsTypeId", "_id", "GoodsTypeName")                   
                    .ToList();

                return new JsonResult(subjects);
            }
            catch
            {
                // Log the exception or handle it as needed
                return new JsonResult("Internal Server Error");
            }
        }


        [HttpPost]
        public JsonResult Post(Client cli)
        {

            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));
            dbClient.GetDatabase("ProjectMS").GetCollection<Client>("Client").InsertOne(cli);

            return new JsonResult("Added Successfully");

        }
        [HttpPut("{id}")]
        public JsonResult Put(string id, Client cli)
        {

            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));

            var filter = Builders<Client>.Filter.Eq("_id", ObjectId.Parse(id));
            var update = Builders<Client>.Update.Set("ClientName", cli.ClientName);

            dbClient.GetDatabase("ProjectMS").GetCollection<Client>("Client").UpdateOne(filter, update);
            return new JsonResult("Updated Successfully");



        }
        [HttpDelete("{id}")]
        public JsonResult Delete(string id)
        {

            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));

            var filter = Builders<Client>.Filter.Eq("_id", ObjectId.Parse(id));

            dbClient.GetDatabase("ProjectMS").GetCollection<Client>("Client").DeleteOne(filter);

            return new JsonResult("Deleted Successfully");

        }


    }
}
