namespace BoilerplateEngine.API
{
    using BoilerplateEngine.Core;
    using Newtonsoft.Json.Linq;
    public class FullStackModel
    {
        // public IClientModel Client { get; set; }
        // public dynamic Client { get; set; }
        public JObject Client { get; set; }
        public string ClientType { get; set; }
        // public IServerModel Server { get; set; }
        // public dynamic Server { get; set; }
        public JObject Server { get; set; }
        public string ServerType { get; set; }
    }
}