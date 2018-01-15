import React from 'react';

const styles = {
  header: {
    fontSize: '28px',
    lineHeight: '32px',
    letterSpacing: '-0.6px',
    paddingTop: '2px',
    paddingBottom: '2px'
  },
  container: {
    display: 'flex',
    color: '#484848',
    height: '100px'
  },
  destTitle: {
    fontSize: '20px',
    letterSpacing: '0.2px',
    paddingBottom: '100px'
  },
  img: {
    width: '100%',
    backgroundPosition: 'center center'
  },
  destination: {
    paddingRight: '0.5%',
    paddingLeft: '0.5%',
    cursor: 'pointer'
  }
}

let Place = (props) => {
  return (
  <div style={styles.destination} className="destination" onClick={(e) => props.goToLocation(props.placeName)}>
    <div className="dest-img">
      <img style={styles.img} src={props.imgUrl}/>
    </div>
    <div className="dest-title">
      <span style={styles.destTitle}>{props.placeName}</span>
    </div>
  </div>
  )
}

let FeaturedPlaces = (props) => {
  let arrayOfItems = [
    {
      place: 'San Francisco',
      imgUrl: 'https://a0.muscache.com/im/pictures/5be8a4f2-0aab-4bb8-b892-61527da7b550.jpg?aki_policy=poster'
    },
    {
      place: 'Tokyo',
      imgUrl: 'https://a0.muscache.com/im/pictures/1d8ecdb4-da01-4d35-9c9e-2ef6ca604eca.jpg?aki_policy=poster',
    },
    {
      place: 'Cape Town',
      imgUrl: 'https://a0.muscache.com/im/pictures/0e2e4ace-7f04-4895-b7c6-482c99e69908.jpg?aki_policy=poster'
    },
    {
      place: 'Los Angeles',
      imgUrl: 'https://a0.muscache.com/im/pictures/7bff51c1-3c35-47a5-a86c-5ea75ab6be6c.jpg?aki_policy=poster'
    },
    {
      place: 'New York',
      imgUrl: 'https://image.ibb.co/hbaNHR/nytravel.png'
    }
  ];
  let places = arrayOfItems.map((val, index) => {
    return <Place placeName={val.place} imgUrl={val.imgUrl} key={index} goToLocation={props.goToLocation}/>
  })

  return (
    <div style={{marginLeft: '60px', marginRight: '60px', marginBottom: '60px', marginTop: '150px'}}>
      <h3 style={styles.header}>Featured Destinations</h3>
      <div className="dest-container" style={styles.container}>
        {places}
      </div>
    </div>
  )
}

export default FeaturedPlaces;