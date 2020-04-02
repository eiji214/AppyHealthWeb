using System;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.Identity.Client;

namespace AppyHealthWeb.Controllers
{
    public class APIController : Controller
    {
        readonly AzureAdB2COptions AzureAdB2COptions;
        private readonly HttpClient _httpClient;

        public APIController(IOptions<AzureAdB2COptions> azureAdB2COptions)
        {
            AzureAdB2COptions = azureAdB2COptions.Value;

            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Accept.Clear();
            _httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }

        private async Task<string> GetAccessToken()
        {
            var scope = AzureAdB2COptions.ApiScopes.Split(' ');
            string signedInUserID = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;

            IConfidentialClientApplication cca =
                ConfidentialClientApplicationBuilder.Create(AzureAdB2COptions.ClientId)
                    .WithRedirectUri(AzureAdB2COptions.RedirectUri)
                    .WithClientSecret(AzureAdB2COptions.ClientSecret)
                    .WithB2CAuthority(AzureAdB2COptions.Authority)
                    .Build();
            new MSALStaticCache(signedInUserID, this.HttpContext).EnablePersistence(cca.UserTokenCache);

            var accounts = await cca.GetAccountsAsync();
            AuthenticationResult result = await cca.AcquireTokenSilent(scope, accounts.FirstOrDefault())
                .ExecuteAsync();

            return result.AccessToken;
        }

        public async Task<string> CallAPI(string APIUrl, bool ispost = false)
        {
            string responseString = "";
            try
            {
                // Retrieve the token with the specified scopes
                var scope = AzureAdB2COptions.ApiScopes.Split(' ');
                string signedInUserID = HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value;

                IConfidentialClientApplication cca =
                ConfidentialClientApplicationBuilder.Create(AzureAdB2COptions.ClientId)
                    .WithRedirectUri(AzureAdB2COptions.RedirectUri)
                    .WithClientSecret(AzureAdB2COptions.ClientSecret)
                    .WithB2CAuthority(AzureAdB2COptions.Authority)
                    .Build();
                new MSALStaticCache(signedInUserID, this.HttpContext).EnablePersistence(cca.UserTokenCache);

                var accounts = await cca.GetAccountsAsync();
                AuthenticationResult result = await cca.AcquireTokenSilent(scope, accounts.FirstOrDefault())
                    .ExecuteAsync();

                HttpClient client = new HttpClient();
                HttpRequestMessage request = new HttpRequestMessage();
                if (ispost)
                    request = new HttpRequestMessage(HttpMethod.Post, APIUrl);
                else
                    request = new HttpRequestMessage(HttpMethod.Get, APIUrl);


                // Add token to the Authorization header and make the request
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", result.AccessToken);
                HttpResponseMessage response = await client.SendAsync(request);

                // Handle the response
                switch (response.StatusCode)
                {
                    case HttpStatusCode.OK:
                        responseString = await response.Content.ReadAsStringAsync();
                        break;
                    case HttpStatusCode.Unauthorized:
                        responseString = $"Please sign in again. {response.ReasonPhrase}";
                        break;
                    default:
                        responseString = $"Error calling API. StatusCode=${response.StatusCode}";
                        break;
                }
            }
            catch (MsalUiRequiredException ex)
            {
                responseString = $"Session has expired. Please sign in again. {ex.Message}";
            }
            catch (Exception ex)
            {
                responseString = $"Error calling API: {ex.Message}";
            }
            return responseString;
        }

        [Authorize]
        public async Task<IActionResult> ApiTest()
        {
            var responseString = await CallAPI(AzureAdB2COptions.ApiUrlTest);

            ViewData["Payload"] = $"{responseString}";
            return View("ApiResponse");
        }

        private async Task<IActionResult> MakeApiCall(Func<Task<HttpResponseMessage>> apiCall)
        {
            try
            {
                var token = await GetAccessToken();
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
                var x = await apiCall();
                if (x.IsSuccessStatusCode)
                {
                    return Content(await x.Content.ReadAsStringAsync());
                }

                return new StatusCodeResult((int) x.StatusCode);
            }
            catch (MsalUiRequiredException)
            {
                return Unauthorized();
            }

        }

        [HttpGet, Authorize]
        public async Task<IActionResult> Get(string url)
        {
             return await MakeApiCall(() => _httpClient.GetAsync($"{AzureAdB2COptions.ApiUrl}{url}"));
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> Post(string url, [FromBody]object data)
        {
            return await MakeApiCall(() => _httpClient.PostAsync($"{AzureAdB2COptions.ApiUrl}{url}", data, new JsonMediaTypeFormatter()));
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> PostForm(string url)
        {
            var file = Request.Form.Files[0];

            byte[] data;
            using (var br = new BinaryReader(file.OpenReadStream()))
                data = br.ReadBytes((int)file.OpenReadStream().Length);

            ByteArrayContent bytes = new ByteArrayContent(data);


            MultipartFormDataContent multiContent = new MultipartFormDataContent();

            multiContent.Add(bytes, "file", file.FileName);
            return await MakeApiCall(() => _httpClient.PostAsync($"{AzureAdB2COptions.ApiUrl}{url}", multiContent));
        }

        [HttpPost, Authorize]
        public async Task<IActionResult> PostNoBody(string url)
        {
            return await MakeApiCall(() => _httpClient.PostAsync($"{AzureAdB2COptions.ApiUrl}{url}", null));
        }

        [HttpPut, Authorize]
        public async Task<IActionResult> Put(string url, [FromBody]object data)
        {
            return await MakeApiCall(() => _httpClient.PutAsync($"{AzureAdB2COptions.ApiUrl}{url}", data, new JsonMediaTypeFormatter()));
        }

        [HttpPut, Authorize]
        public async Task<IActionResult> PutNoBody(string url)
        {
            return await MakeApiCall(() => _httpClient.PutAsync($"{AzureAdB2COptions.ApiUrl}{url}", null));
        }

        [HttpDelete, Authorize]
        public async Task<IActionResult> Delete(string url)
        {
            return await MakeApiCall(() => _httpClient.DeleteAsync($"{AzureAdB2COptions.ApiUrl}{url}"));
        }
    }
}