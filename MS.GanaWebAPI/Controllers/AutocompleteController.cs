using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using MS.Gana.Domain.Model;

namespace MS.GanaWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AutocompleteController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public AutocompleteController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet("client")]
        public JsonResult Get()
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));
            var dbList = dbClient.GetDatabase("ProjectMS").GetCollection<Client>("Client").AsQueryable();

            return new JsonResult(dbList);
        }
        [HttpGet("transporter")]
        public JsonResult transporter()
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));
            var dbList = dbClient.GetDatabase("ProjectMS").GetCollection<Transporter>("Transporter").AsQueryable();

            return new JsonResult(dbList);

        }
        [HttpGet("servicetype")]
        public JsonResult servicetype()
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));
            var dbList = dbClient.GetDatabase("ProjectMS").GetCollection<ServiceType>("ServiceType").AsQueryable();

            return new JsonResult(dbList);

        }
        [HttpGet("transporttype")]
        public JsonResult transporttype()
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));
            var dbList = dbClient.GetDatabase("ProjectMS").GetCollection<TransportType>("TransportType").AsQueryable();

            return new JsonResult(dbList);

        }
        [HttpGet("goodstype")]
        public JsonResult goodstype()
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));
            var dbList = dbClient.GetDatabase("ProjectMS").GetCollection<GoodsType>("GoodsType").AsQueryable();

            return new JsonResult(dbList);

        }
        [HttpGet("documents")]
        public JsonResult documents()
        {
            MongoClient dbClient = new MongoClient(_configuration.GetConnectionString("ProjectMsAppCon"));
            var dbList = dbClient.GetDatabase("ProjectMS").GetCollection<CustomDocument>("CustomDocument").AsQueryable();

            return new JsonResult(dbList);

        }

    }
}
