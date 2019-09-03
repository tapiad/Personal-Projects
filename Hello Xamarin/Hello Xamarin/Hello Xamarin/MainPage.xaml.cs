using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Hello_Xamarin
{
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        int count = 0;
        void Button_Click(object sender, System.EventArgs e)
        {
            count++;
            ((Button)sender).Text = $"You have clicked {count} times.";
        }
    }
}
