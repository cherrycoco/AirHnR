import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import MenuItem from 'material-ui/Menu/MenuItem';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '2%%',
  },
  textField: {
    width: 200,
    marginRight: '20px'
  },
  menu: {
    width: 200,
  },
  text: {
    fontSize: 'calc(0.5vw)',
    lineHeight: 'calc(0.7vw + 48px)',
  },
  description: {
    fontSize: 'calc(0.5vw + 20px)',
    lineHeight: 'calc(0.7vw + 48px)',
    width: '45%'
  }
});

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      age: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      email: '',
      phoneNumber: '',
      passwordError: '',
      missingMandatoryFields: '',
      addressStreet: '',
      addressCity: '',
      addressRegion: '',
      addressPostalCode: '',
      serverMessage: null,
      loading: false
    };
    this.passwordNode = null;
  }

  createAccount() {
    if(this.state.password !== this.state.confirmPassword) {
      console.log('EERRORR');
      this.setState({
        passwordError: 'Passwords do not match'
      });
    } else {
      this.setState({
        passwordError: ''
      });
      if(this.state.name.length > 0 && this.state.lastName.length > 0 && this.state.password.length > 7 && this.state.email.length > 0) {
        this.setState({
          missingMandatoryFields: '',
        });
        //valid input, create user!
        let userData = {
          name: this.state.name,
          age: this.state.age,
          lastName: this.state.lastName,
          password: this.state.password,
          email: this.state.email,
          phoneNumber: this.state.phoneNumber,
          addressStreet: this.state.addressStreet,
          addressCity: this.state.addressCity,
          addressRegion: this.state.addressRegion,
          addressPostalCode: this.state.addressPostalCode
        }
        this.setState({
          loading: true
        });

        this._postNewUser(userData, (response) => {
          setTimeout(() => {
            this.setState({
              serverMessage: response.message,
              loading: false
            });
            if(response.ok) {
              this.props.login(this.state.email, this.state.password, () => {
                this.props.triggerView('default');
              });
            }
          }, 2000);
        });
      } else {
        this.setState({
          missingMandatoryFields: 'Complete all mandatory fields'
        });
      }
    }
  }
  render() {
    const { classes } = this.props;
    return (
      <div style={{margin: '10% 60px'}}>
        <p style={styles().description}>Create your new Airhnr account: </p>
        <p>- Password must be more than 7 characters long.</p>
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            required
            id="name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            helperText={this.state.missingMandatoryFields}
            onChange={(e) => {
              this.setState({'name': e.target.value, 'missingMandatoryFields': ''});
              }
            }
            margin="normal"
          />
          <TextField
            required
            id="last-name"
            label="Last Name"
            className={classes.textField}
            value={this.state.lastName}
            helperText={this.state.missingMandatoryFields}
            onChange={(e) => {
              this.setState({'lastName': e.target.value, 'missingMandatoryFields': ''});
              }
            }
            margin="normal"
          />
          <TextField
            required
            id="email"
            label="E-mail"
            className={classes.textField}
            value={this.state.email}
            helperText={this.state.missingMandatoryFields}
            onChange={(e) => {
              this.setState({'email': e.target.value, 'missingMandatoryFields': ''});
              }
            }
            margin="normal"
          />
          <TextField
            required
            id="password"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            helperText={this.state.passwordError}
            onChange={(e) => this.setState({'password': e.target.value})}
          />
          <TextField
            required
            id="confirm-password"
            label="Confirm Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            helperText={this.state.passwordError}
            onChange={(e) => this.setState({'confirmPassword': e.target.value})}
          />
          <TextField
            id="street"
            label="Street Address"
            className={classes.textField}
            value={this.state.addressStreet}
            helperText={this.state.missingMandatoryFields}
            onChange={(e) => {
              this.setState({'addressStreet': e.target.value, 'missingMandatoryFields': ''});
              }
            }
            margin="normal"
          />
          <TextField
            id="city"
            label="City"
            className={classes.textField}
            value={this.state.addressCity}
            helperText={this.state.missingMandatoryFields}
            onChange={(e) => {
              this.setState({'addressCity': e.target.value, 'missingMandatoryFields': ''});
              }
            }
            margin="normal"
          />
          <TextField
            id="region"
            label="Region"
            className={classes.textField}
            value={this.state.addressRegion}
            helperText={this.state.missingMandatoryFields}
            onChange={(e) => {
              this.setState({'addressRegion': e.target.value, 'missingMandatoryFields': ''});
              }
            }
            margin="normal"
          />
          <TextField
            id="zip-code"
            label="Postal Code"
            className={classes.textField}
            value={this.state.addressPostalCode}
            helperText={this.state.missingMandatoryFields}
            onChange={(e) => {
              this.setState({'addressPostalCode': e.target.value, 'missingMandatoryFields': ''});
              }
            }
            margin="normal"
          />
        </form>
        <div className="submission">
          <div>
            <Button raised className={classes.button} onClick={() => this.createAccount()} style={{marginRight: '10px', marginTop: '10px'}}>
              Create Account
            </Button>
          </div>
          <div>
            {this.state.serverMessage ? <span style={{'marginLeft': '10px'}}>{this.state.serverMessage}</span> : null}
            {this.state.loading ? <div><CircularProgress className={classes.progress} style={{'marginTop': '10px'}}/></div> : null}
          </div>
        </div>
      </div>
    );
  }

  _postNewUser(users, cb) {
    const options = { 
      method: 'POST',
      headers: {      
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(users)
    };
  
    return fetch('/api/users', options)
    .then((response) => {
      if(!response.ok) return console.log('error', response);
      return response.json();
    }).then((res) => {
      cb(res);
    }).catch((err) => console.log('error: ', err));
  }
}


export default withStyles(styles)(CreateAccount);