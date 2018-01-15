import React from 'react';
import ReactDOM  from 'react-dom';
import { render } from 'react-dom';
import css from '../styles/styles.css';
import { BrowserRouter } from 'react-router-dom';
import SearchResult from './SearchResult.jsx'
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import MapContainer from './MapContainer';
import $ from 'jquery';
import FeaturedPlaces from './FeaturedPlaces';

const styles = {
  root: {
    // flexGrow: 1,
    // flexShrink: 0,
    // flexBasis: 'auto',
    // alignItems: 'stretch',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
};

class SearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResultsFound: true
    };
    this.node = '';
    this.handleListingClick = this.handleListingClick.bind(this);
  }

  componentDidMount() {
    this._setMapPosition();
    if(!this.props.results.length) {
      this.setState({
        searchResultsFound: false
      });
    }
  }

  handleListingClick(listingID) {
    this.props.handleListingClick(listingID);
  }

  render() {
    var listings = this.props.results;
    if(this.state.searchResultsFound) {
      return (
        <div className="listing-details">
          <div className="listings" style={styles.root}>
            <Grid container spacing={16} style={styles.root}>
              { listings.map(listing => (
                <Grid item key={listing.id}>
                  <SearchResult 
                    key={listing.id}
                    id={listing.id}
                    roomtype={listing.room_type}
                    beds={listing.beds}
                    name={listing.name}
                    price={listing.price}
                    rating={listing.average_stars}
                    image={listing.image_url}
                    handleClick={this.handleListingClick}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
          <div className="map-container" ref={node => this.node = node}>
            <MapContainer 
              listings={listings} 
              handleMapDrag={this.props.handleMapDrag} 
              searchedLocation={this.props.mapCenter}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className='listing-details' style={{marginTop: '10%'}}>
          <div className='listings' style={{marginLeft: '20%'}}>
            <img src="https://www.bhiner.com/img/noResult.png" alt="No Results"/>
          </div>
          <div className='map-container' style={{marginLeft: '10%', marginTop: '20%'}}>
            <h4>No results found</h4>
            <p>Please search for a different location</p>
          </div>
        </div>
      );
    }
  }

  _setMapPosition() {
    let divNodes = $(this.node).find('div');
    $(divNodes[0]).css({
      width: '100%',
      height: '100%',
      position: 'fixed'
    });
    $(divNodes[1]).css({
      position: 'relative'
    });
  }
}

export default /*withStyles(styles)(*/SearchResults/*)*/;