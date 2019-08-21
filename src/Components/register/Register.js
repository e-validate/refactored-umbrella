import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from './../../ducks/reducers/sessionReducer';
import {Link} from 'react-router-dom';

class Register extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            password: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    resetInput = () => {
        this.setState({
            name: '',
            email: '',
            password: ''
        })
    }

    register = () => {
        this.props.register(this.state.name, this.state.email, this.state.password)
        .catch(() => {
            alert('Email already in use.');
            this.resetInput();
        })
    }

    render() {
        let {name, email, password} = this.state
        let {user} = this.props;
        if (user.loggedIn) return <Redirect to='/'/>
        return (
            <div>
                <div className='login_container'>
                <input className='login_inputs' type='text' placeholder='Enter name' name='name' value={name} onChange={this.handleChange}/>
                    <input className='login_inputs' type='text' placeholder='Enter email' name='email' value={email} onChange={this.handleChange}/>
                    <input className='login_inputs' type='password' placeholder='Enter password'  name='password' value={password} onChange={this.handleChange}/>
                    <Link to='/about'><button className='login_button' onClick={this.register}>Register</button></Link>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.session;
}


export default connect(mapStateToProps, {register})(Register);