# Weather App

Welcome to the Weather App! Stay updated on real-time weather information for any city with this simple and intuitive weather application.

## Table of Contents
- [Weather App](#weather-app)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Customization](#customization)
  - [Troubleshooting](#troubleshooting)
  - [Feedback and Support](#feedback-and-support)

## Introduction

The Weather App provides you with up-to-date weather details, including temperature, weather conditions. Whether you're planning a trip or just curious about the weather, this app has you covered.

The app fetches real-time weather data from OpenWeatherMap. The information is as recent as the OpenWeatherMap API provides.

Currently, the app's appearance is minimal. However, you can modify the CSS in the style.css file to adjust colors, fonts, and layout.

## Installation

To get started, follow these simple steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/suhas7842/Weather-App.git
2. Navigate to the Project Directory:
   ```bash
   cd weather-app
3. Open index.html in Your Browser:
   - Double-click on index.html or open it using your preferred web browser.

4.Default City:

- The app is set to display weather information for the default city, which is currently set to 'Hyderabad.' You can change this later.

## Usage
- Search for a City:
  - Use the search box to enter the name of the city or location you want to check the weather for.

- Submit the Form:
  - Press the "Submit" button or hit "Enter" after typing the city name to get the current weather information.

- View Weather Details:
  - The main section displays information such as the city name, date, temperature, weather conditions, weather forecast and a weather icon.
  

## Customization
- Change Default City:

  - In the script.js file, update the defaultCity variable to your preferred default city.
  
- Temperature Units:

  - The app uses the metric system by default. To switch to Fahrenheit, update the units parameter in the API request in the getResults function to 'imperial'.
  
- Weather Icons:

  - Icons are fetched from OpenWeatherMap. Customize the icon appearance by modifying the iconBaseUrl in the displayIcon function.
  
## Troubleshooting
- Error Handling:

  - If there is an error fetching weather data, an error message will be displayed. Check your internet connection and make sure the city name is spelled correctly.
- Clear Error Message:

  - If the error message persists after a successful search, refresh the page or try a different browser.

## Feedback and Support
- We appreciate your feedback! If you encounter any issues, have suggestions, or want to contribute, please submit an issue or create a pull request.

- Thank you for using the Weather App! Stay informed and enjoy exploring the weather.