//this file creates a bunch of fake data to be populated into the database
//other files in data folder are used for data sources

const userdata = require('./users.json');
const locationdata = require('./locations.json');
const reviewdata = require('./reviews.json')
const nyll = require('./ny_lat_long.json');
const sfll = require('./sf_lat_long.json');
const tokyoll = require('./tokyo_lat_long.json');
const lall = require('./la_lat_long.json');
const capell = require('./cape_town_lat_long.json');
const house_pics = require('./pics.json');
const home_types = ['Home', 'Aprtment', 'Abode', 'Townhouse', 'Hole In the Wall', 'Hole In the Ground', 'Mansion', 'Castle', 'Dump', 'Slum', 'House', 'Flat', 'Palace', 'Estate', 'Dwelling', 'Box', 'Co-Op', 'Lean-To', 'Cardboard Box', 'Shanty', 'Cairn', 'Alleyway', 'Flophouse', 'Couch', 'Basement', 'Attic', 'Loft', 'Condo', 'Condominium', 'Duplex', 'Shed', 'Barn', 'Penthouse', 'Suite', 'Cabin', 'Shack', 'Love Shack', 'Domicile', 'Dormitory', 'Closet', 'Home', 'Apartment', 'Home', 'Apartment', 'Flat', 'Home', 'Apartment', 'Home', 'Apartment', 'Flat', 'Home', 'Apartment', 'Home', 'Apartment', 'Flat', 'Home', 'Apartment', 'Home', 'Apartment', 'Flat', 'House', 'House', 'House', 'House', 'Loft', 'Loft', 'Loft', 'Studio', 'Studio', 'Studio', 'Room'];
const room_types = ['Couch', 'Room', 'Studio', 'House', 'Entire House', 'Private Room', 'Entire Apartment'];

const toTitleCase = (word) => {
  return word.slice(0, 1).toUpperCase() + word.slice(1);
};

const properCase = (string) => {
  return string.slice(0, 1).toLowerCase() + string.slice(1);
};

const pickOne = (array) => {
  return array[Math.floor(Math.random() * array.length)]
};

const numberInRange = (start, stop) => {
  if (stop) {
    return Math.floor(Math.random() * (1 + stop - start)) + start;
  }
  else {
    return Math.floor(Math.random() * (start + 1));
  }
};

const listingRange = () => {
  let startDay = numberInRange(1, 28);
  let endDay = numberInRange(1, 28);
  let startMonth = numberInRange(1, 12);
  let endMonth = numberInRange(1, 12);
  let startYear = pickOne([2017, 2018]);
  let endYear = pickOne([2019, 2020]);
  return {
    start: new Date(`${startMonth}/${startDay}/${startYear}`),
    end: new Date(`${endMonth}/${endDay}/${endYear}`)
  };
};

const generateAmenity = () => {
  return {
    wifi: pickOne([true, true, true, true, true, true, false]),
    kitchen: pickOne([false, false, false, false, false, true, false]),
    hotTub: pickOne([false, false, false, false, false, true, false])
  };
};

const generateHouseRules = () => {
  return {
    pets: pickOne([true, false, false]),
    smoking: pickOne([false, false, false, false, false, true, false]),
    checkIn: '12:00 PM',
    checkOut: '12:00 PM'
  }
};

const createUsers = () => {
  let address_info = [['New York', 'NY', '10001'], ['San Francisco', 'CA', '94117'], ['Los Angeles', 'CA', '90210'], ['Cape Town', 'South Africa', '85673'], ['Tokyo', 'Japan', '64947']];
  return userdata.map( (dp, idx) => { 
    let city = idx % address_info.length;
    let index = dp.email.indexOf('@');
    let email = dp.email.slice(0, index) + idx.toString() + dp.email.slice(index);
    return {
      username: idx.toString() + dp.username,
      password: dp.password,
      first_name: dp.first_name,
      last_name: dp.last_name,
      account_created: dp.account_created,
      email: email,
      about_me: dp.about_me,
      avatar_url: dp.avatar_url,
      phone_number: dp.phone_number,
      credit_card_number: dp.credit_card_number,
      address_street: dp.address_street,
      address_city: address_info[city][0],
      address_region: address_info[city][1],
      address_postal_code: address_info[city][2],
      is_host: dp.is_host
    };
  });
};

const createLocations = () => {
  let citylls = [sfll, nyll, lall, capell, tokyoll];
  let address_info = [['New York', 'NY', '10001'], ['San Francisco', 'CA', '94117'], ['Los Angeles', 'CA', '90210'], ['Cape Town', 'South Africa', '85673'], ['Tokyo', 'Japan', '64947']];
  return locationdata.map((dp, idx) => {
    let city = Math.floor(idx / 200);
    let cityidx = idx % 200;//idx < locationdata.length - 1 ? idx : idx - 101;
    let cityll = citylls[city];
    return {
      name: `${toTitleCase(dp.adjective)} ${address_info[city][0]} ${pickOne(home_types)}`,
      tagline: dp.tagline,
      description: dp.description,
      image_url: pickOne(house_pics),
      room_type: pickOne(room_types),
      max_guests: pickOne([1, 2, 2, 3, 3, 4, 4, 4, 4, 5, 5, 6, 6]),
      beds: pickOne([1, 1, 1, 2, 2, 2, 3, 3, 4, 4, 4, 4, 5, 6]),
      bathrooms: numberInRange(1, 3),
      latitude: cityll[cityidx].latitude,
      longitude: cityll[cityidx].longitude,
      cancellation: pickOne([true, false]),
      amenities: generateAmenity(),
      house_rules: generateHouseRules(),
      host_id: (idx % userdata.length) + 1,
      address_street: dp.address_street,
      address_city: address_info[city][0],
      address_region: address_info[city][1],
      address_postal_code: address_info[city][2]
    };
  });
};

//500
const createListings = (num) => {
  return Array(num).fill(null).map((dp, idx) => {
    let range = listingRange();
    return {
      start_date: range.start,
      end_date: range.end,
      price: numberInRange(40, 350),
      fee_service: 50,
      fee_cleaning: pickOne([0, 0, 0, 15, 15, 25, 25, 50]),
      location_id: idx + 1,
      host_id: (idx % userdata.length) + 1
    };
  });
};

//300
const createBookings = (num) => {
  return Array(num).fill(null).map((dp, idx) => {
    let nights = numberInRange(1, 7);
    let startDay = numberInRange(1, 21);
    let endDay = startDay + nights;
    let month = numberInRange(1, 12);
    let price = numberInRange(40, 350);
    let fee_service = 50;
    let fee_cleaning = pickOne([0, 0, 0, 15, 15, 25, 25, 50]);
    let tax = nights * price * 0.085;
    let total = (nights * price * 1.085) + fee_service + fee_service;
    return {
      start_date: new Date(`${month}/${startDay}/2018`),
      end_date: new Date(`${month}/${endDay}/2018`),
      price: price,
      location_id: numberInRange(1, locationdata.length),
      host_id: (idx % userdata.length) + 1,
      fee_service: fee_service,
      fee_cleaning: fee_cleaning,
      tax: tax,
      total: total,
      number_of_nights: nights,
      guest_id: numberInRange(1, userdata.length)
    };
  });
};

//500
const createFavorites = (num) => {
  return Array(num).fill(null).map((dp, idx) => {
    return {
      location_id: numberInRange(1, locationdata.length),
      user_id: numberInRange(1, userdata.length)
    };
  });
};

// 800
const createLocationReviews = (num) => {
  return Array(num).fill(null).map((dp, idx) => {
    return {
      tagline: toTitleCase(pickOne(reviewdata).buzzword) + ' ' + properCase(pickOne(reviewdata).tagline),
      review_text: pickOne(reviewdata).review,
      stars: numberInRange(1, 5),
      location_id: numberInRange(1, locationdata.length),
      reviewer_id: numberInRange(1, userdata.length)
    };
  });
};

//600
const createHostReviews = (num) => {
  return Array(num).fill(null).map((dp, idx) => {
    return {
      tagline: toTitleCase(pickOne(reviewdata).buzzword) + ' ' + properCase(pickOne(reviewdata).tagline),
      review_text: pickOne(reviewdata).review,
      stars: numberInRange(1, 5),
      host_id: numberInRange(1, userdata.length),
      reviewer_id: numberInRange(1, userdata.length)
    };
  });
};

//500
const createGuestReviews = (num) => {
  return Array(num).fill(null).map((dp, idx) => {
    return {
      tagline: toTitleCase(pickOne(reviewdata).buzzword) + ' ' + properCase(pickOne(reviewdata).tagline),
      review_text: pickOne(reviewdata).review,
      stars: numberInRange(1, 5),
      guest_id: numberInRange(1, userdata.length),
      reviewer_id: numberInRange(1, userdata.length)
    };
  });
};

const users = createUsers(); //50
const locations = createLocations(); //1000 
const listings = createListings(locations.length);
const bookings = createBookings(300);
const favorites = createFavorites(10);
const location_reviews = createLocationReviews(800);
const host_reviews = createHostReviews(10);
const guest_reviews = createGuestReviews(10);

console.log('NOTE: THE FOLLOWING EXAMPLES DO NOT INCLUDE DB-GENERATED KEYS');
console.log('EXAMPLE user:', users[0]);
console.log('EXAMPLE location:', locations[0]);
console.log('EXAMPLE listing:', listings[0]);
console.log('EXAMPLE booking:', bookings[0]);
console.log('EXAMPLE favorite:', favorites[0]);
console.log('EXAMPLE location review:', location_reviews[0]);
console.log('EXAMPLE host review:', host_reviews[0]);
console.log('EXAMPLE guest review:', guest_reviews[0]);

console.log('\nSizes:');
console.log('users:', users.length);
console.log('locations:', locations.length);
console.log('listings:', listings.length);
console.log('bookings:', bookings.length);
console.log('favorites:', favorites.length);
console.log('location reviews:', location_reviews.length);
console.log('host reviews:', host_reviews.length);
console.log('guest reviews:', guest_reviews.length);


module.exports = {
  users: users,
  locations: locations,
  listings: listings,
  bookings: bookings,
  favorites: favorites,
  location_reviews: location_reviews,
  host_reviews: host_reviews,
  guest_reviews: guest_reviews
};