import React, { Component } from 'react';
import './about.css';
import {connect} from 'react-redux';
import {addUserAppearance} from './../../ducks/reducers/formReducer';
import {Link} from 'react-router-dom';

class About extends Component {
    constructor() {
        super()
        this.state = {
            age: 0,
            numbers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            colors: ['Brunette', 'Blonde', 'Black', 'Red', 'White', 'None'],
            height_ft: 0,
            height_in: 0,
            hair_color: '',
            image1: '',
            image2: '',
            image3: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        let {age, height_ft, height_in, hair_color, image1, image2, image3} = this.state
        this.props.addUserAppearance(age, height_ft, height_in, hair_color, image1, image2, image3)
    }

    
    render() {
        let {colors, numbers, age, image1, image2, image3} = this.state
        return (
            <div>
                <h1 className='about_you_header'>About You</h1>
                <div className='form_container'>

                <label id='age' className='form_labels'>Age:<input className='form_input' placeholder='Enter age' name='age' value={age} onChange={this.handleChange}/></label>

                <div className='height_container'>
                    <label id='height' className='form_labels'>Height:</label>

                    <select id='height' onChange={this.handleChange} name='height_ft' >
                        <option>Feet</option>
                        {numbers.map(num => <option value={num} key={num}>{num}</option>)}
                    </select>

                    <select id='height' onChange={this.handleChange} name='height_in' >
                        <option>Inches</option>
                        {numbers.map(num => <option value={num} key={num}>{num}</option>)}
                    </select>
                </div>

                <div className='hair_color_container'>
                    <label id='hair_color' className='form_labels'>Hair Color:</label>
                    <select id='hair_color' name='hair_color' onChange={this.handleChange}>
                        <option></option>
                        {colors.map(color => <option value={color} key={color}>{color}</option>)}
                    </select>
                </div>

                <div className='image_container'><label className='form_labels' id='profile_image'>Profile Image:</label><input id='profile_image' className='form_input' placeholder='Enter URL' name='image1' value={image1} onChange={this.handleChange}/></div>
                <div className='image_container'><label className='form_labels' id='profile_image'>Profile Image:</label><input id='profile_image' className='form_input' placeholder='Enter URL' name='image2' value={image2} onChange={this.handleChange}/></div>
                <div className='image_container'><label className='form_labels' id='profile_image'>Profile Image:</label><input id='profile_image' className='form_input' placeholder='Enter URL' name='image3' value={image3} onChange={this.handleChange}/></div>
                    <div className='form_one_button_container'>
                        <Link to='/about2'>
                        <button className='skip-button'>Skip</button>
                        <button className='next-button' onClick={this.handleSubmit}>Next</button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.form
}

export default connect(mapStateToProps, {addUserAppearance})(About);
