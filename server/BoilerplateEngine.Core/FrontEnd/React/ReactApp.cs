namespace BoilerplateEngine.Core.FrontEnd
{
    using BoilerplateEngine.Core;
    using System;
    using System.IO;
    using System.IO.Compression;
    using System.Threading.Tasks;
    public class ReactApp: FrontEndApp
    {
        readonly bool _useTypescript;

        public ReactApp(string name, bool useTypescript)
            :base(name.ValidateReactName())
        {
            _useTypescript = useTypescript;
        }

        public override async Task CreateAsync()
        {
            string typescript = _useTypescript ? "--typescript" : string.Empty;
            var cmd = $"yarn create react-app {OutputDirectory} {typescript}";

            await cmd.ExecuteAsync();

            Console.WriteLine("Removing node modules that 'create-react-app' created...");
            await ShellExtensions.DeleteDirectoryAsync($"{OutputDirectory}{Path.DirectorySeparatorChar}node_modules");
        }
    }
}