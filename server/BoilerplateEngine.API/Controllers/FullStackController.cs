using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BoilerplateEngine.Core.BackEnd;
using BoilerplateEngine.Core.FrontEnd;

namespace BoilerplateEngine.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FullStackController : ControllerBase
    {
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            // server
            var dotnet = new DotnetApp("TodoApp", DotnetNewTemplates.WebApi);

            // client
            var react = new ReactApp("todo-app", true);

            

            return Ok();
        }
    }
}
