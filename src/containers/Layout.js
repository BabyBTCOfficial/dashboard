import React, { Suspense } from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from '../routes'
import Header from '../components/Header'
import Main from '../containers/Main'
import ThemedSuspense from '../components/ThemedSuspense'

function Layout(props) {

  const { tokenPrice, tokenVolume, setTokenVolume, wallet, getWallet, setWallet, bnbPrice, dividendPrice, bnbHoldings, totalPaid, holdings, paid, lastPaid, address, nextPayoutProgress, setNextPayoutProgress, nextPayoutValue, setNextPayoutValue, setHoldings, setPaid, setLastPaid, setAddress, fee, setFee, addToMetamask, tokenAddress } = props

  return (
    <div
      className={`flex h-screen bg-white`}
    >
      

      <div className="flex flex-col flex-1 w-full">
        <Header/>
        <Main>
          {((totalPaid !== 0 && address === '') || (address !== '' && nextPayoutProgress !== 0)) ? <Suspense fallback={<ThemedSuspense />}>
            <Switch>
              {routes.map((route, i) => {
                return route.component ? (
                  <Route
                    key={i}
                    exact={true}
                    path={`${route.path}`}
                    render={(props) => <route.component {...props} tokenVolume={tokenVolume} setTokenVolume={setTokenVolume} getWallet={getWallet} wallet={wallet} setWallet={setWallet} tokenPrice={tokenPrice} bnbHoldings={bnbHoldings} bnbPrice={bnbPrice} dividendPrice={dividendPrice} nextPayoutValue={nextPayoutValue} setNextPayoutValue={setNextPayoutValue} totalPaid={totalPaid} address={address} setAddress={setAddress} holdings={holdings} setHoldings={setHoldings} paid={paid} setPaid={setPaid} lastPaid={lastPaid} setLastPaid={setLastPaid} nextPayoutProgress={nextPayoutProgress} setNextPayoutProgress={setNextPayoutProgress} fee={fee} setFee={setFee} addToMetamask={addToMetamask} tokenAddress={tokenAddress} />}
                  />
                ) : null
              })}
            </Switch>
          </Suspense> : 
          <div className="w-full h-full flex justify-center">
            <img src={require('../assets/img/logo_200x200.png')} className="w-1/4 h-1/3 mt-48 inline-block align-middle" alt="Loading"/>
          </div>}
        </Main>
      </div>
    </div>
  )
}

export default Layout
