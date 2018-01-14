import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import TextField from 'material-ui/TextField';
import $ from 'jquery';
import NotLoggedIn from './NotLoggedIn';
import Login from './Login.jsx'
import NavLogged from './NavLogged.jsx';
import Search from './Search.jsx';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Calendar from './Calendar.jsx';

const styles = {
  sticky: {
      position: 'fixed',
      top: '0',
      width: '100%',
      backgroundColor: 'white',
      zIndex: '10'
  }
}
class NavBar extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      searchValue: null,
      showModal: false
    }
  }

  // handleChange(event){
  //   console.log(event.target.value)
  //   var data = event.target.value;
  //   this.setState({
  //     searchValue: data
  //   })
  //   console.log("state",this.state.searchValue)
  // }

  renderDatePicker () {
    return (
      <div className='calendar'>
        <DateRangePicker
        startDate={this.props.startDate} // momentPropTypes.momentObj or null,
        startDateId={'12'}
        endDate={this.props.endDate} // momentPropTypes.momentObj or null,
        endDateId={'100000000'}
        onDatesChange={this.props.updateDates} // PropTypes.func.isRequired,
        focusedInput={this.props.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
        onFocusChange={this.props.updateFocusedInput} // PropTypes.func.isRequired,
        onClose={this.props.handleDateClick}
        />
      </div>
    )
  }

  render() {

  return (
    <div className='nav-bar-wrapper' style={styles.sticky}>
      <div className='nav-bar-logo'>
        <a href="/">
          <img src='../assets/logo.png' />
        </a>
      </div>
      {(() => {
        if (this.props.view !== 'default') {
          return (
            <div className='nav-bar-search'>
              <Search handleSearchClick={this.props.handleSearchClick}/>
              <Calendar
                startDate={this.props.startDate} // momentPropTypes.momentObj or null,
                endDate={this.props.endDate} // momentPropTypes.momentObj or null,
                updateDates={this.props.updateDates} // PropTypes.func.isRequired,
                focusedInput={this.props.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                updateFocusedInput={this.props.updateFocusedInput} // PropTypes.func.isRequired,
                handleDateClick={this.props.handleDateClick}
              />  
            </div>
          )
        }
      })()}
      <div className='nav-bar-login'>
        {(() => {
          if(this.props.isUserLoggedIn) {
            return (
              <NavLogged 
                triggerView={this.props.triggerView} 
                logOut={this.props.userLogOut} 
                user={this.props.user} 
              />
            )
          } else {
            return (
              <NotLoggedIn 
                openLogin={this.props.openLogin}
                closeLogin={this.props.closeLogin}
                userLoggedIn={this.props.userLoggedIn} 
                triggerView={this.props.triggerView} 
                login={this.props.login}
                startDate={this.props.startDate}
              />
            )
          }
        })()}
      </div>
    </div>
    // <div>
    //   <AppBar position="static">
    //     <Toolbar>
    //       <input type="text" style={{width: 700}}  placeholder="Anywhere..." id="place" onChange={this.handleChange}/>
    //       <button value={$("#place").val()} onClick={()=>{this.handleSearchClick(); this.props.triggerView('searchResults')}}>Go</button>
    //       <Typography onClick={() => this.props.triggerView('default')} style={{color:"white", font:"Helvetica", width: "100px"}}>
    //       Air HnR
    //       </Typography>
    //       {this.props.isUserLoggedIn ? <NavLogged logOut={this.props.userLogOut} user={this.props.user}/> : 
    //       <NotLoggedIn userLoggedIn={this.props.userLoggedIn} triggerView={this.props.triggerView} login={this.props.login}/>}
    //     </Toolbar>
    //   </AppBar>
    // </div>
  );
}
}

export default NavBar;
