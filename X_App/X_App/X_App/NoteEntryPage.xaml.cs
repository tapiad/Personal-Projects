using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using X_App.Models;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace X_App
{
	//[XamlCompilation(XamlCompilationOptions.Compile)]
	public partial class NoteEntryPage : ContentPage
    {
        public NoteEntryPage()
        {
            InitializeComponent();
        }

        async void OnSaveButtonClicked(object sender, EventArgs e)
        {
            var note = (Note)BindingContext;

            if (string.IsNullOrWhiteSpace(note.Filename))
            {
                // Save
                var filename = Path.Combine(App.FolderPath, $"{Path.GetRandomFileName()}.notes.txt");
                File.WriteAllText(filename, note.Text);
            }
            else
            {
                // Update
                File.WriteAllText(note.Filename, note.Text);
            }

            await Navigation.PopAsync();
        }

        async void OnDeleteButtonClicked(object sender, EventArgs e)
        {
            var note = (Note)BindingContext;

            if (File.Exists(note.Filename))
            {
                File.Delete(note.Filename);
            }

            await Navigation.PopAsync();
        }
    }
}