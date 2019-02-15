namespace BoilerplateEngine.Core.FrontEnd
{
    using BoilerplateEngine.Core;
    using System;
    using System.IO;
    using System.IO.Compression;
    using System.Threading.Tasks;
    using System.Text;

    public class VueApp: FrontEndApp
    {
        public VueApp(string name)
            :base(name.ValidateJavascriptName())
        {
        }

        public override async Task CreateAsync()
        {
            var json = new StringBuilder();
            json.Append("{");
            json.Append("    'useConfigFiles': true,");
            json.Append("    'plugins': {");
            json.Append("        '@vue/cli-plugin-typescript': {");
            json.Append("            'classComponent': true,");
            json.Append("            'tsLint': true,");
            json.Append("            'lintOn': [");
            json.Append("                'save',");
            json.Append("                'commit'");
            json.Append("            ]");
            json.Append("        },");
            json.Append("        '@vue/cli-plugin-pwa': {},");
            json.Append("        '@vue/cli-plugin-unit-jest': {},");
            json.Append("        '@vue/cli-plugin-e2e-cypress': {}");
            json.Append("    },");
            json.Append("    'router': true,");
            json.Append("    'routerHistoryMode': false,");
            json.Append("    'vuex': true,");
            json.Append("    'cssPreprocessor': 'sass'");
            json.Append("}");

            // var test = "{\"useConfigFiles\": true,\"plugins\": {\"@vue/cli-plugin-typescript\": {\"classComponent\": true,\"tsLint\": true,\"lintOn\": [\"save\",\"commit\"]},\"@vue/cli-plugin-pwa\": {},\"@vue/cli-plugin-unit-jest\": {},\"@vue/cli-plugin-e2e-cypress\": {}},\"router\": true,\"routerHistoryMode\": false,\"vuex\": true,\"cssPreprocessor\": \"sass\"}";

            await ShellExtensions.MakeDirectoryAsync(OutputDirectory);

            // var test = json.ToString();
            
            // var cmd = $"npx -p vue-cli vue create {OutputDirectory} -i \"{json.ToString()}\"";
            // var cmd = $"vue create {OutputDirectory} -i \"{json.ToString()}\"";
            // var cmd = $"cd {OutputDirectory} && vue create {Name} -i {json.ToString()}";
            // var cmd = $"cd {OutputDirectory} && vue create {Name} -i \"{json.ToString()}\"";
            // var cmd = $"cd {OutputDirectory} && vue create {Name} -i '{test}'";

            // TODO: get the inline json config working
            var cmd = $"cd {OutputDirectory} && npx -p @vue/cli vue create {Name} -d";

            await cmd.ExecuteAsync();
        }
    }
}