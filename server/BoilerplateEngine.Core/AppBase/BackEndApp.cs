namespace BoilerplateEngine.Core
{
    using BoilerplateEngine.Core;
    using System;
    using System.IO;
    using System.IO.Compression;
    using System.Threading.Tasks;

    public abstract class BackEndApp
    {
        protected readonly string _name;
        protected readonly string _temp = $"temp-{Guid.NewGuid().ToString()}";

        public BackEndApp(string name)
        {
            _name = name;
        }

        public abstract Task CreateAsync();

        public async Task CleanAsync()
        {
            await ShellExtensions.DeleteDirectoryAsync($".{Path.DirectorySeparatorChar}{_temp}");
        }

        public void Zip()
        {
            ZipFile.CreateFromDirectory(OutputDirectory, ZipPath);
        }

        public string OutputDirectory => $"{TempDir}{Path.DirectorySeparatorChar}{_name}";
        public string ZipPath => $"{OutputDirectory}.zip";
        public string Name => _name;
        public string TempDir => $".{Path.DirectorySeparatorChar}{_temp}";
    }
}