var jamaatTimes = (function(){
  var JamaatTimeComponent = React.createClass({
    bindEvent: function(){
      var that = this;

      $('h1').on('click', function(){
        that.setState({
          prayerTimeObjArr: that.state.prayerTimeObjArr
        });
        console.log('New prayerTimeObjArr state: ' + that.state.prayerTimeObjArr);
      });
    },

    //set up the state
    getInitialState: function(){
      return{
        prayerTimeObjArr: [] //object array of each prayer jamaat time.
      }
    },

    //update data
    updateData: function(){
      var that = this;

      var updatedData = {
        "jamaatTimes": [
          {
            "name": "fajr",
            "time": "5:30am"
          },
          {
            "name": "zuhr",
            "time": "1:00pm"
          },
          {
            "name": "asr",
            "time": "6:00pm"
          },
          {
            "name": "magrib",
            "time": "6:10pm"
          },
          {
            "name": "isha",
            "time": "7:30pm"
          }
          ]
        };

      $.ajax({
        url: 'https://openws.herokuapp.com/' + that.props.openWsDataCollection + '/' + that.props.openWsObjId + '?apiKey=' + that.props.openWsApiKey,
        type: 'PUT',
        data: updatedData,
        success: function(data){
          console.log('UPDATED - ', data);
        }
      });
    },

    //Get data from openWS
    getData: function(){
      var that = this;

      // Set up an interval so that the ajax is fired once every 20 secs and state is updated with fresh data.
      // Virtual DOM will then be updated, and the user gets the up to date times. Include an indicator when the AJAX runs,
      // so that the user knows something is happening.
      $.ajax({
        url: 'https://openws.herokuapp.com/' + that.props.openWsDataCollection + '?apiKey=' + that.props.openWsApiKey,
        type: 'GET',
        success: function(data){

          var newData = $.grep(data, function(jsonData, i){
            // newData should only contain jamaatTimes array. filter the data collection for just the
            // jamaat times data object.
            return (jsonData._id === that.props.openWsObjId);
          });

          that.setState({
            prayerTimeObjArr: newData[0].jamaatTimes
          });
        }
      });

    },

    //this is run first. best place to bind events...
    componentDidMount: function(){
      this.getData()
      setInterval(this.getData(), 5000);
      this.bindEvent();
    },

    render: function(){
      var that = this;

      //Add one new list item per item in prayerTimeObjArr array
      return(
        <ul>

          {this.state.prayerTimeObjArr.map(function(prayerTime){
            return (
              <li>{prayerTime.name} -- {prayerTime.time}</li>
            );
          })}

        </ul>
      )
    }
  });

  return {
    init: function(){
      ReactDOM.render(
        <JamaatTimeComponent openWsApiKey='065fee4395d438b8de778c2294088ce5' openWsDataCollection='jamaattimes_data_collection' openWsObjId='57c1dae68c4ee80300ad1e07' />,
        document.getElementById('jamaatTimes')
      )
    }
  }
})();

jamaatTimes.init();
