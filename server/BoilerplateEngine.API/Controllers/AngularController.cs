using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BoilerplateEngine.Core.FrontEnd;

namespace BoilerplateEngine.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AngularController : ControllerBase
    {
        // POST: api/Dotnet
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] AngularModel model)
        {
            var angular = new AngularApp(model.Name);
            await angular.CreateAsync();
            angular.Zip();

            var zipBytes = await System.IO.File.ReadAllBytesAsync(angular.ZipPath);

            const string contentType = "application/zip";
            Response.ContentType = contentType;

            var result = new FileContentResult(zipBytes, contentType)
            {
                FileDownloadName = $"{angular.Name}.zip"
            };

            // Start cleanup, but don't wait for it
            angular.CleanAsync();

            return result;
        }
    }
}
