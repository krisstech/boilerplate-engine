namespace BoilerplateEngine.Core.Tests
{
    using System;
    using System.IO;
    using Xunit;
    using System.Threading.Tasks;
    using BoilerplateEngine.Core.BackEnd;

    public class DotnetAppTests
    {
        readonly DotnetApp _dotnet;

        public DotnetAppTests()
        {
            _dotnet = new DotnetApp("TestApp", "classlib");
        }

        [Fact]
        public async Task Test_ShouldCreate_Classlib()
        {
            await _dotnet.CreateAsync();
            Assert.True(Directory.Exists(_dotnet.OutputDirectory));
            
            await _dotnet.CleanAsync();
        }
    }
}
