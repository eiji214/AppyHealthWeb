using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AppyHealthWeb.Pages
{
    public class HealthSystemClaimProfileModel : PageModel
    {
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
            NPIText = Request.Form[nameof(NPIText)];
        }
    }
}