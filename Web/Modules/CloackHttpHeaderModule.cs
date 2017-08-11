using System;
using System.Collections.Generic;
using System.Web;

namespace FaltanBoletas.Modules
{
    public class CloakHttpHeaderModule : IHttpModule
    {
        private readonly List<string> _headersToCloak;

        public CloakHttpHeaderModule()
        {
            _headersToCloak = new List<string>
                                      {
                                              "Server",
                                              "X-AspNet-Version",
                                              "X-AspNetMvc-Version",
                                              "X-Powered-By",
                                      };
        }

        public void Init(HttpApplication context)
        {
            context.PreSendRequestHeaders += OnPreSendRequestHeaders;
        }

        private void OnPreSendRequestHeaders(object sender, EventArgs e)
        {
            _headersToCloak.ForEach(h => HttpContext.Current.Response.Headers.Remove(h));
        }

        public void Dispose()
        {
        }
    }

}
