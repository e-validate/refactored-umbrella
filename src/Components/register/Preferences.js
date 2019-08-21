import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {addUserPref} from './../../ducks/reducers/formReducer';

class Preferences extends Component {
    constructor() {
        super()
        this.state = {
            age_min: 0,
            age_max: 0,
            colors: ['Brunette', 'Blonde', 'Black', 'Red', 'White', 'None'],
            hair_color_pref: '',
            gender_pref: '',
            religions: ['Agnostic', 'Atheist', 'Buddhism', 'Christians', 'Judaism', 'Islam', 'Spiritual', 'Taoism', 'Other'],
            religion_pref: '',
            ethnicity: ['African American', 'Asian', 'Hispanic', 'Native American', 'Pacific Islander', 'White', 'Other'],
            ethnicity_pref: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = () => {
        let {age_min, age_max, hair_color_pref, gender_pref, religion_pref, ethnicity_pref} = this.state
        this.props.addUserPref(age_min, age_max, hair_color_pref, gender_pref, religion_pref, ethnicity_pref)
    }
    
    render() {
        let {ethnicity, religions, colors, age_min, age_max} = this.state
        return (
            <div>
                <h1 className='about_you_header'>Preferences</h1>
                    <div className='preferences_div'>What type of person would <br /> you share an umbrella with?</div>
                    
                    <div>
                        <label id='age' className='form_labels'>Age:<input className='form_input' name='age_min' value={age_min} placeholder='Min' onChange={this.handleChange}/></label>
                        <input className='form_input' id='max_age' name='age_max' value={age_max} placeholder='Max' onChange={this.handleChange}/>
                        
                        <div className='hair_color_container'>
                            <label id='hair_color' className='form_labels'>Hair Color:</label>
                            <select id='hair_color' name='hair_color_pref' onChange={this.handleChange}>
                                <option></option>
                                {colors.map(value => <option value={value} key={value}>{value}</option>)}
                            </select>
                        </div>

                        <div className='gender_container'>
                            <label className='form_labels' id='gender'>Gender:</label>
                        
                            <div className='radio-toolbar'>
                                <input type="radio" name='gender_pref' value='male' id='male' onChange={this.handleChange}/><label for='male' className='male_label'><i className="fas fa-male"></i> Male</label>
                                <input type='radio' name='gender_pref' value='female' id='female' onChange={this.handleChange}/><label for='female' className='female_label'><i type='radio' className="fas fa-female"></i> Female</label>
                            </div>
                        </div>

                        <div>
                            <label className='form_labels' id='religion'>Religion: </label>
                            <select id='religion' name='religion_pref' onChange={this.handleChange}>
                                <option></option>
                                {
                                    religions.map(type => <option value={type} key={type}>{type}</option>)
                                }
                            </select>
                        </div>

                        <div>
                            <label className='form_labels' id='ethnicity'>Ethnicity: </label>
                            <select id='ethnicity' name='ethnicity_pref' onChange={this.handleChange}>
                                <option></option>
                                {
                                    ethnicity.map(type => <option value={type} key={type}>{type}</option>)
                                }
                            </select>
                        </div>

                    </div>

                    <div className='form_one_button_container'>
                        <Link to='/'>
                        <button className='skip-button'>Skip</button>
                        <button className='next-button' onClick={this.handleSubmit}>Next</button>
                        </Link>
                    </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.form
}

export default connect(mapStateToProps, {addUserPref})(Preferences);