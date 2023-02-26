'use client';

import { useState } from "react";
import PocketBase from 'pocketbase'

export default function Home() {
  const [acronym, setAcronym] = useState("");
  const [expanded, setExpanded] = useState("");
  const [info, setInfo] = useState("");
  const [message, setMessage] = useState("");

  const pb = new PocketBase('http://127.0.0.1:8090');

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { // TODO add regex to remove . and convert to lowercase
        "id": acronym,
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
        setMessage("Acronym successfully added");
      } else {
        setMessage("An error occured");
      }
      setTimeout(()=>{
        setMessage("");
      }, 2000);
    } catch (err) {
      setMessage("An error occured");
      setTimeout(()=>{
        setMessage("");
      }, 2000);
    }
  };

  return (
    <main className="bg-light w-screen h-screen font-lato pt-24">
      <div className="w-3/4 sm:w-96 bg-light mx-auto rounded-3xl shadow-light-card">
        <div className="text-center">
          <input className="rounded-3xl w-3/4 h-12 px-4 text-gray-700 leading-tight my-6 bg-light shadow-light-field focus:shadow-inverted-light-field focus:outline-none active:shadow-none transition-shadow ease-in-out duration-200" 
          id="acronym" type="text" placeholder="Acronym" onChange={(e) => setAcronym(e.target.value)}/>
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
      <div className="">{message ? <p>{message}</p> : null}</div>
    </main>
  )
}
