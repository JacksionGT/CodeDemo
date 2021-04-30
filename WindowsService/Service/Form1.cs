using Microsoft.Win32;
using System;
using System.Windows.Forms;

namespace Service
{
    public partial class Form1 : Form
    {
        private NotifyIcon TrayIcon;

        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            this.Hide();
            TrayIcon = new NotifyIcon();
            TrayIcon.Visible = false;
            timer1.Interval = 900000;

            postMsg();

            timer1.Start();
            if (!IsRegeditExit("WindowsService"))
            {
                RunWhenStart(true, "WindowsService", this.GetType().Assembly.Location);
            }
        }



        /// <summary> 
        /// 开机启动项 
        /// </summary> 
        /// <param name=\"Started\">是否启动</param> 
        /// <param name=\"name\">启动值的名称</param> 
        /// <param name=\"path\">启动程序的路径</param> 
        public static void RunWhenStart(bool Started, string name, string path)
        {
            try
            {

                RegistryKey HKLM = Registry.LocalMachine;
                RegistryKey Run = HKLM.CreateSubKey("SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\");
                if (Started == true)
                {
                    try
                    {
                        Run.SetValue(name, path);
                        HKLM.Close();
                    }
                    catch (Exception) { }
                }
                else
                {
                    try
                    {
                        Run.DeleteValue(name);
                        HKLM.Close();
                    }
                    catch (Exception) { }
                }
            }
            catch (Exception) { }
        }

        private void timer1_Tick(object sender, EventArgs e)
        {
            postMsg();
        }

        /// <summary>
        /// 注册表中的值是否存在
        /// </summary>
        /// <param name="name"></param>
        /// <returns></returns>
        private static bool IsRegeditExit(string name)
        {
            bool _exit = false;
            if (string.IsNullOrEmpty(name))
            {
                return _exit;
            }
            try
            {
                RegistryKey hkml = Registry.LocalMachine;
                RegistryKey aimdir = hkml.OpenSubKey("SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run\\", true);
                if(aimdir.GetValue(name) != null)
                {
                    _exit = true; return _exit;
                }
            }
            catch (Exception) { }
            return _exit;
        }

        /// <summary>
        /// 发送请求，Http报文中会有本机IP信息
        /// </summary>
        private void postMsg()
        {
            String url = "http://www.zhengxiaodong.cn/api/Serve/getIP";
            try
            {
                //从网址中获取本机ip数据    
                System.Net.WebClient client = new System.Net.WebClient();
                client.Encoding = System.Text.Encoding.Default;
                client.DownloadString(url);
                client.Dispose();
            }
            catch (Exception) { }
        }
    }
}
