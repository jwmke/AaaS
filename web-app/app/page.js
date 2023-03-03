'use client';

import { useState } from "react";
import PocketBase from 'pocketbase'

export default function Home() {
  const [acronym, setAcronym] = useState("");
  const [expanded, setExpanded] = useState("");
  const [info, setInfo] = useState("");
  const [message, setMessage] = useState({text: "", isError: false});

  const pb = new PocketBase('https://aaas.fly.dev');

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
        setAcronym("");
        document.getElementById('acronym').value = "";
        setExpanded("");
        document.getElementById('expanded').value = "";
        setInfo("");
        document.getElementById('info').value = "";
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
    <main className="bg-light w-screen h-screen font-lato">
      <div className="w-100 h-24 pt-6">
        {message.text ? 
          <div className={`${message.isError ? "bg-red" : "bg-cyan"} rounded-3xl text-white text-center h-12 w-72 mx-auto py-3 font-bold shadow-inverted-light-field transition-all ease-in-out duration-300`}>
            {message.text}
          </div> : null
        }
      </div>
      <div className="w-3/4 sm:w-96 bg-light mx-auto rounded-3xl shadow-light-card">
        <div className="text-center">
          <input className="rounded-3xl w-3/4 h-12 px-4 text-gray-700 leading-tight my-6 bg-light shadow-light-field focus:shadow-inverted-light-field focus:outline-none active:shadow-none transition-shadow ease-in-out duration-200" 
          id="acronym" type="text" placeholder="Acronym" onChange={(e) => setAcronym(e.target.value)} maxLength={15}/>
          <input className="rounded-3xl w-3/4 h-12 px-4 text-gray-700 leading-tight mb-6 bg-light shadow-light-field focus:shadow-inverted-light-field focus:outline-none active:shadow-none transition-shadow ease-in-out duration-200"
          id="expanded" type="text" placeholder="Expanded" onChange={(e) => setExpanded(e.target.value)}/>
          <textarea className="rounded-3xl py-3 w-3/4 h-44 px-4 text-gray-700 leading-tight mb-6 bg-light shadow-light-field focus:shadow-inverted-light-field focus:outline-none active:shadow-none transition-shadow ease-in-out duration-200" 
          id="info" type="text" placeholder="Link (optional)" onChange={(e) => setInfo(e.target.value)}/>
          <div className="w-100 relative h-16">
            <button onClick={handleSubmit} className="rounded-3xl w-1/2 bottom-6 absolute bg-cyan text-white text-center h-12 py-3 font-bold mx-auto left-0 right-0 shadow-inverted-light-field active:shadow-light-field hover:cursor-pointer transition-shadow ease-in-out duration-100">
              Add Acronym
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
