var jamaatTimes = (function(){
  var JamaatTimeComponent = React.createClass({
    bindEvent: function(){
      var that = this;

      $('h1').on('click', function(){
        that.setState({
          prayerTimeObjArr:that.state.prayerTimeObjArr
        });
        console.log('New prayerTimeObjArr state: ' + that.state.prayerTimeObjArr);
      });
    },

    //set up the state
    getInitialState: function(){
      return{
        prayerTimeObjArr:[] //object array of each prayer jamaat time.
      }
    },

    //this is run first. best place to bind events...
    componentDidMount: function(){
      this.bindEvent();
      console.log("jamaatTimeComp run");
    },

    render: function(){
      //Add one new list item per item in prayerTimeObjArr array
      return(
        <ul>
          <li>{this.props.twitterAccount} {this.state.prayerTimeObjArr}</li>
        </ul>
      )
    }
  });
/*
  var getPrayerTimeData = React.createClass({
    getInitialState: function(){
      return{
        prayerTimeObj:{} //object of prayer and time. (e.g. {Asr: 15:00})
      }
    }

    render: function(){
      //only return data? or an li?
      return(

      )
    }
  });
*/
  return {
    init: function(){
      ReactDOM.render(
        <JamaatTimeComponent twitterAccount='Twitter!!!' />,
        document.getElementById('jamaatTimes')
      )
    }
  }
})();

jamaatTimes.init();
