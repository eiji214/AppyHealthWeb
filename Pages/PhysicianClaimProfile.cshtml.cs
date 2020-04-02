using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;

namespace AppyHealthWeb.Pages
{

    public class PhysicianClaimProfileModel : PageModel
    {
        private string image;

        [BindProperty]
        public string NPIText
        {
            get;
            set;
        }
        public void OnGet()
        {
           
        }
        public void OnPost()
        {
            RedirectToPage("/physician/", null);
        }

        public void setImage(int id)
        {
            switch (id)
            {
                case 0:
                    this.image = "search-on-terms.png";
                    break;
                case 1:
                    this.image = "discover-hard.png";
                    break;
                case 2:
                    this.image = "save-favorites.png";
                    break;
                case 3:
                    this.image = "know-benefits.png";
                    break;
                case 4:
                    this.image = "request-appointments.png";
                    break;
                case 5:
                    this.image = "set-appointments.png";
                    break;
                default:
                    this.image = "search-on-terms.png";
                    break;
            }
        }



        //public async Task<IActionResult> OnPostAsync()
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return Page();
        //    }


        //    NPIResponseModel resultNPI = new NPIResponseModel();
        //    string APIUrl = "https://localhost:44390/api/NPI/searchnpi/1/" + NPIText; 
        //    APIUrl = "https://appyhealthapitest.azurewebsites.net/api/NPI/searchnpi/1/" + NPIText;
        //    string responseString = "";
        //    using (var httpClient = new HttpClient())
        //    {
        //        APIUrl = "https://localhost:44390/api/NPI/searchnpi/1/" + NPIText;
        //        using (var response = await httpClient.GetAsync(APIUrl))
        //        {

        //            switch (response.StatusCode)
        //            {
        //                case HttpStatusCode.OK:
        //                    responseString = await response.Content.ReadAsStringAsync();
        //                    resultNPI =  JsonConvert.DeserializeObject<NPIResponseModel>(responseString);

        //                    break;
        //                case HttpStatusCode.Unauthorized:
        //                    responseString = $"Please sign in again. {response.ReasonPhrase}";
        //                    break;
        //                default:
        //                    responseString = $"Error calling API. StatusCode=${response.StatusCode}";
        //                    break;
        //            }

        //        }
        //    }

        //    return RedirectToPage("/Physician/ClaimProfileRegister", responseString);
        //}
    }
}