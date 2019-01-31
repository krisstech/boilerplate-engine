namespace BoilerplateEngine.Core.BackEnd
{
    using BoilerplateEngine.Core;
    using System;
    using System.IO;
    using System.IO.Compression;

    public class DotnetApp: App
    {
        readonly string _type;

        public DotnetApp(string name, string type)
            :base(name)
        {
            _type = type;
        }

        public override void Create()
        {
            var cmd = $"dotnet new {_type} -n {_name} -o {OutputDirectory}";
            cmd.Execute();
        }
    }
}