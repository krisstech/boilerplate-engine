namespace BoilerplateEngine.Core.BackEnd
{
    using BoilerplateEngine.Core;
    using System;
    using System.IO;
    using System.IO.Compression;
    using System.Threading.Tasks;
    using System.Collections.Generic;
    using System.Linq;
    using Newtonsoft.Json.Linq;
    using Newtonsoft.Json;

    public class DotnetApp: BackEndApp
    {
        readonly string _type;

        public DotnetApp(string name, string type)
            :base(name.ValidateJavascriptName())
        {
            _type = type;
        }

        public override async Task CreateAsync()
        {
            var cmd = $"npx express-generator .";
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
                "                c.SwaggerDoc(\"v1\", new Info { Title = \"" + _name + " API\", Version = \"v1\" });",
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
                "                c.SwaggerEndpoint(\"/swagger/v1/swagger.json\", \"" + _name + " API V1\");",
                "            });"
            };
            index = list.IndexOf(list.Last(s => s.Contains("IApplicationBuilder app"))) + 2;
            list.InsertRange(index, appList);

            File.WriteAllText($"{OutputDirectory}{Path.DirectorySeparatorChar}Startup.cs", string.Join(Environment.NewLine, list));
        }

        public async Task AddEfCore(string DbEngine)
        {
            if (DbEngine == EfCoreEngines.PostgreSQL)
            {
                var cmd = $"cd {OutputDirectory} && dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL";
                await cmd.ExecuteAsync();
            }

            AddEfCoreModel();

            AddEfCoreContext();

            AddEfCoreController();

            PatchAppSettings(DbEngine);

            PatchEfStartupFile(DbEngine);
        }

        void PatchEfStartupFile(string DbEngine)
        {
            var startupFile = File.ReadAllText($"{OutputDirectory}{Path.DirectorySeparatorChar}Startup.cs");
            string[] lines = startupFile.Split(
                new[] { Environment.NewLine },
                StringSplitOptions.None
            );

            var list = lines.ToList();

            // add using directives
            var index = list.IndexOf(list.Last(s => s.Contains("using"))) + 1;
            list.Insert(index, "using Microsoft.EntityFrameworkCore;");
            list.Insert(index + 1, $"using {_name}.Services;");

            // Configure services
            var serviceList = new List<string>
            {
                $"            var connectionString = Configuration.GetConnectionString(\"{_name}Context\");"
            };

            switch(DbEngine)
            {
                case EfCoreEngines.PostgreSQL:
                    serviceList.Add($"           services.AddEntityFrameworkNpgsql().AddDbContext<{_name}Context>(options => options.UseNpgsql(connectionString));");
                    break;
                case EfCoreEngines.SQLServer:
                    serviceList.Add($"           services.AddEntityFrameworkSqlServer().AddDbContext<{_name}Context>(options => options.UseSqlServer(connectionString));");
                    break;
            }
            index = list.IndexOf(list.Last(s => s.Contains("IServiceCollection services"))) + 2;
            list.InsertRange(index, serviceList);
        }

        void PatchAppSettings(string DbEngine)
        {
            var json = File.ReadAllText($"{OutputDirectory}{Path.DirectorySeparatorChar}appsettings.json");
            var appSettings = JObject.Parse(json);

            var connectionString = new JObject();

            switch(DbEngine)
            {
                case EfCoreEngines.PostgreSQL:
                    connectionString.Add($"{_name}Context", $"Server=localhost;Database={_name};Username=postgres;Password=admin");
                    break;
                case EfCoreEngines.SQLServer:
                    connectionString.Add($"{_name}Context", $"Server=127.0.0.1,1433;Database={_name};User=SA;Password=P@ssword123");
                    break;
            }

            appSettings.Add("ConnectionStrings", connectionString);

            File.WriteAllText($"{OutputDirectory}{Path.DirectorySeparatorChar}appsettings.json", JsonConvert.SerializeObject(appSettings));
        }

        void AddEfCoreModel()
        {
            var text = $@"
namespace {_name}.Models
{{
    public class Value
    {{
        public int Id {{ get; set; }}
        public string Body {{ get; set; }}
    }}
}}
            ";

            var modelPath = $"{OutputDirectory}{Path.DirectorySeparatorChar}Models";
            if (!Directory.Exists(modelPath))
                Directory.CreateDirectory(modelPath);

            File.WriteAllText($"{modelPath}{Path.DirectorySeparatorChar}Value.cs", text);
        }

        void AddEfCoreContext()
        {
            var text = $@"
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using {_name}.Models;

namespace {_name}.Services
{{
    public class {_name}Context : DbContext
    {{
        public {_name}Context(DbContextOptions<{_name}Context> options) : base(options)
        {{ }}

        public DbSet<Value> Values {{ get; set; }}
    }}
}}
            ";

            var servicesPath = $"{OutputDirectory}{Path.DirectorySeparatorChar}Services";
            if (!Directory.Exists(servicesPath))
                Directory.CreateDirectory(servicesPath);

            File.WriteAllText($"{servicesPath}{Path.DirectorySeparatorChar}{_name}Context.cs", text);
        }

        void AddEfCoreController()
        {
            var text = $@"
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

using {_name}.Models;
using {_name}.Services;

namespace {_name}.Controllers
{{
    [Route(""api/[controller]"")]
    [ApiController]    
    public class ValuesController : ControllerBase
    {{
        readonly {_name}Context _context;

        public ValuesController({_name}Context context)
        {{
            _context = context;
        }}

        [HttpGet]
        public ActionResult<IEnumerable<Value>> Get()
        {{
            return _context.Values;
        }}

        [HttpGet(""{{id}}"")]
        public ActionResult<Value> Get(int id)
        {{
            return _context.Values.FirstOrDefault(value => value.Id == id);
        }}

        [HttpPost]
        public void Post([FromBody] Value value)
        {{
            _context.Values.Add(value);
            _context.SaveChanges();
        }}

        [HttpPut(""{{id}}"")]
        public void Put(int id, [FromBody] Value val)
        {{
            var value = _context.Values.FirstOrDefault(v => v.Id == id);
            if (value == null)
                return;

            value.Body = val.Body;

            _context.Values.Update(value);
            _context.SaveChanges();
        }}

        [HttpDelete(""{{id}}"")]
        public void Delete(int id)
        {{
            var value = _context.Values.FirstOrDefault(v => v.Id == id);
            if (value == null)
                return;

            _context.Values.Remove(value);
            _context.SaveChanges();
        }}
    }}
}}
            ";

            var controllerPath = $"{OutputDirectory}{Path.DirectorySeparatorChar}Controllers";
            if (!Directory.Exists(controllerPath))
                Directory.CreateDirectory(controllerPath);

            File.WriteAllText($"{controllerPath}{Path.DirectorySeparatorChar}ValuesController.cs", text);
        }
    }
}