using Microsoft.AspNetCore.Mvc.RazorPages;

namespace AppyHealthWeb.Pages.Physician
{
    public class ProfileModel : PageModel
    {
        public void OnGet()
        {
            Name = "Frank Johnson, M.D.";
            PracticeName = "Johnson and Associates";
            Specialty = "General Practitioner";
        }

        public string Name { get; set; }
        public string PracticeName { get; set; }
        public string Specialty { get; set; }
    }
}