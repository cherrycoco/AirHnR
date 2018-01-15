import React from 'react';
import Typography from 'material-ui/Typography';
import Modal from 'material-ui/Modal';
import Button from 'material-ui/Button';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import ClearIcon from 'material-ui-icons/Clear';
import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';

const styles = theme => ({
  button: {
    // margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  }
});

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    position: 'absolute',
    width: 500,
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    border: '1px solid #e5e5e5',
    backgroundColor: '#fff',
    boxShadow: '0 5px 15px rgba(0, 0, 0, .5)',
    padding: 20,
  };
}

let buttonStyle = {
  width: '100%',

};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: this.props.open,
      password: '',
      email: '',
      errorMessage: null
    };
    // this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.badLuck = this.badLuck.bind(this);
  }

  handleOpen() {
    // this.setState({ open: true });
  };

  handleClose() {
    // this.setState({ open: false });
    this.props.closeLogin()
  };

  handleLogin(email, password) {
    this.props.login(email, password, (errMessage, shouldOpen) => {
      this.setState({
        errorMessage: errMessage,
        // open: shouldOpen
      });
      this.handleClose();
    });
  }

  createAccount() {
    this.props.triggerView('createAccount');
    this.handleClose();
  }
  badLuck() {
    alert(`Bad luck. We don't have this feature`);
  }
  render() {
    const { classes } = this.props;
    return (
      <div>
        {/* <button className={this.props.classToButton} onClick={this.handleOpen}>{this.props.buttonTitle}</button> */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          // open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={getModalStyle()}>
            <IconButton aria-label="Delete" onClick={this.handleClose}>
              <ClearIcon />
            </IconButton>
            <Button style={buttonStyle} color='primary' onClick={this.badLuck}>Log in with Facebook</Button>
            <Button onClick={this.badLuck} style={buttonStyle}>Log in with Google</Button>
            <Divider />
            or
            <form className={classes.container} autoComplete="off" noValidate>
              <div>
                <TextField
                fullWidth
                id="email"
                label="Email"
                className={classes.textField}
                value={this.state.email}
                onChange={(e) => {
                  this.setState({'email': e.target.value});
                  }
                }
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                />
              </div>
              <div>
                <TextField
                  fullWidth
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
              </div>
            </form>
            <Button style={buttonStyle} color='accent' onClick={() => this.handleLogin(this.state.email, this.state.password)}>Log in</Button>
            {this.state.errorMessage ? <div> {this.state.errorMessage} </div> : null}
            <a onClick={this.badLuck}>Forgot password?</a>
            <Divider />
            Don’t have an account? <a id='sign-up'onClick={this.createAccount.bind(this)}>Sign up</a>
          </div>
        </Modal>
      </div>
    );
  };
};

export default withStyles(styles)(Login);