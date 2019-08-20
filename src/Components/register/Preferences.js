import React, { Component } from 'react';

class Preferences extends Component {
    constructor() {
        super()
        this.state = {
            color: ['Brunette', 'Blonde', 'Red', 'Black', 'Other'],
            religions: ['Agnostic', 'Atheist', 'Buddhism', 'Christians', 'Judaism', 'Islam', 'Spiritual', 'Taoism', 'Other'],
            ethnicity: ['African American', 'Asian', 'Hispanic', 'Native American', 'Pacific Islander', 'White', 'Other']
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
        let {ethnicity, religions, color} = this.state
        return (
            <div>
                <h1 className='about_you_header'>Preferences</h1>
                    <div className='preferences_div'>What type of person would <br /> you share an umbrella with?</div>
                    
                    <div>
                        <label id='age' className='form_labels'>Age: <input className='form_input' placeholder='Enter age'/></label>

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

                        <div>
                            <label className='form_labels' id='religion'>Religion: </label>
                            <select id='religion'>
                                {
                                    religions.map(type => <option key={type}>{type}</option>)
                                }
                            </select>
                        </div>

                        <div>
                            <label className='form_labels' id='ethnicity'>Ethnicity: </label>
                            <select id='ethnicity'>
                                {
                                    ethnicity.map(type => <option key={type}>{type}</option>)
                                }
                            </select>
                        </div>

                    </div>

                    <div className='form_one_button_container'>
                        <button className='skip-button'>Skip</button>
                        <button className='next-button'>Next</button>
                    </div>

            </div>
        )
    }
}


export default Preferences;