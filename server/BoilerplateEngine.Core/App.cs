namespace BoilerplateEngine.Core
{
    using BoilerplateEngine.Core;
    using System;
    using System.IO;
    using System.IO.Compression;
    using System.Threading.Tasks;

    public abstract class App
    {
        protected readonly string _name;
        protected readonly string _temp = $"temp-{Guid.NewGuid().ToString()}";

        public App(string name)
        {
            _name = name;
        }

        public virtual void Create()
        {
        }

        public void Cleanup()
        {
            ShellExtensions.DeleteDirectory($".{Path.DirectorySeparatorChar}{_temp}");
            // Task.Run(async () => {
            //     await ShellExtensions.DeleteDirectoryAsync($".{Path.DirectorySeparatorChar}{_temp}");
            // });
        }

        public void Zip()
        {
            ZipFile.CreateFromDirectory(OutputDirectory, ZipPath);
        }

        public string OutputDirectory => $".{Path.DirectorySeparatorChar}{_temp}{Path.DirectorySeparatorChar}{_name}";
        public string ZipPath => $"{OutputDirectory}.zip";
    }
}