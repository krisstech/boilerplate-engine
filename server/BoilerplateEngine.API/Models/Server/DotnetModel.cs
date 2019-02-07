namespace BoilerplateEngine.API
{
    public class DotnetModel : IServerModel
    {
        public string Name { get; set; }
        public string Template { get; set; }
        public bool UseSwagger { get; set; }
    }
}