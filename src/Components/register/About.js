import React, { Component } from 'react';
import './about.css';

class About extends Component {
    constructor() {
        super()
        this.state = {
            feet: [1, 2, 3, 4, 5, 6, 7, 8],
            inches: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            color: ['Brunette', 'Blonde', 'Red', 'Black', 'Other']
        }
    }

    female = () => {
        this.setState({
            selected: !this.state.femaleSelected
        })
    }

    male = () => {
        this.setState({
            selected: !this.state.maleSelected
        })
    }

    
    render() {
        let {feet, inches, color} = this.state
        return (
            <div>
                <h1 className='about_you_header'>About You</h1>
                <div className='form_container'>

                <label id='age' className='form_labels'>Age:<input className='form_input' placeholder='Enter age'/></label>

                <div className='height_container'>
                    <label id='height' className='form_labels'>Height: </label>
                    <select id='height'>
                        <option>Feet</option>
                        {feet.map(num => <option key={num}>{num}</option>)}
                    </select>

                    <select id='height'>
                        <option>Inches</option>
                        {inches.map(num => <option key={num}>{num}</option>)}
                    </select>
                </div>

                <div className='hair_color_container'>
                    <label id='hair_color' className='form_labels'>Hair Color:</label>
                    <select id='hair_color' >
                        <option>Color</option>
                        {color.map(value => <option key={value}>{value}</option>)}
                    </select>
                </div>

                <div className='gender_container'>
                    <label className='form_labels' id='gender'>Gender:</label>
                
                    <div className='radio-toolbar'>
                        <input type="radio" name='gender'id='male'/><label for='male' className='male_label'><i className="fas fa-male"></i> Male</label>
                        <input type='radio' name='gender' id='female'/><label for='female' className='female_label'><i type='radio' className="fas fa-female"></i> Female</label>
                    </div>
                </div>

                <div className='image_container'><label className='form_labels' id='profile_image'>Profile Image:</label><input  id='profile_image' className='form_input' placeholder='Enter URL'/></div>
            
                    <div className='form_one_button_container'>
                        <button className='skip-button'>Skip</button>
                        <button className='next-button'>Next</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default About;
