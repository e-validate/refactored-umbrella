import React, { Component  } from 'react';
import './myendcard.css'
 
// Create custom end card
class MyEndCard extends Component {
    render() {
        return(
            <div className='end_card'><span>You have no more matches at this time. <p>Please try again later!</p></span></div>
        );
    }
}
 

export default MyEndCard;