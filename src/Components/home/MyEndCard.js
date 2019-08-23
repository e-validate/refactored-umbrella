import React, { Component  } from 'react';
import './myendcard.css'
 
// Create custom end card
class MyEndCard extends Component {
    render() {
        return(
            <div className='end_card'>You have no more matches at this time. Please try again later!</div>
        );
    }
}
 

export default MyEndCard;