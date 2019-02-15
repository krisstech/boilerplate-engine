namespace BoilerplateEngine.Core.FrontEnd
{
    using BoilerplateEngine.Core;
    using System;
    using System.IO;
    using System.IO.Compression;
    using System.Threading.Tasks;
    public class AngularApp: FrontEndApp
    {
        public AngularApp(string name)
            :base(name.ValidateJavascriptName())
        {
        }

        public override async Task CreateAsync()
        {
            // var cmd = $"npx -p @angular/cli ng new {Name} --directory={OutputDirectory} --skip-install --defaults=true --interactive=false --routing=true --skipGit=true --style=scss";
            var cmd = $"ng new {Name} --directory={OutputDirectory} --skip-install --defaults=true --interactive=false --routing=true --skipGit=true --style=scss";

            await cmd.ExecuteAsync();
        }
    }
}