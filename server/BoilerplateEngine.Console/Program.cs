namespace BoilerplateEngine.Console
{
    using System;
    using System.Runtime.InteropServices;
    using BoilerplateEngine.Core;

    class Program
    {
        static void Main(string[] args)
        {
            var cmd = "echo 'test'";

            string result;
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                result = cmd.ExecuteCmd();
            }
            else {

                result = cmd.ExecuteBash();
            }
            
            Console.WriteLine(result);

            Console.WriteLine();
            Console.WriteLine("Press any key to exit...");
            Console.ReadKey();
        }
    }
}
