import React from 'react';
import moment from 'moment';
import StarBorder from 'material-ui-icons/StarBorder'
import Stars from './Stars.jsx';

class Trip extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <div className='trip-container'>
        <div className='trip-image'>
          <img src={this.props.booking.image_url} />
        </div>
        <div className='trip-avatar'>
          <img src={this.props.booking.avatar_url} />
        </div>
        <div className='trip-city'>
          <h3>{this.props.booking.address_city}</h3>
        </div>
        <div className='trip-details'>
          <p>{`${moment(this.props.booking.start_date).format('ll')} - ${moment(this.props.booking.end_date).format('ll')}`}</p>
          <p>{`${this.props.booking.num_guests} guests`}</p>
          <h5>{this.props.booking.name}</h5>
        </div>
        <div className='trip-receipt'>
          <h5>View Receipt</h5>
        </div>
        <div className='trip-rating'>
          {/* {this.renderRating()} */}
          <Stars
            rating={this.props.booking.average_stars}
            offset={0.25}
            total={5}
          />
          <p>Write a Review</p>
        </div>
        <div className='trip-border' />
        <div className='trip-receipt'>
          <h5>View Receipt</h5>
        </div>
      </div>
    )
  }
}

export default Trip;