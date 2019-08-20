import React, { Component } from 'react';
import './about.css';

class About2 extends Component {
    constructor() {
        super()
        this.state = {
            religions: ['Agnostic', 'Atheist', 'Buddhism', 'Christians', 'Judaism', 'Islam', 'Spiritual', 'Taoism', 'Other'],
            ethnicity: ['African American', 'Asian', 'Hispanic', 'Native American', 'Pacific Islander', 'White', 'Other'],
            interest : ['Arts', 'Books', 'Outdoors', 'Fitness', 'Music', 'Movies', 'Food', 'Pets', 'Netflix', 'Traveling', 'Politics', 'Tech', 'Fashion', 'Gaming'],
            display: false
        }
    }

    flipInterestDisplay = () => {
        this.setState({
            display: !this.state.display
        })
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
        let {religions, ethnicity, display, interest} = this.state
        return (
            <div>
                <h1 className='about_you_header'>More About You</h1>
                
                <div className='form_container'>

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

                <div className='intro_extro'>Introvert<input className='slider'type="range" min="1" max="10"/>Extrovert</div>

                <button onClick={this.flipInterestDisplay} className='interests_button' >What are your interests?</button>
                {
                    display ? 
                    interest.map(interest => {
                        return (
                            <div>
                                <label>{interest}</label>
                                <input type="checkbox"/>     
                            </div>
                        )
                    }) : 
                  <div>{null}</div>
                }

                <label id='description' className='form_labels'>Description:</label>
                <textarea className='description' cols='30' rows='10' placeholder='Tell us about yourself'/>

                    <div className='form_one_button_container'>
                            <button className='skip-button'>Skip</button>
                            <button className='next-button'>Next</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default About2;