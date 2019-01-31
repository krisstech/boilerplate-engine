namespace BoilerplateEngine.Core.FrontEnd
{
    using BoilerplateEngine.Core;
    using System;
    using System.IO;
    using System.IO.Compression;
    using System.Threading.Tasks;
    public class ReactApp: App
    {
        readonly bool _useTypescript;

        public ReactApp(string name, bool useTypescript)
            :base(name)
        {
            _useTypescript = useTypescript;
        }

        public override void Create()
        {
            string typescript = _useTypescript ? "--typescript" : string.Empty;
            var cmd = $"yarn create react-app {OutputDirectory} {typescript}";
            cmd.Execute();
            ShellExtensions.DeleteDirectory($"{OutputDirectory}{Path.DirectorySeparatorChar}node_modules");

            // Task.Run(async () => {
            //     await ShellExtensions.DeleteDirectoryAsync($".{Path.DirectorySeparatorChar}{_temp}");
            // });
        }
    }
}