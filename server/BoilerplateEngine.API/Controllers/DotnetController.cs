﻿using System;
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
        public async Task<IActionResult> Post([FromBody] DotnetModel model)
        {
            if (!DotnetNewTemplates.Values.Any(value => value == model.Template))
            {
                return new BadRequestResult();
            }

            // Build App
            var dotnet = new DotnetApp(model.Name, model.Template);
            await dotnet.CreateAsync();

            if (model.UseSwagger && model.Template == DotnetNewTemplates.WebApi)
            {
                await dotnet.AddSwagger();
            }

            // ZIP App
            dotnet.Zip();

            var zipBytes = await System.IO.File.ReadAllBytesAsync(dotnet.ZipPath);

            const string contentType = "application/zip";
            Response.ContentType = contentType;

            var result = new FileContentResult(zipBytes, contentType)
            {
                FileDownloadName = $"{dotnet.Name}.zip"
            };

            // Start cleanup, but don't wait for it
            dotnet.CleanAsync();

            return result;
        }
    }
}
