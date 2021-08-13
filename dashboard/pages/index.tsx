import React from 'react';
import type { NextPage } from 'next'
import Router from 'next/router'
import { BounceLoader } from 'react-spinners';
import AppHead from '../components/head';

const Home: NextPage = () => {
  const [step, changeStep] = React.useState(0);
  const [first_name, change_first_name] = React.useState("");
  const [last_name, change_last_name] = React.useState("");
  const [email, change_email] = React.useState("");
  const [mobile_phone, change_phone_number] = React.useState("");
  const [code, change_code] = React.useState("");
  const [error, changeError] = React.useState("");
  const [country_code, change_country_code] = React.useState("");
  const [loading, change_loading] = React.useState(false);

  const sendVertification = () => {
    if(!mobile_phone || !country_code) return;
    console.log('resend vertification ', country_code + mobile_phone)
    change_loading(true);
    fetch('http://localhost:3290/api/sms-vertification/', {
        method: 'POST', 
        headers: {
          "Access-Control-Allow-Origin": "*", 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({phone_number: country_code + mobile_phone})
      }).then(response => response.json())
        .then(json => {
          change_loading(false);
          if(!json.data) {
            return
          }
          console.log(json);
          changeStep(1);
        }).catch(error => {
          change_loading(false);
          console.log(error);
        })
    return; 
  }

  const submit = () => {
    if(!code || !first_name || !last_name || !email || !mobile_phone) {
      return; 
    }
    change_loading(true);
    fetch('http://localhost:3290/api/', {
      method: 'POST', 
      headers: { "Access-Control-Allow-Origin": "*",  'Content-Type': 'application/json' },
      body: JSON.stringify({data: {
        code: code, 
        info: {first_name, email, last_name, mobile_phone: country_code + mobile_phone}
      }})
    }).then(response => response.json()).then(json => {
      console.log(`result ${json}`);
      change_loading(false);
      if(!json.data) {
        changeError('Not verified')
        return console.log('null');
      }
      Router.push('/dashboard')
    }).catch(error => {
      console.log('error', error);
      change_loading(false);
      changeError(error)
    })
    return; 
  }

  const resendClick = () => {
    sendVertification()
    change_code("");
  }
  
  const onClick = () => {
    if(!step) {
      sendVertification() 
    }else{
      submit(); 
    }
  }

  return (
    <>
      <AppHead />
      <button style={{marginLeft: 20}} onClick={() => Router.push('/dashboard')}>
        <i style={{fontSize: 25}} className="bx bxs-dashboard"></i>
      </button>
      <hgroup>
        <h1>Wimo Form</h1>
      </hgroup>
      <form>
        <div className="group">
          <input 
            placeholder="fist name"
            onChange={e => change_first_name(e.target.value)}
            type="text" />
            <span className="highlight"></span>
            <span className="bar"></span>
        </div>
        <div className="group">
          <input 
            placeholder="last name"
            onChange={e => change_last_name(e.target.value)}
            type="lastname" />
            <span className="highlight"></span
            ><span className="bar"></span>
        </div>
        <div className="group">
          <input 
            placeholder="email"
            onChange={e => change_email(e.target.value)}
            type="email" /><span className="highlight"></span>
            <span className="bar"></span>
        </div>
        <div className="phoneGroup">
          <span>+</span>
          <input 
            placeholder="code"
            onChange={e => change_country_code(e.target.value)}
            type="code" />
          <input 
            placeholder="phone number"
            onChange={e => change_phone_number(e.target.value)}
            type="phone" />
        </div>
        {step > 0 ? (
          <>
            <div className="group">
              <input 
                placeholder="code"
                value={code}
                onChange={e => change_code(e.target.value)}
                type="code" /><span className="highlight"></span>
                <span className="bar"></span>
                <button 
                  style={{marginTop: 10, padding: 2}}
                  type="button"
                  onClick={resendClick}>
                    Resend code ? 
                </button>
            </div>
          </>
        ) : null}
        
        {loading && (
          <div style={{
            paddingTop: 20, 
            paddingBottom: 100
          }}>
            <BounceLoader
                color={'#123abc'} 
                loading={loading} 
              />
          </div>
        )}
        <button 
          onClick={onClick} 
          type="button" 
          className="button buttonBlue">
            Subscribe
            <div className="ripples buttonRipples">
              <span className="ripplesCircle"></span
            ></div>
        </button>
        {error ? <div>
          <span style={{color: 'red'}}> Code is not verify </span>
        </div>: null}
      </form>
      <footer><a href="https://wimoapp.com" target="_blank"><img src="https://wimoapp.com/wp-content/uploads/2020/04/cropped-Group-48.png" /></a>
            <p>You Gotta Love <a href="https://wimoapp.com" target="_blank">Wimo</a></p>
        </footer>
    </>
  );
}

export default Home
