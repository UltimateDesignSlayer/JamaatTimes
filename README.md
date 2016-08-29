# JamaatTimes
Simple app written with React to tell times of prayer at a local mosque

# Requirements

This will be a simple web app that lists out the prayer times at my local mosque. The prayer times change roughly once every couple weeks. The trick here is to have the ability to quickly update the list.

# Notes
The app data is updated every minute or so by a recurring AJAX GET. Data is currently hosted here: https://openws-app.herokuapp.com/

# JSON data structure
```{
  jamaatTimes:[
    {
      "name": "fajr",
      "time": "5:30am"
    },
    {
      "name": "zuhr",
      "time": "1:30pm"
    },
    {
      "name": "asr",
      "time": "6:30pm"
    },
    {
      "name": "magrib",
      "time": "8:10pm"
    },
    {
      "name": "isha",
      "time": "9:30pm"
    }
  ]
}```
