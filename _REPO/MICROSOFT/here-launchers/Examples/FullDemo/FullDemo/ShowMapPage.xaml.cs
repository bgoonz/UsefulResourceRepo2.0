using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Navigation;
using Microsoft.Phone.Controls;
using Microsoft.Phone.Shell;
using System.Text.RegularExpressions;
using System.Device.Location;
using System.Globalization;
using System.Windows.Media;

using Nokia.Phone.HereLaunchers;

namespace FullDemo
{
    public partial class ShowMapPage : PhoneApplicationPage
    {
        public ShowMapPage()
        {
            InitializeComponent();
        }
        protected override void OnNavigatedTo(System.Windows.Navigation.NavigationEventArgs e)
        {
            base.OnNavigatedTo(e);
            if ((Application.Current as App).SelectedLocation != null)
            {
                LatitudeBox.Text = (Application.Current as App).SelectedLocation.Latitude.ToString();
                LongittudeBox.Text = (Application.Current as App).SelectedLocation.Longitude.ToString();

                (Application.Current as App).SelectedLocation = null;
            }
        }

        protected override void OnNavigatedFrom(NavigationEventArgs e)
        {
            (Application.Current as App).SelectedLocation = null;
            try
            {
                (Application.Current as App).SelectedLocation = new GeoCoordinate(Double.Parse(LatitudeBox.Text), Double.Parse(LongittudeBox.Text));
            }
            catch { }

            base.OnNavigatedFrom(e);
        }

        private void Button_gridbut_Click(object sender, RoutedEventArgs e)
        {
            if (sender == LaunchButton)
            {
                try
                {
                    ExploremapsShowMapTask showMap = new ExploremapsShowMapTask();

                    showMap.Location = new GeoCoordinate(Double.Parse(LatitudeBox.Text),Double.Parse(LongittudeBox.Text));
                    showMap.Zoom = (int)zoomSlider.Value;
                    showMap.Show();
                }
                catch (Exception erno)
                {
                    MessageBox.Show("Error message: " + erno.Message);
                }
            }
            else if (sender == getGeoButton)
            {
                NavigationService.Navigate(new Uri("/LocationSelectorPage.xaml?target=Location", UriKind.Relative));
            }
        }

        private void zoomSlider_ValueChanged_1(object sender, RoutedPropertyChangedEventArgs<double> e)
        {
            if (sender == zoomSlider)
            {
                zoomSliderCaption.Text = "Zoom value: " + (int)zoomSlider.Value;
            }

        }
    }
}