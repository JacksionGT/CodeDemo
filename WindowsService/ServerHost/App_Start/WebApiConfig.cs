using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace ServerHost
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API 配置和服务

            // Web API 路由
            config.MapHttpAttributeRoutes();

            //config.Routes.MapHttpRoute(
            //    name: "DefaultApi",
            //    routeTemplate: "api/{controller}/{id}",
            //    defaults: new { id = RouteParameter.Optional }
            //);

            config.Routes.MapHttpRoute(
                 name: "DefaultApinew",
                 routeTemplate: "api/{controller}/{action}/{id}",
                 defaults: new { id = RouteParameter.Optional }
             //defaults: new { controller = "Image", action = "AddImage", id = RouteParameter.Optional }
             );
        }
    }
}
