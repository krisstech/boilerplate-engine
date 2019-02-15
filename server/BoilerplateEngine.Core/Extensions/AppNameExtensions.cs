namespace BoilerplateEngine.Core
{
    public static class AppNameExtensions
    {
        public static string ValidateJavascriptName(this string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return "react-app";
            }

            return name.ToLowerInvariant().Replace(' ', '-');
        }

        public static string ValidateDotnetName(this string name)
        {
            if (string.IsNullOrEmpty(name))
            {
                return "DotnetApp";
            }

            return name.ToLowerInvariant().Replace(" ", "");
        }
    }
}