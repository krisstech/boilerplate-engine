namespace BoilerplateEngine.Core
{
    using System;
    using System.Diagnostics;
    using System.Runtime.InteropServices;
    using System.Threading.Tasks;
    using System.Text;

    public static class ShellExtensions
    {
        public async static Task DeleteDirectoryAsync(string directory)
        {
            string cmd;
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                cmd = $"rmdir {directory} /S /Q";
            }
            else
            {
                cmd = $"rm -rf {directory}";
            }

            await cmd.ExecuteAsync();
        }

        public async static Task MakeDirectoryAsync(string directory)
        {
            var cmd = $"mkdir {directory}";

            await cmd.ExecuteAsync();
        }

        public async static Task RenameDirectory(string oldName, string newName)
        {
            string cmd;
            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                cmd = $"REN {oldName} {newName}";
            }
            else
            {
                cmd = $"mv {oldName} {newName}";
            }

            await cmd.ExecuteAsync();
        }

        public static string Execute(this string cmd)
        {
            var process = new Process();
            try
            {
                if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
                {
                    process.StartInfo = GetCmdStartInfo(cmd);
                }
                else
                {
                    process.StartInfo = GetBashStartInfo(cmd);
                }

                process.Start();
            
                var error = process.StandardError.ReadToEnd();            
                
                
                

                if (process.ExitCode != 0)
                {
                    Console.WriteLine("There was an error!");
                    Console.WriteLine($"Exit code: {process.ExitCode}");
                    Console.WriteLine(error);
                    throw new Exception(error);
                }

                string result = process.StandardOutput.ReadToEnd();
                process.WaitForExit();
                return result;
            }
            catch (Exception ex)
            {
                throw new NotImplementedException("Add correct exception handling for failed commands", ex);
            }
        }

        public static Task ExecuteAsync(this string cmd)
        {
            var tcs = new TaskCompletionSource<object>();
            var process = new Process
            {
                EnableRaisingEvents = true
            };

            if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows))
            {
                process.StartInfo = GetCmdStartInfo(cmd);
            }
            else
            {
                process.StartInfo = GetBashStartInfo(cmd);
            }

            var result = new StringBuilder();

            process.Exited += (sender, args) =>
            {
                if (process.ExitCode != 0)
                {
                    var errorMessage = process.StandardError.ReadToEnd();
                    tcs.SetException(new InvalidOperationException("The process did not exit correctly. " +
                        "The corresponding error message was: " + errorMessage));
                }
                else
                {
                    tcs.SetResult(result);
                }
                process.Dispose();
            };

            process.OutputDataReceived += (sender, args) =>
            {
                Console.WriteLine(args.Data);
                result.AppendLine(args.Data);
            };

            process.Start();
            process.BeginOutputReadLine();
            return tcs.Task;
        }

        static ProcessStartInfo GetBashStartInfo(this string cmd)
        {
            var escapedArgs = cmd.Replace("\"", "\\\"");
            
            return new ProcessStartInfo
                {
                    FileName = "/bin/bash",
                    Arguments = $"-c \"{escapedArgs}\"",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                };
        }

        static ProcessStartInfo GetCmdStartInfo(this string cmd)
        {
            var escapedArgs = cmd.Replace("\"", "\\\"");
            

            return new ProcessStartInfo
                {
                    FileName = "cmd.exe",
                    Arguments = $"/C \"{escapedArgs}\"",
                    RedirectStandardOutput = true,
                    RedirectStandardError = true,
                    UseShellExecute = false,
                    CreateNoWindow = true,
                };
        }
    }
}