using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AppyHealthWeb.Pages.Physician
{
    public class DashboardModel : PageModel
    {
        public void OnGet()
        {
            //Dummy Data
            FirstName = "Jason";
        }

        public string FirstName { get; set; }
    }
}