namespace BoilerplateEngine.Core.BackEnd
{
    using BoilerplateEngine.Core;
    public class DotnetApp
    {
        readonly string _name;
        readonly string _type;

        public DotnetApp(string name, string type)
        {
            _name = name;
            _type = type;
        }

        public void Create()
        {
            var cmd = $"dotnet new {_type} -n {_name} -o {OutputDirectory}";
            cmd.Execute();
        }

        public string OutputDirectory => $"./temp/{_name}";
    }
}