'use client';

import { useState, useEffect } from "react";

export default function Home() {
  return (
    <main className="bg-light w-screen h-screen font-lato pt-24">
      <div className="w-3/4 sm:w-96 bg-light mx-auto rounded-3xl shadow-light-card">
        <div className="text-center">
          <input className="rounded-3xl w-3/4 h-12 px-4 text-gray-700 leading-tight my-6 bg-light shadow-light-field focus:shadow-inverted-light-field focus:outline-none active:shadow-none transition-shadow ease-in-out duration-200" 
          id="acronym" type="text" placeholder="Acronym"/>
          <input className="rounded-3xl w-3/4 h-12 px-4 text-gray-700 leading-tight mb-6 bg-light shadow-light-field focus:shadow-inverted-light-field focus:outline-none active:shadow-none transition-shadow ease-in-out duration-200"
          id="expanded" type="text" placeholder="Expanded"/>
          <textarea className="rounded-3xl py-3 w-3/4 h-28 px-4 text-gray-700 leading-tight mb-6 bg-light shadow-light-field focus:shadow-inverted-light-field focus:outline-none active:shadow-none transition-shadow ease-in-out duration-200" 
          id="info" type="text" placeholder="Additional Info (optional)"/>
          <div className="w-100 relative h-16">
            <button onClick={() => console.log("")} className="rounded-3xl w-1/2 bottom-6 absolute bg-cyan text-white text-center h-12 py-3 font-bold mx-auto left-0 right-0 shadow-inverted-light-field active:shadow-light-field hover:cursor-pointer transition-shadow ease-in-out duration-100">
              Add Acronym
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
