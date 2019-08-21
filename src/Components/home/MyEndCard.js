import React, { Component  } from 'react'
import { render  } from 'react-dom'
import { Card, CardWrapper } from 'react-swipeable-cards';
 
// Create custom end card
class MyEndCard extends Component {
    render() {
        return(
        <div>You have no more matches at this time. Please try again later!</div>
        );
    }
}
 

export default MyEndCard;