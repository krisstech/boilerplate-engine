﻿namespace BoilerplateEngine.Console
{
    using System;
    using System.Runtime.InteropServices;
    using BoilerplateEngine.Core;
    using BoilerplateEngine.Core.BackEnd;
    using BoilerplateEngine.Core.FrontEnd;
    using System.Threading.Tasks;

    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("What app to create?");
            Console.WriteLine("r - react, d - dotnet");
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

        static async Task CreateDotnet()
        {
            var dotnet = new DotnetApp("TestApp", DotnetNewTemplates.ClassLib);
            await dotnet.CreateAsync();

            Console.WriteLine("Project created!");

            Console.WriteLine("Press any key to zip the directory");
            Console.ReadKey();
            dotnet.Zip();

            Console.WriteLine("Press any key to delete the directory");
            Console.ReadKey();

            await dotnet.CleanAsync();
        }
    }
}
