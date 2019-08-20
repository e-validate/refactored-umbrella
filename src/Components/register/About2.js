import React, { Component } from 'react';
import './about.css';

class About2 extends Component {
    constructor() {
        super()
        this.state = {
            religions: ['Agnostic', 'Atheist', 'Buddhism', 'Christians', 'Judaism', 'Islam', 'Spiritual', 'Taoism', 'Other'],
            ethnicity: ['African American', 'Asian', 'Hispanic', 'Native American', 'Pacific Islander', 'White', 'Other']
        }
    }


    render() {
        let {religions, ethnicity} = this.state
        return (
            <div>
                <h1 className='about_you'>More About You</h1>
                
                <div className='form_container'>
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