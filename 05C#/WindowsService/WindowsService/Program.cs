using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace WindowsService
{
    class Program
    {
        static void Main(string[] args)
        {
            //Console.WriteLine(AppDomain.CurrentDomain.BaseDirectory);
            //Console.WriteLine(Program.GetExtenalIpAddress());
            Console.WriteLine(new Program().GetType().Assembly.Location);
            Console.Read();
        }


        #region 获取内、外网Ip  

        /// <summary>  
        /// 获取本地ip地址,优先取内网ip  
        /// </summary>  
        public static String GetLocalIp()
        {
            String[] Ips = GetLocalIpAddress();

            foreach (String ip in Ips) if (ip.StartsWith("10.80.")) return ip;
            foreach (String ip in Ips) if (ip.Contains(".")) return ip;

            return "127.0.0.1";
        }

        /// <summary>  
        /// 获取本地ip地址，多个ip  
        /// </summary>  
        public static String[] GetLocalIpAddress()
        {
            string hostName = Dns.GetHostName();                    //获取主机名称    
            IPAddress[] addresses = Dns.GetHostAddresses(hostName); //解析主机IP地址    

            string[] IP = new string[addresses.Length];             //转换为字符串形式    
            for (int i = 0; i < addresses.Length; i++) IP[i] = addresses[i].ToString();

            return IP;
        }

        /// <summary>  
        /// 获取外网ip地址  
        /// </summary>  
        public static string GetExtenalIpAddress_0()
        {
            string IP = "未获取到外网ip";
            try
            {
                //从网址中获取本机ip数据    
                System.Net.WebClient client = new System.Net.WebClient();
                client.Encoding = System.Text.Encoding.Default;
                string str = client.DownloadString("http://1111.ip138.com/ic.asp");
                client.Dispose();

                //提取外网ip数据 [218.104.71.178]    
                int i1 = str.IndexOf("["), i2 = str.IndexOf("]");
                IP = str.Substring(i1 + 1, i2 - 1 - i1);
            }
            catch (Exception) { }

            return IP;
        }

        /// <summary>  
        /// 获取外网ip地址  
        /// </summary>  
        public static string GetExtenalIpAddress()
        {
            String url = "http://192.168.3.241:90/api/Serve/getIP";
            string IP = "未获取到外网ip";
            try
            {
                //从网址中获取本机ip数据    
                System.Net.WebClient client = new System.Net.WebClient();
                client.Encoding = System.Text.Encoding.Default;
                string str = client.DownloadString(url);
                client.Dispose();

                if (!str.Equals("")) IP = str;
                else IP = GetExtenalIpAddress_0();
            }
            catch (Exception) { }

            return IP;
        }

        #endregion



    }
}
