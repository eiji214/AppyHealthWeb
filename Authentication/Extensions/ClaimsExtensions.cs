using System;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;

namespace AppyHealthWeb.Extensions
{
    public static class ClaimsExtensions
    {
        public static bool IsNewUser(this IPrincipal principal)
        {
            var user = principal as ClaimsPrincipal;
            return Convert.ToBoolean(user?.Claims?.FirstOrDefault(x => x.Type == "newUser")?.Value);
        }
    }
}