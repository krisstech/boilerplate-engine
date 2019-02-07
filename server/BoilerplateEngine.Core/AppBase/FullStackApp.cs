namespace BoilerplateEngine.Core
{
    using BoilerplateEngine.Core;
    using System;
    using System.IO;
    using System.IO.Compression;
    using System.Threading.Tasks;

    public class FullStackApp
    {
        readonly string _name;

        FrontEndApp _client;
        BackEndApp _server;

        public FullStackApp(string name, FrontEndApp client, BackEndApp server)
        {
            _name = name;
            _client = client;
            _server = server;
        }

        public async Task CreateAsync()
        {
            if (!Directory.Exists(AppDir))
                Directory.CreateDirectory(AppDir);

            // server
            await _server.CreateAsync();
            string serverDir = $"{AppDir}{Path.DirectorySeparatorChar}server";
            Directory.Move(_server.OutputDirectory, serverDir);

            // client
            await _client.CreateAsync();
            string clientDir = $"{AppDir}{Path.DirectorySeparatorChar}client";
            Directory.Move(_client.OutputDirectory, clientDir);
        }

        public async Task CleanAsync()
        {
            await _client.CleanAsync();
            await _server.CleanAsync();
        }

        public void Zip()
        {
            ZipFile.CreateFromDirectory($"{AppDir}", $"{AppDir}.zip");
        }

        public string Name => _name;
        public string AppDir => $"{_server.TempDir}{Path.DirectorySeparatorChar}app";
        public string ZipPath => $"{AppDir}.zip";
    }
}