import React from 'react'

function Header() {
  return (
    <header className="z-40 py-4 bg-bb-primary shadow-bottom text-bb-black font-bold">
      <div className="container px-6 mx-auto h-12 text-4xl text-center items-center justify-center flex">
          <a className="inline-block flex" href="/">
            <img className="mr-2 h-12" src={require('../assets/img/logo_head.png')} alt="BabyBTC"/>
            <h1>BabyBTC</h1>
          </a>
      </div>
    </header>
  )
}

export default Header
