import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { editUser } from '../actions/authentication';
import classnames from 'classnames';
import axios from 'axios';

class ProfileEdit extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            location: '',
            bio: '',
            email: '',
            avatar: '',
            password: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            location: this.state.location,
            bio: this.state.bio,
            email: this.state.email,
            avatar: this.state.avatar,
            password: this.state.password,
        }
        this.props.editUser(user, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(!nextProps.auth.isAuthenticated) {
            this.props.history.push('/')
        }
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    componentDidMount() {
        if(!this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        axios.get('/api/users/me')
            .then(res => {
              console.log(res.data);
                this.setState({
                    name: res.data.name,
                    location: res.data.location,
                    bio: res.data.bio,
                    email: res.data.email,
                    avatar: res.data.avatar
                })
            })
    }

    render() {
        const { errors } = this.state;
        return(
        <div className="container" style={{ marginTop: '50px', width: '700px'}}>
            <h2 style={{marginBottom: '40px'}}>Edit your profile</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Name"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.name
                    })}
                    name="name"
                    onChange={ this.handleInputChange }
                    value={ this.state.name }
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Location"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.location
                    })}
                    name="location"
                    onChange={ this.handleInputChange }
                    value={ this.state.location }
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Bio"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.bio
                    })}
                    name="bio"
                    onChange={ this.handleInputChange }
                    value={ this.state.bio }
                    />
                    {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                    })}
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="text"
                    placeholder="Avatar url"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.avatar
                    })}
                    name="avatar"
                    onChange={ this.handleInputChange }
                    value={ this.state.avatar }
                    />
                    {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                    })}
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                    {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

ProfileEdit.propTypes = {
    editUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{ editUser })(withRouter(ProfileEdit))
