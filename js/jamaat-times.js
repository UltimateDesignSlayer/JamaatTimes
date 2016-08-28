var jamaatTimes = (function(){
  var JamaatTimeComponent = React.createClass({
    //set up the state
    getInitialState: function(){
      return{
        isEditMode: false //if true, the times are text boxes which can be submitted.
      }
    },

    // Wrote this so that I can update a state in this component from a child. Passed in the render.
    // Param 1: string containing the name of the state.
    // Param 2: value of state.
    updateState: function(stateName, value){
      var setStateValueObj = {};
      setStateValueObj[stateName] = value;

      this.setState(setStateValueObj);
    },

    render: function(){
      var that = this;

      var tableSaveEditState = <JamaatTimes isJamaatEditMode={this.state.isEditMode} openWsApiKey='065fee4395d438b8de778c2294088ce5' openWsDataCollection='jamaattimes_data_collection' openWsObjId='57c1dae68c4ee80300ad1e07' updateParentState={this.updateState} />;
      var editSaveLink = <p className="edit-link"><span>Edit</span></p>;

      if (this.state.isEditMode){
        editSaveLink = <a className="btn btn-success save-link">Save changes</a>;
      }

      return(
        <div>
          <table className="table table-bordered table-hover table-prayer-times">
            <thead>
              <tr>
                <td>Prayer</td>
                <td>Time</td>
              </tr>
            </thead>
            {tableSaveEditState}
          </table>
          {editSaveLink}
        </div>
      )
    }
  });

  var JamaatTimes = React.createClass({

    //update data
    updateData: function(){
      var that = this;

      var updatedData = {
        "jamaatTimes": [
          {
            "name": "fajr",
            "time": "4:15am"
          },
          {
            "name": "zuhr",
            "time": "1:30pm"
          },
          {
            "name": "asr",
            "time": "8:15pm"
          },
          {
            "name": "magrib",
            "time": "9:35pm"
          },
          {
            "name": "isha",
            "time": "10:45pm"
          }
          ]
        };

      $.ajax({
        url: 'https://openws.herokuapp.com/' + that.props.openWsDataCollection + '/' + that.props.openWsObjId + '?apiKey=' + that.props.openWsApiKey,
        type: 'PUT',
        data: updatedData,
        beforeSend: function(){
          $('#jamaatTimes').append('<span class="loading-notice">SAVING...</span>');
        },
        success: function(data){
          console.log('UPDATED - ', data);
          that.getData(true, false);
          $('.loading-notice').remove();
        }
      });
    },

    //Get data
    getData: function(isGetNow, isStartInterval){
      var that = this;

      var $ajaxGetData = function(){
        $.ajax({
          url: 'https://openws.herokuapp.com/' + that.props.openWsDataCollection + '?apiKey=' + that.props.openWsApiKey,
          type: 'GET',
          beforeSend: function(){
            $('#jamaatTimes').append('<span class="loading-notice">Updating...</span>');
          },
          success: function(data){
            $('.loading-notice').remove();

            var newData = $.grep(data, function(jsonData, i){
              // newData should only contain jamaatTimes array. filter the data collection for just the
              // jamaat times data object.
              return (jsonData._id === that.props.openWsObjId);
            });

            that.setState({
              prayerTimeObjArr: newData[0].jamaatTimes
            });
          }
        })
      };

      //Fire ajax immediately first time.
      if (isGetNow){
        $ajaxGetData();
      }

      // Set up an interval so that the ajax is fired once every minute and state is updated with fresh data.
      // Virtual DOM will then be updated, and the user gets the up to date times. Include an indicator when the AJAX runs,
      // so that the user knows something is happening.
      if (isStartInterval){
        setInterval(function(){ $ajaxGetData() }, 10000);
      }
    },

    bindEvents: function(){
      var that = this;

      $('.jamaat-times').on('click', '.edit-link span', function(e){
        that.props.updateParentState('isEditMode', true);
      });

      $('.jamaat-times').on('click', '.btn.save-link', function(){
        that.updateData();
        that.props.updateParentState('isEditMode', false);
      });
    },

    //set up the state
    getInitialState: function(){
      return{
        prayerTimeObjArr: [], //object array of each prayer jamaat time.
      }
    },

    //this is run first. best place to bind events...
    componentDidMount: function(){
      console.log(this.props.isJamaatEditMode);
      this.getData(true, true);
      this.bindEvents();
    },

    render: function(){
      //Add one new list item per item in prayerTimeObjArr array
      return (
        <tbody>
          {this.state.prayerTimeObjArr.map( function(prayerTime){
              return (
                <tr>
                  <td className="table-prayer-times-name">{prayerTime.name}</td>
                  <td className="table-prayer-times-time">{prayerTime.time}</td>
                </tr>
              );
            })
          }
        </tbody>
      )
    }
  });

  return {
    init: function(){
      ReactDOM.render(
        <JamaatTimeComponent />,
        document.getElementById('jamaatTimes')
      )
    }
  }
})();

jamaatTimes.init();
