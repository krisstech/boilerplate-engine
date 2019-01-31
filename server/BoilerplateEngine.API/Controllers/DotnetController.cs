using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BoilerplateEngine.Core.BackEnd;

namespace BoilerplateEngine.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DotnetController : ControllerBase
    {
        // POST: api/Dotnet
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        [HttpGet]
        public async Task<IActionResult> DownloadTest()
        {
            var dotnet = new DotnetApp("DownlaodTest", DotnetNewTemplates.Console);
            await dotnet.CreateAsync();
            dotnet.Zip();

            var zipBytes = await System.IO.File.ReadAllBytesAsync(dotnet.ZipPath);

            const string contentType = "application/zip";
            HttpContext.Response.ContentType = contentType;
            var result = new FileContentResult(zipBytes, contentType)
            {
                FileDownloadName = "DownlaodTest.zip"
            };

            // Start cleanup, but don't wait for it
            dotnet.CleanAsync();

            return result;
        }
    }
}
