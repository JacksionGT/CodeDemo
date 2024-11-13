using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using System.IO;
using System.Text;
using System.Web;
using System.Collections.Specialized;
using System.Net.Http.Headers;

namespace ServerHost.Controllers
{
    public class ServeController : ApiController
    {
        public void getIP()
        {
            var a = ((System.Web.HttpContextWrapper)Request.Properties["MS_HttpContext"]).Request;

            StringBuilder keyStrings = new StringBuilder();
            foreach(string key in a.ServerVariables.AllKeys)
            {
                keyStrings.Append(key);
                keyStrings.Append("=");
                keyStrings.Append(a.ServerVariables[key]);
                keyStrings.Append(";");
            }
            
            StringBuilder txt = new StringBuilder();
            txt.Append("---------------");
            txt.Append(a.UserHostAddress);
            txt.Append("---------------");
            txt.Append(DateTime.Now.ToString("o"));
            txt.Append("---------------\r\n");
            txt.Append(keyStrings);
            txt.Append("\r\n");

            string floderName = HttpContext.Current.Server.MapPath("~/log/");
            if (!Directory.Exists(floderName))
            {
                Directory.CreateDirectory(floderName);
            }
            
            string fileName = AppDomain.CurrentDomain.BaseDirectory + "log\\" + DateTime.Now.ToString("yyyyMMdd") + ".txt";
            File.AppendAllText(Path.Combine(floderName, DateTime.Now.ToString("yyyyMMdd") + ".txt"), txt.ToString());

            //FileStream fs;
            //if(File.Exists(fileName))
            //{
            //    fs = new FileStream(fileName, FileMode.Open, FileAccess.Write);
            //}
            //else
            //{
            //    File.Create(fileName);
            //    fs = new FileStream(fileName, FileMode.Create, FileAccess.Write);
            //}

            

            ////获得字节数组
            //byte[] data = System.Text.Encoding.Default.GetBytes(txt.ToString());

            ////开始写入
            //fs.Write(data, 0, data.Length);

            ////清空缓冲区、关闭流
            //fs.Flush();
            //fs.Close();


            //((System.Web.HttpContextWrapper)Request.Properties["MS_HttpContext"]).Request.UserHostAddress;

            //HttpContext.Current.Request.ServerVariables["HTTP_VIA"];
            //HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"];
            //HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            //HttpContext.Current.Request.ServerVariables["HTTP_CLIENT_IP"];
            //HttpContext.Current.Request.UserHostAddress;
        }

        public HttpResponseMessage GetIPList(int line = 100)
        {
            string filePath = HttpContext.Current.Server.MapPath("~/log/") + DateTime.Now.ToString("yyyyMMdd") + ".txt";
            string[] textLines = File.ReadAllLines(filePath);
            StringBuilder returnTxt = new StringBuilder();
            if (textLines.Length < line)
            {
                foreach(string s in textLines)
                {
                    returnTxt.Append(s);
                    returnTxt.Append("\r\n");
                }
            }
            else
            {
                for (int i = textLines.Length- line; i < textLines.Length; i++)
                {
                    returnTxt.Append(textLines[i]);
                    returnTxt.Append("\r\n");
                }
            }
            var httpResponseMessage = new HttpResponseMessage();
            httpResponseMessage.Content = new StringContent(returnTxt.ToString(), Encoding.UTF8);
            httpResponseMessage.Content.Headers.ContentType = new MediaTypeHeaderValue("text/javascript");



            return httpResponseMessage;
        }
        
    }
}
