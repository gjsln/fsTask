import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from './../../actions/authActions';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  static getDerivedStateFromProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      nextProps.history.push('/dashboard');
      return {};
    }

    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      };
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }
  render() {
    const { errors } = this.state;

    return (
      <div className='login'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8 m-auto'>
              <h1 className='display-4 text-center'> Log In </h1>
              <p className='lead text-center'>Sign in to your User account </p>
              <form noValidate onSubmit={this.onSubmit}>
                <div className='form-group'>
                  <input
                    type='email'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.email
                    })}
                    placeholder='Email Address'
                    onChange={this.onChange}
                    value={this.state.email}
                    name='email'
                  />
                  {errors.email && (
                    <div className='invalid-feedback'> {errors.email} </div>
                  )}
                </div>
                <div className='form-group'>
                  <input
                    type='password'
                    className={classnames('form-control form-control-lg', {
                      'is-invalid': errors.password
                    })}
                    placeholder='Password'
                    onChange={this.onChange}
                    value={this.state.password}
                    name='password'
                  />
                  {errors.password && (
                    <div className='invalid-feedback'> {errors.password} </div>
                  )}
                </div>
                <input type='submit' className='btn btn-info btn-block mt-4' />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  {
    loginUser
  }
)(Login);
