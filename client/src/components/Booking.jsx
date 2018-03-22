import React from 'react';
import ArrowForward from 'material-ui-icons/ArrowForward'
import BookingGuest from './BookingGuest';
import Login from './Login.jsx';
import Stars from './Stars.jsx';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class Booking extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      nights: this.props.endDate.diff(this.props.startDate, 'days')
    }
  }

  // conditional rendering of booking button 
  renderBookingButton () {
    if (this.props.button) {
      return (
        <div className='booking-button'>
          {this.props.isUserLoggedIn ? 
            <button onClick={this.props.handleBookingClick}>Book</button> : 
            <button onClick={this.props.openLogin}>Book</button> }
        </div>
      )
    }
  }
              
  render () {
    return (
      
      <div className='booking-container'>

        // booking details
        <div className='booking-price'>
          <span className='price-perNight'>{`$${this.props.listing.price}`}</span>
          <span className='perNight-text'>per night</span>
          <br/>
          <Stars
            rating={this.props.listing.average_stars}
            offset={0.25}
            total={5}
          />
        </div>

        // booking dates
        <div className='booking-dates'>
          <DateRangePicker 
            startDate={this.props.startDate} // momentPropTypes.momentObj or null,
            startDateId={'3'}
            endDate={this.props.endDate} // momentPropTypes.momentObj or null,
            endDateId={'4'}
            onDatesChange={this.props.updateDates} // PropTypes.func.isRequired,
            focusedInput={this.props.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={this.props.updateFocusedInput} // PropTypes.func.isRequired,
            onClose={this.props.handleDateClick}
            disabled
          />
        </div>

        // number of guests selector
        <div className='booking-guests'>
          <BookingGuest guestsSelected={this.props.guests} updateGuests={this.props.updateGuests} maxGuests={this.props.listing.max_guests}/>
        </div>

        // booking subtotal calculated based on number of nights and listing price
        <div className='booking-subtotal'>
          <span className='booking-item'>{`$${this.props.listing.price} x ${this.state.nights} nights`}</span>
          <span className='booking-item-price'>{`$${this.props.listing.price * this.state.nights}`}</span>
        </div>

        // cleaning fees
        {(() => {
          if (this.props.listing.fee_cleaning !== 0) {
            return (
              <div className='booking-cleaning-fee'>
              <span className='booking-item'>Cleaning fee</span>
              <span className='booking-item-price'>{`$${this.props.listing.fee_cleaning}`}</span>
            </div>
            )
          }
        })()}

        // booking service fee
        <div className='booking-service-fee'>
          <span className='booking-item'>Service fee</span>
          <span className='booking-item-price'>{`$${this.props.listing.fee_service}`}</span>
        </div>

        // Occupancy taxes
        <div className='booking-tax'>
          <span className='booking-item'>Occupancy Taxes</span>
          <span className='booking-item-price'>{`$${Math.round(0.085 * this.props.listing.price * this.state.nights)}`}</span>
        </div>

        // calculation of total adding all fees and subtotal
        <div className='booking-total'>
          <span className='booking-item'>Total</span>
          <span className='booking-item-price'>{`$${Math.round(1.085 * this.props.listing.price * this.state.nights + this.props.listing.fee_service + this.props.listing.fee_cleaning)}`}</span>
        </div>
  
        {this.renderBookingButton()}

      </div>
    )
  }
} 

export default Booking;