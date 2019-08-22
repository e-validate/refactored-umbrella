import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPotentialMatches} from '../../ducks/reducers/userReducer'
import {swipeLeft, swipeRight} from "../../ducks/reducers/swipeReducer"
import {getDetails} from '../../ducks/reducers/sessionReducer'

import { Card, CardWrapper } from 'react-swipeable-cards';
import MyEndCard from './MyEndCard';
import './home.css'


class Home extends Component{
  constructor(){
    super()
    this.state = {
      matchesWithCompatability:[],
      defaultImage: 'https://az-pe.com/wp-content/uploads/2018/05/kemptons-blank-profile-picture.jpg'
    }
  }
  
  async componentDidMount(){
    let {getPotentialMatches, getDetails} = this.props
    console.log("CDM", this.props.user)
    await getPotentialMatches()
    await getDetails(this.props.user.id)  
    this.setCompatability(this.props.potentialMatches) 
  }


  setCompatability = (arr) => {
    console.log("user", this.props)
    for(let i = 0; i < arr.length; i++){
      let user1 = this.props.details        
        let user2 = arr[i]
        let compatabilityCounter = 0
        if(user1.ethnicity_pref === user2.ethnicity){
          compatabilityCounter +=1
        }
        if(user1.hair_color_pref === user2.ethnicity){
          compatabilityCounter +=1
        }
        if(user1.religion_pref === user2.religion){
          compatabilityCounter +=1
        }
        if(user1.arts === user2.arts){
          compatabilityCounter +=1
        }
        if(user1.books === user2.books){
          compatabilityCounter +=1
        }
        if(user1.fashion === user2.fashion){
          compatabilityCounter +=1
        }
        if(user1.fitness === user2.fitness){
          compatabilityCounter +=1
        }
        if(user1.food === user2.food){
          compatabilityCounter +=1
        }
        if(user1.gaming === user2.gaming){
          compatabilityCounter +=1
        }
        if(user1.movies === user2.movies){
          compatabilityCounter +=1
        }
        if(user1.music === user2.music){
          compatabilityCounter +=1
        }
        if(user1.netflix === user2.netflix){
          compatabilityCounter +=1
        }
        if(user1.outdoors === user2.outdoors){
          compatabilityCounter +=1
        }
        if(user1.pets === user2.pets){
          compatabilityCounter +=1
        }
        if(user1.politics === user2.politics){
          compatabilityCounter +=1
        }
        let currentUser = {...arr[i], compatability: compatabilityCounter}
        this.setState({matchesWithCompatability: [...this.state.matchesWithCompatability, currentUser]})
    }
  }

  
  getEndCard() {
    return (
        <MyEndCard />
    )
  }

  onSwipeLeft = (id) => {
    let {swipeLeft} = this.props
    swipeLeft(id)
  }

  onSwipeRight = (id) => {
    let {swipeRight} = this.props
    swipeRight(id)
  }
    
    render(){
      const compatable = this.state.matchesWithCompatability.sort((a,b) => (a.compatability< b.compatability) ? 1 : -1)

      const cardStyle = {
        backgroundColor: "white"
      }
      return(
      <div className='home_background_color'>
        <div className="block"></div>
        <CardWrapper addEndCard={this.getEndCard.bind(this)} >
            {compatable.map(profile => 
              <Card style={cardStyle} key={`swipeId-${profile.user_id}`} onSwipeLeft={() => this.onSwipeLeft(profile.user_id)} onSwipeRight={() => this.onSwipeRight(profile.user_id)}>
                  <img className='home_profile_image' src={profile.image1 || this.state.defaultImage}/>
                  <span className='home_profile_name'>{profile.name}, </span>
                  <span className='home_profile_age'>{profile.age} </span>     
                  </Card>
              )}
        </CardWrapper>
      </div>
      )
    }
  }
    
    function mapStateToProps(state){
  return{
    ...state.user,
    ...state.session
  }
}

export default connect(mapStateToProps, {getDetails,getPotentialMatches, swipeLeft, swipeRight})(Home)
