import React, { Component } from 'react';
import './about.css';
import {connect} from 'react-redux';
import {addUserDetailsAndInterests} from './../../ducks/reducers/formReducer';
import {Link} from 'react-router-dom';
class About2 extends Component {
    constructor() {
        super()
        this.state = {
            religions: ['Agnostic', 'Atheist', 'Buddhism', 'Christians', 'Judaism', 'Islam', 'Spiritual', 'Taoism', 'Other'],
            races: ['African American', 'Asian', 'Hispanic', 'Native American', 'Pacific Islander', 'White', 'Other'],
            interest: ['Arts', 'Books', 'Outdoors', 'Fitness', 'Music', 'Movies', 'Food', 'Pets', 'Netflix', 'Traveling', 'Politics', 'Tech', 'Fashion', 'Gaming'],
            display: false,
            gender: '',
            religion: '',
            ethnicity: '',
            intro_extro: 0,
            sports: false,
            arts: false,
            music: false,
            books: false,
            movies: false,
            outdoors: false,
            food: false,
            pets: false,
            netflix: false,
            traveling: false,
            tech: false,
            fashion: false,
            fitness: false,
            gaming: false,
            politics: false, 
            description: '',
            selected: false,
        }
    }
    flipInterestDisplay = () => {
        this.setState({
            display: !this.state.display
        })
    }
    
    female = () => {
        this.setState({
            gender: 'female'
        })
    }
    male = () => {
        this.setState({
            gender: 'male'
        })
    }
    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCheck = e => {
        this.setState({
            [e.target.name]: true
        })
    }

    checked = () => {
    }
    handleSubmit = () => {
        let {gender, religion, ethnicity, intro_extro, description, sports, arts, music, books, movies, outdoors, food, pets, netflix, traveling, tech, fashion, fitness, gaming, politics} = this.state
        this.props.addUserDetailsAndInterests(gender, religion, ethnicity, intro_extro, description, sports, arts, music,books, movies, outdoors, food, pets, netflix, traveling, tech, fashion, fitness, gaming, politics)
    }
    render() {
        let {religions, races, display, interest, gender, description, intro_extro} = this.state
        return (
            <div>
                <h1 className='about_you_header'>More About You</h1>
                
                <div className='form_container'>
                    <div className='gender_container'>
                        <label className='form_labels' id='gender'>Gender:</label>
                    
                        <div className='radio-toolbar'>
                            <input type="radio" name='gender' value='male' onChange={this.handleChange}/><label for='male' className='male_label'><i className="fas fa-male"></i> Male</label>
                            <input type='radio' name='gender' value='female' onChange={this.handleChange}/><label for='female' className='female_label'><i type='radio' className="fas fa-female"></i> Female</label>
                        </div>
                    </div>
                    <div>
                        <label className='form_labels' id='religion'>Religion: </label>
                        <select id='religion' name='religion' onChange={this.handleChange}>
                            {
                                religions.map(type => <option value={type} key={type}>{type}</option>)
                            }
                        </select>
                    </div>
                    <div>
                        <label className='form_labels' id='ethnicity'>Ethnicity: </label>
                        <select id='ethnicity' name='ethnicity' onChange={this.handleChange}>
                            {
                                races.map(type => <option value={type} key={type}>{type}</option>)
                            }
                        </select>
                    </div>
                <div className='intro_extro'>Introvert<input className='slider'type="range" min="1" max="10" name='intro_extro' value={intro_extro} onChange={this.handleChange}/>Extrovert</div>
                <button onClick={this.flipInterestDisplay} className='interests_button' >What are your interests?</button>
                {
                    display ? 
                    interest.map(interest => {
                        return (
                            <div>
                                <label>{interest}</label>
                                <input type="checkbox" onClick={this.handleCheck} name={interest} value="unchecked" />     
                            </div>
                        )
                    }) : 
                  <div>{null}</div>
                }
                <label id='description' className='form_labels'>Description:</label>
                <textarea className='description' cols='30' rows='10' placeholder='Tell us about yourself' name='description' value={description}/>
                
                    <div className='form_one_button_container'>
                        <Link to='/preferences'>
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
export default connect(mapStateToProps, {addUserDetailsAndInterests})(About2);