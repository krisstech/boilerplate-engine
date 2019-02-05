namespace BoilerplateEngine.Core.BackEnd
{
    public static class EfCoreEngines
    {
        public const string PostgreSQL = "postgres";
        public const string SQLServer = "sqlserver";
        // public const string Console = "console";

        public static readonly string[] Values = 
        {
            "postgres",
            "sqlserver"
        };
    }
}
