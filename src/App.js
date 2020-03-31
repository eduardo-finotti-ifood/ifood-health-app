import React from 'react';
import logoios from './assets/ios.png';
import logoandroid from './assets/android.png';
import './App.css';
import axios from 'axios';

export default class PersonList extends React.Component {

  state = {
    android: {
      step: " ",
      fail: " ",
      cont: 0
    },
    ios: {
      step: "",
      fail: "",
      cont: 0
    },
  }

  componentDidMount(){
    axios.get(`http://localhost:8000/api/health`)
    .then(res => { // position 0: android - position 1: ios
      
      this.setState({ android: 
        {
          step: res.data.result[0].step_fail,
          fail: res.data.result[0].failure,
          cont: res.data.result[0].cont
        }
      })

      this.setState({ ios: 
        {
          step: res.data.result[1].step_fail,
          fail: res.data.result[1].failure,
          cont: res.data.result[1].cont
        }
      })

      console.log(this.state.android)
      console.log(this.state.ios)
    })
  }
  
  render() {
    return (
      <div className="App">
        
        <header className="App-header" style={{backgroundColor: this.state.ios.cont>2?'red':'green', width: '50%'}}>
          <img src={logoios} className="App-logo" alt="logo" />
          
          {this.state.ios.cont > 2 && 
            <div style={{width: '70%'}}>
              <p>Error count: </p> <a>{this.state.ios.cont}</a>
              <p>Failure: {this.state.ios.fail}</p>          
              <p>Step: {this.state.ios.step}</p>
            </div>
          }
          {this.state.ios.cont < 2 && 
            <div style={{width: '70%'}}>
              <p style={{fontSize: 90}}>Your app iOS is ok!
              </p>          
            </div>
          }
        </header>


        <header className="App-header" style={{backgroundColor: this.state.android.cont>2?'red':'green', width: '50%'}}>
          <img src={logoandroid} className="App-logo" alt="logo" />
          
          {this.state.android.cont > 2 && 
            <div style={{width: '70%', alignContent: 'center', alignItems: 'center', justifyContent: 'center'}}>
              <p>Error count: </p> <a>{this.state.android.cont}</a>
              <p>Failure: {this.state.android.fail}</p>          
              <p>Step: {this.state.android.step}</p>
            </div>
          }
           {this.state.android.cont < 2 && 
            <div style={{width: '70%'}}>
              <p style={{fontSize: 90}}>Your app android is ok!</p>          
            </div>
          }
        </header>
        
      </div>
    );
  }
}