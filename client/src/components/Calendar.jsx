import React from 'react';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

function rand() {
  return Math.floor(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    position: 'absolute',
    width: 8 * 50,
    top: `100px`,
    left: `75%`,
    transform: `translate(-${top}%, -${left}%)`,
    padding: 0,
  };
}

class Calendar extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      open: false,
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return (
      <div>
        <Button id='book-button' onClick={this.handleOpen}>Date</Button>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()}>
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
          </div>
        </Modal>
      </div>
    );
  }
}

export default Calendar;