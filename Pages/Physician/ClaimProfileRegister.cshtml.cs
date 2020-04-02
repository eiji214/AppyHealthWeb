using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AppyHealthWeb.Pages.Physician
{
    public class ClaimProfileRegisterModel : PageModel
    {
        public IActionResult OnGet(string responseString) //, NPIResponseModel n)
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            //var model = n;
            //if (model == null)
            //    return Page();

            ViewData["Payload"] = $"{responseString}";

            //this.Movie = new MovieInputModel
            //{
            //    Id = model.Id,
            //    Title = model.Title,
            //    ReleaseYear = model.ReleaseYear,
            //    Summary = model.Summary
            //};
            return Page();
        }
    }
}