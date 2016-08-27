# JamaatTimes
Tell times of Jamaat at local mosque (St Area Mosque)

# Requirements

This will be a simple web app that lists out the prayer times at my local mosque. The prayer times change roughly once every couple weeks. The trick here is to have the ability to quickly and securely update the list.

# Ideas
The app data will be updated every 20 secs by a recurring ajax get. Host the data here: https://openws-app.herokuapp.com/

Combine ```GET``` and ```PUT``` functions into one. Determine the AJAX type based on params passed in.

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
