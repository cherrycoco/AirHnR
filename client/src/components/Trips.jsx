import React from 'react';
import Trip from './Trip.jsx';

const bookingData = [{
  price: 100,
  fee_service: 40,
  fee_cleaning: 40,
  tax: 30,
  total: 370,
  start_date: '04/01/2018',
  end_date: '07/01/2018',
  number_of_nights: 3,
  num_guests: 3,
  address_city: "New York",
  name: 'Really, really white house',
  average_stars: 4.5,
  reviews: 20,
  image_url: "http://www3.hilton.com/resources/media/hi/SFOFHHH/en_US/img/shared/full_page_image_gallery/main/HH_poolvwdeck01_36_1270x560_FitToBoxSmallDimension_Center.jpg",
  avatar_url: "https://robohash.org/omnisatharum.png?size=50x50&set=set1",
}, {
  price: 100,
  fee_service: 40,
  fee_cleaning: 40,
  tax: 30,
  total: 370,
  start_date: '04/01/2018',
  end_date: '07/01/2018',
  number_of_nights: 3,
  num_guests: 3,
  address_city: "New York",
  name: 'Really, really white house',
  average_stars: 4.5,
  reviews: 20,
  image_url: "http://www3.hilton.com/resources/media/hi/SFOFHHH/en_US/img/shared/full_page_image_gallery/main/HH_poolvwdeck01_36_1270x560_FitToBoxSmallDimension_Center.jpg",
  avatar_url: "https://robohash.org/omnisatharum.png?size=50x50&set=set1",
}, {
  price: 100,
  fee_service: 40,
  fee_cleaning: 40,
  tax: 30,
  total: 370,
  start_date: '04/01/2018',
  end_date: '07/01/2018',
  number_of_nights: 3,
  num_guests: 3,
  address_city: "New York",
  name: 'Really, really white house',
  average_stars: 4.5,
  reviews: 20,
  image_url: "http://www3.hilton.com/resources/media/hi/SFOFHHH/en_US/img/shared/full_page_image_gallery/main/HH_poolvwdeck01_36_1270x560_FitToBoxSmallDimension_Center.jpg",
  avatar_url: "https://robohash.org/omnisatharum.png?size=50x50&set=set1",
}];

class Trips extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bookings: []
    }
  }

  componentDidMount () {
    this.getTripsbyUser(this.props.user.id);
  }

  // fetch all trips by loggedin user
  getTripsbyUser (userId) {
    fetch(`/api/bookings/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      this.setState({
        bookings: data
      });
    }).catch(err => console.log('error from getTripsbyUser', err));
  }

  render () {
    return (
      <div>
        <h2 id='past-trips'>Trips</h2>
        <div className='trips'>
          {this.state.bookings.map((trip, idx) => (
            <Trip className='trip' key={idx} booking={trip} />
          ))}
        </div>
      </div>
    )
  }
}

export default Trips;