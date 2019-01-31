namespace BoilerplateEngine.Console
{
    using System;
    using System.Runtime.InteropServices;
    using BoilerplateEngine.Core;
    using BoilerplateEngine.Core.BackEnd;
    using BoilerplateEngine.Core.FrontEnd;

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("What app to create?");
            Console.WriteLine("r - react, d - dotnet");
            var key = Console.ReadKey();
            Console.WriteLine();

            switch(key.Key)
            {
                case ConsoleKey.R:
                    CreateReact();
                    break;
                case ConsoleKey.D:
                    CreateDotnet();
                    break;
                default:
                    Console.WriteLine($"Wrong key pressed: {key.KeyChar}");
                    break;
            }

            Console.WriteLine();
            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }

        static void CreateReact()
        {
            var react = new ReactApp("test-app", true);
            react.Create();

            Console.WriteLine("Project created!");

            Console.WriteLine("Press any key to zip the directory");
            Console.ReadKey();
            react.Zip();

            Console.WriteLine("Press any key to delete the directory");
            Console.ReadKey();

            react.Cleanup();
        }

        static void CreateDotnet()
        {
            var dotnet = new DotnetApp("TestApp", "classlib");
            dotnet.Create();

            Console.WriteLine("Project created!");

            Console.WriteLine("Press any key to zip the directory");
            Console.ReadKey();
            dotnet.Zip();

            Console.WriteLine("Press any key to delete the directory");
            Console.ReadKey();

            dotnet.Cleanup();
        }
    }
}
