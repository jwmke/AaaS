'use client';

import { useState } from "react";
import PocketBase from 'pocketbase'

export default function Home() {
  const [acronym, setAcronym] = useState("");
  const [expanded, setExpanded] = useState("");
  const [info, setInfo] = useState("");
  const [message, setMessage] = useState({text: "", isError: false});
  const [addMode, setAddMode] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const clearFields = () => {
    if (!authenticated || (authenticated && addMode)) {
      setAcronym("");
      document.getElementById('acronym').value = "";
      setExpanded("");
      document.getElementById('expanded').value = "";
      if (addMode) {
        setInfo("");
        document.getElementById('info').value = "";
      }
    }
  }

  const logOut = () => {
    pb.authStore.clear();
    setAuthenticated(false);
  }

  const pb = new PocketBase('https://aaas.fly.dev');

  let auth = async (e) => {
    e.preventDefault();
    try {
      const authData = await pb.admins.authWithPassword(acronym, expanded);
      if (authData.token) {
        setMessage({text: "Successfully Logged In", isError: false});
        clearFields();
        setAuthenticated(true);
        setAddMode(true);
      } else {
        setMessage({text: "An Error Occured While Logging In", isError: true});
      }
      setTimeout(()=>{
        setMessage({text: "", isError: false});
      }, 2000);
    } catch (err) {
      setMessage({text: "An Error Occured While Logging In", isError: true});
      setTimeout(()=>{
        setMessage({text: "", isError: false});
      }, 2000);
    }
  }

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let finalAcronym = `${acronym}`; // deep copy through string interpolation
      finalAcronym = finalAcronym.replace(/['"\s\.]+/g, '').toUpperCase();
      if (finalAcronym.length > 15) {
        throw new Error('Acronym cannot be longer than 15 characters.');
      } else {
        finalAcronym = `${finalAcronym}${"0".repeat(15-finalAcronym.length)}`;
      }

      const data = {
        "id": finalAcronym,
        "expanded": expanded,
        "info": info,
      }

      const record = await pb.collection('acronyms').create(data);

      if (record.id) {
        clearFields();
        setMessage({text: "Acronym Successfully Added", isError: false});
      } else {
        setMessage({text: "An Error Occured", isError: true});
      }
      setTimeout(()=>{
        setMessage({text: "", isError: false});
      }, 2000);
    } catch (err) {
      setMessage({text: "An Error Occured", isError: true});
      setTimeout(()=>{
        setMessage({text: "", isError: false});
      }, 2000);
    }
  };

  return (
    <main className="bg-light w-screen h-screen font-lato select-none">
      <div className="w-100 h-24 pt-6">
        <div className={`${message.isError ? "bg-red" : "bg-cyan"} ${message.text ? "opacity-100" : "opacity-0"} rounded-3xl text-white text-center h-12 w-72 mx-auto py-3 font-bold shadow-inverted-light-field transition-opacity ease-in-out duration-200`}>
          {message.text}
        </div>
      </div>
      <div className="w-3/4 sm:w-96 bg-light mx-auto rounded-3xl shadow-light-card relative">
        <div className={`${addMode ? "shadow-inverted-lock-button" : "shadow-lock-button"} h-8 w-8 top-3 right-3 rounded-2xl flex items-center justify-center absolute fill-gray hover:fill-cyan hover:cursor-pointer transition-all ease-in-out duration-100`}
        onClick={() => {
            clearFields();
            setAddMode(!addMode);
          }}>
          {addMode ? <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 14C13 13.4477 12.5523 13 12 13C11.4477 13 11 13.4477 11 14V16C11 16.5523 11.4477 17 12 17C12.5523 17 13 16.5523 13 16V14Z"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M7 8.12037C5.3161 8.53217 4 9.95979 4 11.7692V17.3077C4 19.973 6.31545 22 9 22H15C17.6846 22 20 19.973 20 17.3077V11.7692C20 9.95979 18.6839 8.53217 17 8.12037V7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7V8.12037ZM15 7V8H9V7C9 6.64936 9.06015 6.31278 9.17071 6C9.58254 4.83481 10.6938 4 12 4C13.3062 4 14.4175 4.83481 14.8293 6C14.9398 6.31278 15 6.64936 15 7ZM6 11.7692C6 10.866 6.81856 10 8 10H16C17.1814 10 18 10.866 18 11.7692V17.3077C18 18.7208 16.7337 20 15 20H9C7.26627 20 6 18.7208 6 17.3077V11.7692Z"/>
          </svg> :
          <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7C13 6.44771 12.5523 6 12 6C11.4477 6 11 6.44771 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17Z"/>
          </svg>
          }
        </div>
        <div className="text-center">
          <p className={`text-2xl text-cyan ${authenticated && !addMode ? "" : "mb-6"} pt-3`}>
            Acronyms as a Service
          </p>
          {authenticated && !addMode ? null : <input className="!outline-none rounded-3xl w-3/4 h-12 px-4 text-gray-700 leading-tight mb-6 bg-light shadow-light-field focus:shadow-inverted-light-field focus:outline-none active:shadow-none transition-all ease-in-out duration-300" 
          id="acronym" type="text" placeholder={addMode ? "Acronym" : "Username"} onChange={(e) => setAcronym(e.target.value)} maxLength={addMode ? 15 : 999}/>}
          {authenticated && !addMode ? null : <input className="!outline-none rounded-3xl w-3/4 h-12 px-4 text-gray-700 leading-tight bg-light shadow-light-field focus:shadow-inverted-light-field focus:outline-none active:shadow-none transition-all ease-in-out duration-300"
          id="expanded" type={addMode ? "text" : "password"} placeholder={addMode ? "Expanded" : "Password"} onChange={(e) => setExpanded(e.target.value)}/>}
          {addMode ? <textarea className="!outline-none rounded-3xl py-3 w-3/4 h-44 px-4 mt-6 text-gray-700 leading-tight bg-light shadow-light-field focus:shadow-inverted-light-field focus:outline-none active:shadow-none transition-all ease-in-out duration-300" 
          id="info" type="text" placeholder="Link (optional)" onChange={(e) => setInfo(e.target.value)}/> : <div className="h-3"/>}
          <div className="w-100 relative h-16 mt-6">
            <button onClick={addMode ? handleSubmit : authenticated ? logOut : auth} className="!outline-none rounded-3xl w-1/2 bottom-6 absolute bg-cyan text-white text-center h-12 py-3 font-bold mx-auto left-0 right-0 shadow-inverted-light-field active:shadow-light-field hover:cursor-pointer transition-all ease-in-out duration-100">
              {addMode ? "Add Acronym" : authenticated ? "Log Out" : "Log In"}
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
