namespace BoilerplateEngine.Core.BackEnd
{
    using BoilerplateEngine.Core;
    using System;
    using System.IO;
    using System.IO.Compression;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using System.Linq;

    public class DotnetApp: App
    {
        readonly string _type;

        public DotnetApp(string name, string type)
            :base(name.ValidateDotnetName())
        {
            _type = type;
        }

        public override async Task CreateAsync()
        {
            var cmd = $"dotnet new {_type} -n {_name} -o {OutputDirectory}";
            await cmd.ExecuteAsync();
        }

        public async Task AddSwagger()
        {
            var cmd = $"cd {OutputDirectory} && dotnet add package Swashbuckle.AspNetCore";
            await cmd.ExecuteAsync();

            var startupFile = File.ReadAllText($"{OutputDirectory}{Path.DirectorySeparatorChar}Startup.cs");
            string[] lines = startupFile.Split(
                new[] { Environment.NewLine },
                StringSplitOptions.None
            );

            var list = lines.ToList();

            // Add using directive
            var index = list.IndexOf(list.Last(s => s.Contains("using"))) + 1;
            list.Insert(index, "using Swashbuckle.AspNetCore.Swagger;");

            // Add service
            var serviceList = new List<string>
            {
                "            services.AddSwaggerGen(c =>",
                "            {",
                "                c.SwaggerDoc(\"v1\", new Info { Title = \"My API\", Version = \"v1\" });",
                "            });"
            };
            index = list.IndexOf(list.Last(s => s.Contains("IServiceCollection services"))) + 2;
            list.InsertRange(index, serviceList);
            
            
            // Add app config
            var appList = new List<string>
            {
                "            app.UseSwagger();",
                "            app.UseSwaggerUI(c =>",
                "            {",
                "                c.SwaggerEndpoint(\"/swagger/v1/swagger.json\", \"My API V1\");",
                "            });"
            };
            index = list.IndexOf(list.Last(s => s.Contains("IApplicationBuilder app"))) + 2;
            list.InsertRange(index, appList);

            File.WriteAllText($"{OutputDirectory}{Path.DirectorySeparatorChar}Startup.cs", string.Join(Environment.NewLine, list));
        }

        public async Task AddEfCore()
        {
            var cmd = $"cd {OutputDirectory} && dotnet add package Swashbuckle.AspNetCore";
            await cmd.ExecuteAsync();

            var startupFile = File.ReadAllText($"{OutputDirectory}{Path.DirectorySeparatorChar}Startup.cs");
            string[] lines = startupFile.Split(
                new[] { Environment.NewLine },
                StringSplitOptions.None
            );

            var list = lines.ToList();

            // Add using directive
            var index = list.IndexOf(list.Last(s => s.Contains("using"))) + 1;
            list.Insert(index, "using Swashbuckle.AspNetCore.Swagger;");

            // Add service
            var serviceList = new List<string>
            {
                "            services.AddSwaggerGen(c =>",
                "            {",
                "                c.SwaggerDoc(\"v1\", new Info { Title = \"My API\", Version = \"v1\" });",
                "            });"
            };
            index = list.IndexOf(list.Last(s => s.Contains("IServiceCollection services"))) + 2;
            list.InsertRange(index, serviceList);
            
            
            // Add app config
            var appList = new List<string>
            {
                "            app.UseSwagger();",
                "            app.UseSwaggerUI(c =>",
                "            {",
                "                c.SwaggerEndpoint(\"/swagger/v1/swagger.json\", \"My API V1\");",
                "            });"
            };
            index = list.IndexOf(list.Last(s => s.Contains("IApplicationBuilder app"))) + 2;
            list.InsertRange(index, appList);

            File.WriteAllText($"{OutputDirectory}{Path.DirectorySeparatorChar}Startup.cs", string.Join(Environment.NewLine, list));
        }
    }
}