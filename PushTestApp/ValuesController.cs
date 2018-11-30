using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using TestMakerFreeWebApp.ViewModels;
using System.Net;

namespace PushTestApp
{
  [Route("api/[controller]")]
  public class ValuesController : Controller
  {



    public ValuesController()
    {

    }

    // POST api/values
    [HttpPost]
    async public Task<IActionResult> Post([FromBody]MessageViewModel model)
    {
      try
      {
        var parameters = new NameValueCollection {
                  { "token", model.AppKey },
                  { "user", model.UserKey },
                  { "message", model.Text }
            };

        using (var client = new WebClient())
        {
          await ExpensiveTaskAsync(parameters, client);
        }
        return Ok(model);
      }
      catch (Exception ex)
      {
        return StatusCode(500, ex.Message);
      }
    }

    private Task ExpensiveTaskAsync(NameValueCollection parameters, WebClient client)
    {
      return Task.Run(() => client.UploadValues("https://api.pushover.net/1/messages.json", parameters));
    }
  }
}

