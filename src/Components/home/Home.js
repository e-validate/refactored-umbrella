import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getPotentialMatches} from '../../ducks/reducers/userReducer'

class Home extends Component{
  constructor(){
    super()
    this.state = {
      potentialMatches: []
    }
  }

  componentDidMount(){
    console.log('CDM')
    console.log("this.props in home", this.props)
    let {getPotentialMatches} = this.props
    getPotentialMatches()
    // axios.get('/api/users/potential').then(res => console.log(res.data))
  }

  render(){
    return(
      <div>Hello World</div>
    )
  }
}

function mapStateToProps(state){
  return{
    ...state.user
  }
}

export default connect(mapStateToProps, {getPotentialMatches})(Home)