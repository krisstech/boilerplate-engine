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
    public class ReactController : ControllerBase
    {
        // POST: api/Dotnet
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ReactModel model)
        {
            var react = new ReactApp(model.Name, model.UseTypescript);
            await react.CreateAsync();
            react.Zip();

            var zipBytes = await System.IO.File.ReadAllBytesAsync(react.ZipPath);

            const string contentType = "application/zip";
            Response.ContentType = contentType;

            var result = new FileContentResult(zipBytes, contentType)
            {
                FileDownloadName = $"{react.Name}.zip"
            };

            // Start cleanup, but don't wait for it
            react.CleanAsync();

            return result;
        }
    }
}
