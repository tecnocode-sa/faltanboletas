using System.Threading.Tasks;
using System.Web.Mvc;
using System;
using System.Linq;
using System.Collections.Generic;
using FaltanBoletas.Models;
using LiteDB;

namespace Web.Controllers
{
    public class HomeController : Controller
    {
        private const string DbName = "FaltanBoletas.db";

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Index(FormCollection form)
        {
            //return RedirectToAction("NumberConfirm");
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> Image(string file)
        {
            const string Base64DataUri = "data:image/jpeg;base64,";
            file = file.Replace(Base64DataUri, string.Empty);

            var registroId = Convert.ToInt32(Session["RegistroId"]);

            return Json(true);
            //if (result.StatusCode == HttpStatusCode.OK)
            //    return Json(true);
            //else
            //    throw new Exception(result.StatusCode.ToString());
        }

        [HttpGet]
        public List<string> GetDistritos()
        {
            using (var db = new LiteDatabase(DbName))
            {
                var data = db.GetCollection<Registro>().FindAll();
                var registros = data.Select(x => x.Distrito).Distinct().ToList();
                return registros;
            }
        }

    }
}