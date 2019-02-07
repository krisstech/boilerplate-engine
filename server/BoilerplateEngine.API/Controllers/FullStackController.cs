using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.IO.Compression;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BoilerplateEngine.Core;
using BoilerplateEngine.Core.BackEnd;
using BoilerplateEngine.Core.FrontEnd;
using Newtonsoft.Json.Linq;

namespace BoilerplateEngine.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FullStackController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] FullStackModel model)
        {
            var server = CreateServer(model.ServerModel, model.ServerType);
            var client = CreateClient(model.ClientModel, model.ClientType);

            var app = new FullStackApp(model.Name, client, server);

            await app.CreateAsync();

            app.Zip();
            
            var zipBytes = await System.IO.File.ReadAllBytesAsync(app.ZipPath);

            const string contentType = "application/zip";
            Response.ContentType = contentType;

            var result = new FileContentResult(zipBytes, contentType)
            {
                FileDownloadName = $"{app.Name}.zip"
            };

            // cleanup
            app.CleanAsync();

            return result;
        }

        BackEndApp CreateServer(JObject serverModel, string serverType)
        {
            switch (serverType)
            {
                case ServerTypes.Dotnet:
                    var dotnet = serverModel.ToObject<DotnetModel>();
                    return new DotnetApp(dotnet.Name, dotnet.Template);
            }

            throw new ArgumentException($"Server type not valid: {serverType}");
        }

        FrontEndApp CreateClient(JObject clientModel, string clientType)
        {
            switch (clientType)
            {
                case ClientTypes.Angular:
                    var angular = clientModel.ToObject<AngularModel>();
                    return new AngularApp(angular.Name);
                case ClientTypes.React:
                    var react = clientModel.ToObject<ReactModel>();
                    return new ReactApp(react.Name, react.UseTypescript);
                case ClientTypes.Vue:
                    var vue = clientModel.ToObject<VueModel>();
                    return new VueApp(vue.Name);
            }

            throw new ArgumentException($"Server type not valid: {clientType}");
        }
    }
}
