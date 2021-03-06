﻿namespace BoilerplateEngine.Console
{
    using System;
    using System.Runtime.InteropServices;
    using BoilerplateEngine.Core;
    using BoilerplateEngine.Core.BackEnd;
    using BoilerplateEngine.Core.FrontEnd;
    using System.Threading.Tasks;

    using System.IO;
    using System.IO.Compression;

    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("What app to create?");
            Console.WriteLine("r - react, d - dotnet, a - angular, v - Vue, f - full-stack app, e - express");
            var key = Console.ReadKey();
            Console.WriteLine();

            switch(key.Key)
            {
                case ConsoleKey.R:
                    await CreateReact();
                    break;
                case ConsoleKey.D:
                    await CreateDotnet();
                    break;
                case ConsoleKey.A:
                    await CreateAngular();
                    break;
                case ConsoleKey.V:
                    await CreateVue();
                    break;
                case ConsoleKey.F:
                    await CreateFullStack();
                    break;
                case ConsoleKey.E:
                    await CreateExpress();
                    break;
                default:
                    Console.WriteLine($"Wrong key pressed: {key.KeyChar}");
                    break;
            }

            Console.WriteLine();
            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }

        static async Task CreateReact()
        {
            var react = new ReactApp("test-app", true);
            await react.CreateAsync();

            Console.WriteLine("Project created!");

            Console.WriteLine("Press any key to zip the directory");
            Console.ReadKey();
            react.Zip();

            Console.WriteLine("Press any key to delete the directory");
            Console.ReadKey();

            await react.CleanAsync();
        }

        static async Task CreateAngular()
        {
            var angular = new AngularApp("test-app");
            await angular.CreateAsync();

            Console.WriteLine("Project created!");

            Console.WriteLine("Press any key to zip the directory");
            Console.ReadKey();
            angular.Zip();

            Console.WriteLine("Press any key to delete the directory");
            Console.ReadKey();

            await angular.CleanAsync();
        }

        static async Task CreateVue()
        {
            var vue = new VueApp("test-app");
            await vue.CreateAsync();

            Console.WriteLine("Project created!");

            Console.WriteLine("Press any key to zip the directory");
            Console.ReadKey();
            vue.Zip();

            Console.WriteLine("Press any key to delete the directory");
            Console.ReadKey();

            await vue.CleanAsync();
        }

        static async Task CreateDotnet()
        {
            var dotnet = new DotnetApp("TestApp", DotnetNewTemplates.WebApi);
            await dotnet.CreateAsync();

            Console.WriteLine("Project created!");
            Console.WriteLine("Adding Swagger UI");
            await dotnet.AddSwagger();

            await dotnet.AddEfCore(EfCoreEngines.SQLServer);
            

            Console.WriteLine("Press any key to zip the directory");
            Console.ReadKey();
            dotnet.Zip();

            Console.WriteLine("Press any key to delete the directory");
            Console.ReadKey();

            await dotnet.CleanAsync();
        }

        static async Task CreateExpress()
        {
            var express = new ExpressApp("test-app");
            await express.CreateAsync();

            Console.WriteLine("Project created!");            

            Console.WriteLine("Press any key to zip the directory");
            Console.ReadKey();
            express.Zip();

            Console.WriteLine("Press any key to delete the directory");
            Console.ReadKey();

            await express.CleanAsync();
        }

        static async Task CreateFullStack()
        {
            var server = new DotnetApp("test-server", DotnetNewTemplates.WebApi);

            await server.CreateAsync();

            string tempDir = server.TempDir;

            string appDir = $"{tempDir}{Path.DirectorySeparatorChar}app";
            if (!Directory.Exists(appDir))
                Directory.CreateDirectory(appDir);

            string serverDir = $"{appDir}{Path.DirectorySeparatorChar}server";
            Directory.Move(server.OutputDirectory, serverDir);


            // client
            var client = new AngularApp("test-client");

            await client.CreateAsync();

            string clientDir = $"{appDir}{Path.DirectorySeparatorChar}client";
            Directory.Move(client.OutputDirectory, clientDir);

            ZipFile.CreateFromDirectory($"{appDir}", $"{appDir}.zip");
            
            Console.WriteLine("App created and zipped, press any key to delete...");
            Console.ReadKey();

            // cleanup
            await client.CleanAsync();
            await server.CleanAsync();
        }
    }
}
