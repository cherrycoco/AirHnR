import React from 'react';
import ListingNav from './listingNav.jsx';
import Button from 'material-ui/Button';
import _ from 'lodash';
import Booking from './Booking.jsx'
import moment from 'moment';
import Stars from './Stars.jsx';

// let bookingSampleData = {
//   start_date: '01/01/2018',
//   end_date: '04/01/2018',
//   nights: 3,
// };

//need star rating, review count, host_name

class ListingDetails extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      showDescription: false
    };
  }

  // conditional render of number of maximum guest capacity
  renderGuests () {
    if (this.props.listing.max_guests === 1) {
      return (
        <div> 
          <span className='listing-space-detail'>👯</span> 
          <span className='listing-space-detail'>{`${this.props.listing.max_guests} guest`}</span>
        </div> 
      )
    } else {
      return (
        <div>
          <span className='listing-space-detail'>👯</span> 
          <span className='listing-space-detail'>{`${this.props.listing.max_guests} guests`}</span>
        </div>
      )
    }
  }

  // conditional render of number of beds
  renderBeds () {
    if (this.props.listing.beds === 1) {
      return (
        <div>
          <span className='listing-space-detail'>🛌 </span> 
          <span className='listing-space-detail'>{`${this.props.listing.beds} bed`}</span>
        </div>
      )
    } else {
      return (
        <div>
          <span className='listing-space-detail'>🛌 </span> 
          <span className='listing-space-detail'>{`${this.props.listing.beds} beds`}</span>
        </div>
      )
    }
  }

  // conditional rendering of number of bathrooms
  renderBathrooms () {
    if (this.props.listing.bathrooms === 1) {
      return (
        <div>
          <span className='listing-space-detail'>🛀 </span> 
          <span className='listing-space-detail'>{`${this.props.listing.bathrooms} bathroom`}</span>
        </div>
      )
    } else {
      return (
        <div>
            <span className='listing-space-detail'>🛀 </span> 
            <span className='listing-space-detail'>{`${this.props.listing.bathrooms} bathrooms`}</span>
        </div>
      )
    }
  }

  // conditional rendering of description (short or long)
  // toggle state button changes the state of showDescription
  renderDescription () {
    if (!this.state.showDescription) {
      return (
        <div className='listing-description'>
          <p>{this.props.listing.tagline}</p>
          <Button onClick={()=> this.setState({showDescription: true})}>{`Read more about the space`}</Button>
        </div>
      );
    } else {
      return (
        <div className='listing-description'>
          <p>{this.props.listing.description}</p>
          <Button onClick={()=> this.setState({showDescription: false})}>Hide</Button>
        </div>
      );
    }
  }


  // render all the amenities, if amenity not available (strike through the text)
  renderAmenities () {
    return _.map(this.props.listing.amenities, (val, key) => {
      if (val) {
        return <li key={key} className='amenity'>{key}</li>
      } else {
        return <li key={key} className='amenity strike'>{key}</li>  
      }
    });
  }

  // render all house rules
  renderHouseRules () {
    return _.map(this.props.listing.house_rules, (val, key) => {
      if (val) {
        if (key === 'checkIn') {
          return <li key={key}>{`Check-in at ${val}`}</li>
        } else if (key === 'checkOut') {
          return <li key={key}>{`Check-out by ${val}`}</li>
        } else if (key === 'pets') {
          return <li key={key}>Suitable for pets</li>
        } else {
          return <li key={key}>No Smoking</li>
        }
      } else {
        if (key === 'pets') {
          return <li key={key}>Not suitable for pets</li>
        } else {
          return <li key={key}>Smoking Allowed</li>
        }
      }
    });
  }

  // render cancellation policy
  renderCancellation () {
    if (this.props.listing.cancellation) {
      return (
        <div>
          <p>Flexible</p>
          <p>Cancel up to 2 days before check in and get a full refund (minus service fees). Cancel within 2 days of your trip and the first night is non-refundable, but 50% of the cost for the remaining nights will be refunded.</p>
        </div>
      );
    } else {
      return (
        <div>
          <p>Strict</p>
          <p>Cancel up to 7 days before check in and get a 50% refund (minus service fees). Cancel within 7 days of your trip and the reservation is non-refundable. Service fees are refunded when cancellation happens before check in and within 48 hours of booking.</p>
        </div>
      );          
    }
  }

  render () {
    return (
      <div className='listing-wrapper'>

        // the booking component 
        <div className='listing-booking'>
          <Booking 
          updateGuests={this.props.updateGuests} 
          updateDates={this.props.updateDates} 
          focusedInput={this.props.focusedInput} 
          updateFocusedInput={this.props.updateFocusedInput} 
          handleDateClick={this.props.handleDateClick} 
          endDate={this.props.endDate} 
          startDate={this.props.startDate} 
          handleBookingClick={this.props.handleBookingClick} 
          listing={this.props.listing} 
          button={true} 
          openLogin={this.props.openLogin}
          login={this.props.login}
          isUserLoggedIn={this.props.isUserLoggedIn}
          />
        </div>

        // Listing details
        <div className='listing-img'>
          <img src={this.props.listing.image_url}/> 
        </div>
        <ListingNav />
        <div className='line-break1'></div>
        <div className='listing-title'>
          <h1>{this.props.listing.name}</h1>
        </div>
        <div className='listing-type'>
          <p>{`${this.props.listing.room_type} · ${this.props.listing.address_city}`}</p>
          <p>{`Hosted by ${this.props.listing.first_name}`}</p>
        </div>
        <div className='listing-space'> 
          {this.renderGuests()}
          {this.renderBeds()}
          {this.renderBathrooms()}
        </div>
        
        // descriptions
        {this.renderDescription()}
        <div className='line-break2'></div>

        // List of amenities
        <div className='listing-amenities'>
          <h3>Amenities</h3>
          <ul>
            {this.renderAmenities()}
          </ul>
        </div>
        <div className='line-break3'></div>

        //House rules
        <div className='listing-houserules'>
          <h3>House Rules</h3>
          <ul>
            {this.renderHouseRules()}
          </ul>
        </div>
        <div className='line-break4'></div>

        //cancellation policy
        <div className='listing-cancellation'>
          <h3>Cancellations</h3>
          {this.renderCancellation()}
        </div>
        <div className='line-break5'></div>

        // list rating and star rating
        <div className='listing-rating'>
          <h2>{`${this.props.listing.review_count} Reviews`}</h2>
        </div>
        <div className='listing-rating-img'>
          <Stars
            rating={this.props.listing.average_stars}
            offset={0.25}
            total={5}
          />
        </div>
        <div className='line-break6'></div>

        // Host information
        <div className='listing-host'>
          <h2>{`Hosted By ${this.props.listing.first_name}`}</h2>
          <p>{`${this.props.listing.user_address_city}, ${this.props.listing.user_address_region}, United States`}</p>
          <p>{`Joined in ${moment(this.props.listing.account_created).format('MMM YYYY')}`}</p>
        </div>
        <div className='listing-host-img'>
          <img src={this.props.listing.avatar_url} />
        </div>
      </div>
    )
  }
}

export default ListingDetails;
