using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Identity.Client;

namespace AppyHealthWeb.Authentication.Helpers
{
    public class AccessTokenHelper
    {
        public static async Task<string> GetAccessToken(HttpContext context, AzureAdB2COptions options)
        {
            var scope = options.ApiScopes.Split(' ');
            string signedInUserID = context.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            var cca = ConfidentialClientApplicationBuilder.Create(options.ClientId)
                .WithRedirectUri(options.RedirectUri)
                .WithClientSecret(options.ClientSecret)
                .WithB2CAuthority(options.Authority)
                .Build();

            new MSALStaticCache(signedInUserID, context).EnablePersistence(cca.UserTokenCache);

            var accounts = await cca.GetAccountsAsync();
            var result = await cca.AcquireTokenSilent(scope, accounts.FirstOrDefault())
                .ExecuteAsync();

            return result.AccessToken;
        }
    }
}
