import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Select from 'material-ui/Select';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    autoWidth: false,
  },
  formControl: {
    minWidth: 330,
    autoWidth: false
  },
});

class BookingGuest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      guests: this.props.guestsSelected || 1
    };
  }

  // conditional rendering of max selectable guests
  renderSelect () {
    let guests = [];
    for (let i = 1; i <= this.props.maxGuests; i++) {
      guests.push(i);
    }

    return guests.map(guest => {
      return <MenuItem key={guest} value={guest}>{guest}</MenuItem>
    });
  }  

  // update the number of guests selected 
  handleChange (event) {
    this.setState({
      guests: event.target.value
    });
    this.props.updateGuests(event.target.value);
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel id='guest-lable' htmlFor="guests-simple">Guests</InputLabel>
          <Select id='guest-select'
            value={this.state.guests}
            onChange={this.handleChange.bind(this)}
            input={<Input name="guests" id="guests-simple" />}
          >
            {this.renderSelect()}
          </Select>
        </FormControl>
      </form>
    );
  }
}

BookingGuest.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(BookingGuest);