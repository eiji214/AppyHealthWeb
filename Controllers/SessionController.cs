using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using AppyHealthWeb.Authentication.Helpers;
using AppyHealthWeb.Extensions;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http.Features.Authentication;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;

namespace AppyHealthWeb
{
    public class SessionController : Controller
    {
        public SessionController(IOptions<AzureAdB2COptions> b2cOptions)
        {
            AzureAdB2COptions = b2cOptions.Value;
        }

        public AzureAdB2COptions AzureAdB2COptions { get; set; }

        //[HttpGet]
        //public IActionResult SignIn(string redirectUrl = "")
        //{
        //    //if (string.IsNullOrWhiteSpace(redirectUrl))
        //    //{
        //    //    //redirectUrl = Url.Action(nameof(ProviderController.PhysicianDashBoard), "Provider");
        //    //    redirectUrl = Url.Action(nameof(ProviderController.DashboardHome), "Provider");

        //    //}

        //    return Challenge(
        //        new AuthenticationProperties { RedirectUri = redirectUrl }, OpenIdConnectDefaults.AuthenticationScheme);
        //}

        [HttpGet]
        public IActionResult SignIn(string redirectUrl = null)
        {
            var referrer = !string.IsNullOrWhiteSpace(redirectUrl)
                ? redirectUrl
                : new Uri(Request.Headers["Referer"].ToString()).PathAndQuery;

            var referrerString = string.IsNullOrWhiteSpace(referrer) ? string.Empty : $"?redirectUrl={referrer}";

            var properties = new AuthenticationProperties { RedirectUri = $"/session/signinresponse{referrerString}" };
            properties.Items[AzureAdB2COptions.PolicyAuthenticationProperty] = AzureAdB2COptions.SignUpSignInPolicyId;
            return Challenge(properties, OpenIdConnectDefaults.AuthenticationScheme);
        }

        [HttpGet]
        public IActionResult SignInResponse(string redirectUrl = null)
        {
            if (User.IsNewUser())
            {
                var r = redirectUrl.ToLower() == "/physicianclaimprofile"
                    ? $"?redirectUrl=/physician"
                    : null;

                return Redirect($"/app/register{r}");
            }

            if (redirectUrl != null && redirectUrl.ToLower() == "/physicianclaimprofile")
            {
                return Redirect("/app/physician");
            }

            return Redirect(redirectUrl ?? "/");
        }

        [HttpGet]
        public IActionResult ResetPassword()
        {
            //var redirectUrl = Url.Action(nameof(HomeController.Index), "Home");
            var properties = new AuthenticationProperties { RedirectUri = "/" };
            properties.Items[AzureAdB2COptions.PolicyAuthenticationProperty] = AzureAdB2COptions.ResetPasswordPolicyId;
            return Challenge(properties, OpenIdConnectDefaults.AuthenticationScheme);
        }

        //[HttpGet]
        //public IActionResult EditProfile()
        //{
        //    var redirectUrl = Url.Action(nameof(HomeController.Index), "Home");
        //    var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
        //    properties.Items[AzureAdB2COptions.PolicyAuthenticationProperty] = AzureAdB2COptions.EditProfilePolicyId;
        //    return Challenge(properties, OpenIdConnectDefaults.AuthenticationScheme);
        //}

        [HttpGet]
        public IActionResult SignOut()
        {
            return SignOut(new AuthenticationProperties { RedirectUri = "/" },
                CookieAuthenticationDefaults.AuthenticationScheme, OpenIdConnectDefaults.AuthenticationScheme);
        }

        [Authorize, HttpGet]
        public async Task<IActionResult> IsLoggedIn()
        {
            try
            {
                await AccessTokenHelper.GetAccessToken(HttpContext, AzureAdB2COptions);
            }
            catch
            {
                return Unauthorized();
            }
            return Ok();
        }
    }
}