import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPotentialMatches} from '../../ducks/reducers/userReducer'
import {swipeLeft, swipeRight} from "../../ducks/reducers/swipeReducer"
import Swipe from 'react-easy-swipe'

class Home extends Component{
  constructor(){
    super()
    this.state = {
      matchesWithCompatability:[],
      counter: 0
    }
  }
  
  async componentDidMount(){
    let {getPotentialMatches} = this.props
    await getPotentialMatches()
    this.setCompatability(this.props.potentialMatches)    
  }


  setCompatability = (arr) => {
    console.log("user", this.props)
    for(let i = 0; i < arr.length; i++){
      let user1 = {
        user_id: 12,
          user_appearance_id: 12,
          name: "Kristina",
          email: 2,
          password: 2,
          user_details_id: 12,
          religion: "mormon",
          ethnicity: "white",
          description: "my name is kristina",
          gender: "female",
          intro_extro: 6,
          user_interests_id: 12,
          sports: true,
          arts: false,
          music: true,
          books: false,
          movies: true,
          outdoors: false,
          food: false,
          pets: true,
          netflix: true,
          traveling: true,
          tech: true,
          fashion: false,
          fitness: true,
          gaming: false,
          politics: true,
          hair_color: "brown",
          image1: "https://tse2.mm.bing.net/th?id=OIP.gkbT_J7jAwS-6zUxEdP7wAHaFY&pid=Api&P=0&w=224&h=163",
          image2: 1,
          image3: 1,
          age: 25,
          age_min: 18,
          age_max: 100,
          min_height: 55,
          max_height: 60,
          hair_color_pref: "brown",
          user_details_pref: 12,
          gender_pref: "male",
          religion_pref: "mormon",
          ethnicity_pref: "white",
          intro_extro_pref: 5
        }
        
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

   actionSwipeLeft = (id) => {
      let {swipeLeft} = this.props
      swipeLeft(id)
      this.setState({counter: this.state.counter +=1})
    }
      
    

    actionSwipeRight= (id) => {
       let {swipeRight} = this.props
         swipeRight(id)
         this.setState({counter: this.state.counter+= 1})
       }
    
    render(){
      const compatable = this.state.matchesWithCompatability.sort((a,b) => (a.compatability< b.compatability) ? 1 : -1)
      console.log('this', compatable)
    return(
      <div>
        {compatable.length ? (
          <div>
            {compatable.slice(0, 1).map(profile => 
              <Swipe key={`swipeId-${profile.user_id}`} onSwipeLeft={() =>{ this.actionSwipeLeft(profile.user_id)
            compatable.splice(0,1)}} onSwipeRight={() =>{ this.actionSwipeRight(profile.user_id)
              compatable.splice(0,1)}}>
                {profile.name}
                {profile.age}
                <img src={profile.image1}/>
              </Swipe>
              )}
          </div>
        ):(
          <div>Loading...</div>
        )}
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

export default connect(mapStateToProps, {getPotentialMatches, swipeLeft, swipeRight})(Home)