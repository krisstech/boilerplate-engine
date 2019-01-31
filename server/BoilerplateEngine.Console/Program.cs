namespace BoilerplateEngine.Console
{
    using System;
    using System.Runtime.InteropServices;
    using BoilerplateEngine.Core;
    using BoilerplateEngine.Core.BackEnd;

    class Program
    {
        static void Main(string[] args)
        {
            var dotnet = new DotnetApp("TestApp", "classlib");
            dotnet.Create();
            // var result = cmd.Execute();

            // Console.WriteLine(result);

            Console.WriteLine();
            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }
    }
}
