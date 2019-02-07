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
            var server = CreateServer(model.Server, model.ServerType);

            await server.CreateAsync();

            string tempDir = server.TempDir;

            string appDir = $"{tempDir}{Path.DirectorySeparatorChar}app";
            if (!Directory.Exists(appDir))
                Directory.CreateDirectory(appDir);

            string serverDir = $"{appDir}{Path.DirectorySeparatorChar}server";
            Directory.Move(server.OutputDirectory, serverDir);

            // client
            var client = CreateClient(model.Client, model.ClientType);

            await client.CreateAsync();

            string clientDir = $"{appDir}{Path.DirectorySeparatorChar}client";
            Directory.Move(client.OutputDirectory, clientDir);

            ZipFile.CreateFromDirectory($"{appDir}", $"{appDir}.zip");
            
            var zipBytes = await System.IO.File.ReadAllBytesAsync($"{appDir}.zip");

            const string contentType = "application/zip";
            Response.ContentType = contentType;

            var result = new FileContentResult(zipBytes, contentType)
            {
                FileDownloadName = $"full-stack-app.zip"
            };

            // cleanup
            client.CleanAsync();
            server.CleanAsync();

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
