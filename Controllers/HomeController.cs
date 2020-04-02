using Microsoft.AspNetCore.Mvc;

namespace AppyHealthWeb.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return Redirect("/app/home");
        }
    }
}