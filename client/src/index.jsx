import React from 'react';
import { render } from 'react-dom';
import css from './styles/styles.css';
import { BrowserRouter } from 'react-router-dom';
import ListingDetails from './components/listingDetails.jsx'
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import SearchResults from './components/SearchResults'
import Search from './components/Search.jsx'
import NavBar from './components/NavBar.jsx'
import data from '../../lib/dummyData.js';
import $ from 'jquery'
import Checkout from './components/Checkout.jsx';
import Login from './components/Login.jsx';
import CreateAccount from './components/CreateAccount.jsx';
import Trips from './components/Trips.jsx'
import NavLogged from './components/NavLogged.jsx';
import moment from 'moment';
import FeaturedPlaces from './components/FeaturedPlaces.jsx';
import MainPage from './components/MainPage.jsx'
import Confirmation from './components/Confirmation.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'default',
      query: '',
      results: [],
      listing: {},
      mapCenter: {
        latitude: 37.774929,
        longitude: -122.419416
      },
      startDate: moment(),
      endDate: moment().add(7, 'days'),
      guests: 1,
      user: null,
      loginOpen: false
    }
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleListingClick = this.handleListingClick.bind(this);
    this._triggerViewChange = this._triggerViewChange.bind(this);
    this.userLoggedIn = this.userLoggedIn.bind(this);
    this.userLogOut = this.userLogOut.bind(this);
    this.login = this.login.bind(this);
    this.handleMapDrag = this.handleMapDrag.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.sendConfirmationEmail = this.sendConfirmationEmail.bind(this);
    this.updateDates = this.updateDates.bind(this);
    this.updateFocusedInput = this.updateFocusedInput.bind(this);
    this.openLogin = this.openLogin.bind(this);
    this.closeLogin = this.closeLogin.bind(this);
  }

  componentDidMount() {
    if(this._storageAvailable('localStorage')) {
      let cachedUser = localStorage.getItem('user');
      if(cachedUser) {
        this.setState({
          user: JSON.parse(cachedUser)
        });
      }
    }
  }

  openLogin(open) {
    this.setState({
      loginOpen: true
    });
  };

  closeLogin(open) {
    this.setState({
      loginOpen: false
    });
  };

  updateGuests (guests) {
    this.setState({
      guests: guests
    });
  };

  handleTripClick () {
    this.setState({
      view: 'trips'
    });
  };

  handleListingClick(listingID) {
    // called when a list item is clicked on.
    fetch(`/api/listings/${listingID}`)//, options)
    .then((response) => response.json())
    .then((json) => {
      this.setState({
        listing: json,
        view: 'listingDetails'
      })
    }).catch(err => console.log(err));
  };

  handleSearchClick(query) {
    //called from search bar, submits a search request for locations near searched area
      let startDate = this.state.startDate.format('YYYY-MM-DD');
      let endDate = this.state.endDate.format('YYYY-MM-DD');
      const options = {
        method: 'GET',
        contentType: "application/json",
        mode: 'cors',
        cache: 'default'
      };
      fetch(`/api/listings?q=${query}&start=${startDate}&end=${endDate}`, options)
      .then((response) => response.json())
      .then((json) => {
        console.log('received listings', json.mapCenter)
        this.setState({
          results: json.listings,
          mapCenter: json.mapCenter,
          view: 'searchResults'
        });
      }).catch(err => console.log(err));
  };

  updateDates({ startDate, endDate }) {
    if (startDate < endDate) {
      this.setState({ startDate, endDate });
    }
    else {
      this.setState({ startDate: startDate, endDate: startDate.add(1, 'days') });
    }
  };
  
  updateFocusedInput(focusedInput) {
    this.setState({ focusedInput })
  };

  handleDateClick({startDate, endDate}) {
    if (this.state.view === 'searchResults') {
      let startDate = this.state.startDate.format('YYYY-MM-DD');
      let endDate = this.state.endDate.format('YYYY-MM-DD');
      fetch(`/api/datesonly?lat=${this.state.mapCenter.latitude}&lon=${this.state.mapCenter.longitude}&start=${startDate}&end=${endDate}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          results: json.listings
        });
      }).catch(err => console.log(err));
    }
    else if (this.state.view === 'listingDetails'){
      console.log('CHANGE NOTHING')
    }
  };
    
  handleMapDrag(latitude, longitude, zoom) {
    fetch(`/api/markings`, {
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      method: 'POST',
      body: JSON.stringify({
        start: this.state.startDate.format('YYYY-MM-DD'),
        end: this.state.endDate.format('YYYY-MM-DD'),
        latitude: latitude,
        longitude: longitude,
        zoom: zoom
      })
    }).then(response => response.json())
      .then(json => {
        this.setState({
          results: json.listings,
          mapCenter: {
            latitude: latitude,
            longitude: longitude
          }
        });
      }).catch(err => console.log(err));
  };

  handleBookingClick() {
    this.setState({
      view: 'checkout'
    });
  };

  userLoggedIn(userData) {
    this.setState({
      user: userData
    }, () => {
      localStorage.setItem('user', JSON.stringify(userData));
    });
  };

  userLogOut() {
    this.setState({
      user: null
    }, () => {
      localStorage.removeItem('user');
    });
  };

  login(email, password, cb) {
    const options = { method: 'POST',
      headers: {      
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      },
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify({user_email: email, user_password: password})
    };
    fetch('/login', options)
    .then((response) => {
      if(!response.ok) return console.log('ERROR IN LOGIN', response);
      return response.json();
    }).then((resObject) => {
      if(resObject.error) {
        cb(resObject.error, true);
      } else {
        cb(null, false);
        this.userLoggedIn(resObject);
      }
    })
    .catch((err) => {
      console.log('error: ', err);
    });
  };

  sendConfirmationEmail(streetAddress, city, region, postalCode, guestNumber, price) {
    emailjs.send("gmail","confirmation",
    {
      guest_email: this.state.user.email,
      guest_name: this.state.user.first_name + ' ' + this.state.user.last_name,
      street_address: streetAddress,
      city: city,
      region: region,
      postal_code: postalCode,
      guest_number: guestNumber,
      amount: price
    }).then((eServiceProvRes) => {
      console.log('email sent');
    }).catch((eServiceProvRes) => {
      console.log('err', eServiceProvRes);
    });
  }
  
  render() {
    const currentView = this.state.view;
    let showPage = null;
    if (currentView === 'searchResults') {
      showPage = 
        <SearchResults
          results={this.state.results}
          handleListingClick={this.handleListingClick}
          mapCenter={this.state.mapCenter}
          handleMapDrag={this.handleMapDrag}
        />;
    } else if (currentView === 'listingDetails') {
      showPage =
        <ListingDetails
          openLogin={this.openLogin}
          updateGuests={this.updateGuests.bind(this)}
          handleBookingClick={this.handleBookingClick.bind(this)}
          focusedInput={this.state.focusedInput}
          updateFocusedInput={this.updateFocusedInput}
          updateDates={this.updateDates}
          handleDateClick={this.handleDateClick}
          listing={this.state.listing}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          guests={this.state.guests}
          login={this.login}
          isUserLoggedIn={this.state.user ? true : false}
          triggerView={this._triggerViewChange}
        />;
    } else if (currentView === 'checkout') {
      showPage =
        <Checkout
          guests={this.state.guests}
          updateGuests={this.updateGuests.bind(this)}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          listing={this.state.listing}
          user={this.state.user}
          isUserLoggedIn={this.state.user ? true : false}
          triggerView={this._triggerViewChange}
          sendConfirmationEmail={this.sendConfirmationEmail}
        />
    } else if(currentView === 'createAccount') {
      showPage =
        <CreateAccount
          triggerView={this._triggerViewChange}
          login={this.login}
        />
    } else if (currentView === 'trips') {
      showPage = <Trips user={this.state.user} />
    } else if (currentView === 'confirmation') {
      showPage = <Confirmation />
    } else {
      showPage = 
        <MainPage 
          goToLocation={this.handleSearchClick}
        />
    }
    return (
      <div className="background">
        <div>
          <NavBar 
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            view={this.state.view}
            updateDates={this.updateDates}
            handleDateClick={this.handleDateClick}
            updateFocusedInput={this.updateFocusedInput}
            focusedInput={this.state.focusedInput}
            triggerView={this._triggerViewChange}
            isUserLoggedIn={this.state.user ? true : false}
            userLogOut={this.userLogOut}
            user={this.state.user}
            login={this.login}
            handleSearchClick={this.handleSearchClick}
            openLogin={this.openLogin}
            closeLogin={this.closeLogin}
          />
        </div>
        <br/>
        <div className='' style={{'marginTop':'5px'}}>
          {showPage}
        </div>
        <Login 
          login={this.login}
          open={this.state.loginOpen} 
          openLogin={this.openLogin}
          closeLogin={this.closeLogin}
          triggerView={this._triggerViewChange}
        />
      </div>
    );
  };

  _triggerViewChange(requestedView) {
    this.setState({
      view: requestedView
    });
  };

  _storageAvailable(type) {
    try {
      var storage = window[type],
        x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    }
    catch(e) {
      return e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        storage.length !== 0;
    }
  }
};

render(<App />, document.getElementById('app'));
