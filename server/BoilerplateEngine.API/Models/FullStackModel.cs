namespace BoilerplateEngine.API
{
    using BoilerplateEngine.Core;
    using Newtonsoft.Json.Linq;
    public class FullStackModel
    {
        public string Name { get; set; }
        public JObject ClientModel { get; set; }
        public string ClientType { get; set; }
        public JObject ServerModel { get; set; }
        public string ServerType { get; set; }
    }
}