/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'

import { ethers } from 'ethers'

import CTA from '../components/CTA'
import { TwitterIcon, CartIcon } from '../icons'
import { Card, CardBody, Button } from '@windmill/react-ui'

import numberWithCommas from '../utils/numberWithCommas'

function Dashboard(props) {

  const { tokenPrice, tokenVolume, setTokenVolume, wallet, setWallet, getWallet, bnbPrice, dividendPrice, bnbHoldings, totalPaid, holdings, paid, address, nextPayoutValue, setHoldings, setPaid, setLastPaid, setAddress, setNextPayoutProgress, setNextPayoutValue, fee, setFee, addToMetamask, tokenAddress } = props

  const [dividendContract, setDividendContract] = useState(null)
  const [tokenContract, setTokenContract] = useState(null)

  const [claimed, setClaimed] = useState(false)

  var [pooCoin, setPooCoin] = useState(false);
  var [bogged, setBogged] = useState(false);

  const payoutText = <><span className="text-bb-dark">{nextPayoutValue != 0 ? nextPayoutValue : '0'}</span></>

  const earningsInDollars = tokenVolume == 0 ? 0 : (holdings / 500000000000) * (tokenVolume * 0.10)
  const earningsInDividend = earningsInDollars / dividendPrice

  function twitterMessage(amount) {
    return 'https://twitter.com/compose/tweet?text=' + encodeURIComponent("Check out ") + amount + encodeURIComponent(" @Bitcoin I earned buying & hold @BabyBTCOfficial ₿🪙🤑💰＄x🚀\nSurely a 100x coin to retire. 🏦🏖\n@ElonMusk check out the BabyBTC dashboard https://dashboard.babybtc.cash\n#bitcoin #babybtc");
  }

  function showBuyBox(website) {
    if (website === "poocoin") {
      setBogged(false);
      setPooCoin(true);
    } else {
      setPooCoin(false);
      setBogged(true);
    }
  }

  function hideBuyBox(website) {
    if (website === "poocoin") {
      setPooCoin(false);
    } else {
      setBogged(false);
    }
  }

  function handleChange(e) {
    console.log(e.target.value);
    if (isNaN(Number(parseFloat(e.target.value.replace(/,/g, '')))) || e.target.value === '') {
      setTokenVolume(0);
    } else {
      setTokenVolume(Number(parseFloat(e.target.value.replace(/,/g, ''))));
    }

    // /isNaN(Number(parseFloat(e.target.value.replace(/,/g, '')))) ? tokenVolume : setTokenVolume(Number(parseFloat(e.target.value.replace(/,/g, ''))))
  }

  return (
    <div className="pb-10">

      <CTA address={address} setAddress={setAddress} holdings={holdings} text={(address !== "" && ethers.utils.isAddress(address)) ? `Wallet Balance: ${bnbHoldings} BNB ($${numberWithCommas((bnbHoldings * bnbPrice).toFixed(2))})` : address} tokenAddress={tokenAddress} />
      <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-3">
        <Card colored className="bg-bb-primary">
          <CardBody className="flex-2 items-center">
            <div className="mx-auto justify-middle text-center h-20 cursor-pointer">
              <img className='h-16 inline' src={require('../assets/img/logo_200x200.png')} title="Add BabyBTC to Metamask" onClick={() => { addToMetamask("Token") }} alt="BabyBTC" />
            </div>
            <div className="items-center justify-middle text-center">
              <p className="text-3xl font-semibold">
                <span className="text-bb-dark">{numberWithCommas(holdings)}</span>
              </p>
              <p className="text-base font-semibold text-bb-black">Your Total BabyBTC Holdings</p>
              <p className="mt-2">
                <Button 
                  tag="a" className="w-full bg-bb-dark hover:bg-bb-hover active:bg-bb-hover" 
                  href={`https://exchange.pancakeswap.finance/#/swap?outputCurrency=${tokenAddress}`} 
                  target="_blank" 
                  iconLeft={CartIcon}>
                  <span className="text-lg text-black font-semibold">Buy BabyBTC</span>
                </Button>
              </p>
            </div>
          </CardBody>
        </Card>

        <Card colored className="bg-bb-primary">
          <CardBody className="flex-2 items-center">
            <div className="mx-auto justify-middle text-center h-20 cursor-pointer">
              <img className='h-16 inline' src={require('../assets/img/dividend.png')} title="Add BTC to Metamask" onClick={() => { addToMetamask("Dividend") }} alt="BTC" />
            </div>
            <div className="items-center justify-middle text-center">   
              <p className="text-3xl font-semibold">
                <span className="text-bb-dark">{`${paid ? (paid / 1e18).toFixed(6) : 0}`}</span>
                {paid > 0 && <span className="italic font-semibold text-2xl text-bb-black"> ~${numberWithCommas(((paid / 1e18) * dividendPrice).toFixed(2))}</span>}
              </p>
              <p className="text-base font-semibold text-bb-black">Total BTC Reward Paid</p>
              <p className="mt-2">
                <Button disabled={paid > 0 ? "": "disabled"} tag="a" className="w-full bg-bb-dark hover:bg-bb-hover active:bg-bb-hover" href={`${twitterMessage((paid / 1e18).toFixed(6))}`} target="_blank" iconLeft={TwitterIcon}><span className="text-lg text-black font-semibold">Tweet</span></Button>
              </p>
            </div>
          </CardBody>
        </Card>

        <Card colored className="bg-bb-primary">
          <CardBody className="flex-2 items-center">
            <div className="mx-auto justify-middle text-center h-20">
              <img className='h-16 inline' src={require('../assets/img/pending.png')} title="Pending for Claims" alt="Pending"/>
            </div>
            <div className="items-center justify-middle text-center">   
              <p className="text-3xl font-semibold">
                {payoutText}
                {nextPayoutValue > 0 && <span className="italic font-light text-2xl text-bb-black"> ~${(nextPayoutValue * dividendPrice).toFixed(2)}</span>}
              </p>
              <p className="text-base font-semibold text-bb-black">Your BTC Payout Pending</p>
              <p className="mt-2">
              <Button disabled={nextPayoutValue == 0 ? true : false} className={`w-full h-full text-lg font-semibold bg-bb-dark hover:bg-bb-hover active:bg-bb-hover`}
              onClick={() => {
                if (wallet !== null && dividendContract !== null) {
                  const encodedABI = tokenContract.interface.encodeFunctionData('eatPoo', [])
                  wallet.getTransactionCount().then(nonce => {
                    const tx = {
                      chainId: 56,
                      nonce: ethers.utils.hexlify(nonce),
                      gasPrice: ethers.utils.hexlify(7 * 1000000000),
                      gasLimit: ethers.utils.hexlify(250000),
                      to: tokenContract.address,
                      value: ethers.utils.parseEther('0'),
                      data: encodedABI
                    }
  
                    wallet.sendTransaction(tx).then(confirmation => {
                      setClaimed(true)
                    })
                  })
                } else {
                  getWallet().then(wallet => {
                    setWallet(wallet[0])
                    setAddress(wallet[1])
                    setDividendContract(wallet[2])
                    setTokenContract(wallet[3])
                  })
                }
              }}><span className="text-lg text-black font-semibold">{nextPayoutValue == 0 ? 'No Pending Payment!' : wallet !== null ? claimed ? 'Payout Claimed!' : 'Claim Payout' : <>Connect Metamask and Claim BTC Manually NOW</>}</span></Button>
              </p>
            </div>
          </CardBody>
        </Card>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2 mt-4">
        <Card colored className="bg-white">
          <CardBody className="flex items-center">
            <Button className={`w-full h-full text-lg font-semibold bg-bb-dark hover:bg-bb-hover active:bg-bb-hover text-bb-black`}
              onClick={() => {
                showBuyBox("bogged");
              }}>{
                <><span>Buy on</span><img className='ml-2 mr-2 h-6 w-6' src={require("../assets/img/bogged.png")} title="Bogged" />Bogged</>
              }
            </Button>
          </CardBody>
        </Card>

        <Card colored className="bg-white">
          <CardBody className="flex items-center">
            <Button className={`w-full h-full text-lg font-semibold bg-bb-dark hover:bg-bb-hover active:bg-bb-hover text-bb-black`}
              onClick={() => {
                showBuyBox("poocoin");
              }}>{
                <><span>Buy on</span><img className='ml-2 mr-2 h-6 w-6' src="https://poocoin.app/images/logo/poocoin512.png" title="PooCoin" />PooCoin</>
              }
            </Button>
          </CardBody>
        </Card>

      </div>

      {pooCoin && <Card colored className="bg-bb-primary mt-4" id="buyPoocoin">
        <CardBody className="flex items-center content-center self-center relative">
          <div className="absolute top-0 right-0 mt-6 mr-4"><a href="#" onClick={(e) => { e.preventDefault(true); hideBuyBox("poocoin"); }}><span className="text-black p-4">X</span></a></div>
          <iframe src={`https://poocoin.app/embed-swap?outputCurrency=${tokenAddress}`} width="300" height="630" className="mx-auto my-0"></iframe>
        </CardBody>
      </Card>
      }

      {bogged && <Card colored className="bg-bb-primary mt-4" id="buyBogged">
        <CardBody className="flex items-center relative">
          <div className="absolute top-0 right-0 mt-6 mr-4"><a href="#" onClick={(e) => { e.preventDefault(true); hideBuyBox("bogged"); }}><span className="text-black p-4">X</span></a></div>
          <iframe src={`https://app.bogged.finance/swap?tokenIn=BNB&tokenOut=${tokenAddress}&slippage=18&embed=1`} height="920px" width="100%" className="mx-auto my-0" ></iframe>
        </CardBody>
      </Card>
      }

      <div className="grid mt-4">

        <Card colored className="bg-white">
          <CardBody className="flex text-center items-center">
            <img className="w-12 h-12 mr-2" src={require('../assets/img/dividend.png')} />
            <p className="font-semibold text-bb-black text-xl text-center"><span className="text-xl font-bold text-bb-dark align-top">{(totalPaid > 0 ? totalPaid : 0)}</span><span className="ml-1 text-semibold align-middle">Bitcoin Paid To BabyBTC Holders which are worth</span><span className="text-bb-dark text-bold text-xl align-middle ml-1">${numberWithCommas((dividendPrice * totalPaid).toFixed(0))}</span></p>
          </CardBody>
        </Card>

        <Card colored className="bg-bb-primary mt-4">
          <CardBody>
            <div className="text-center items-center mx-auto grid grid-cols-1 gap-4 sm:gap-0 sm:flex">
              <div className="flex items-center">
                <img className="w-12 h-12 mr-2 inline-block" src={require('../assets/img/money.png')} />
                <p className="text-bb-black text-xl text-center">For a Trading Volume of <span className="inline-block text-2xl">$<input className="text-bb-black bg-bb-dark bg-opacity-25 focus:bg-white focus:border-0 pl-1 w-32 ml-1" value={numberWithCommas(tokenVolume.toFixed(0))} onChange={handleChange} />,</span></p>
              </div>
              <div className="flex mx-auto md:ml-0 items-center">
                <span className="text-bb-black text-xl text-center ml-2">Your <span className="text-bb-dark">{numberWithCommas(holdings)}</span> BabyBTC Earns:</span>
              </div>
            </div>
            <div className="flex-1 mt-4 grid grid-cols-2 gap-4">  
              <div className="justify-center">
                <p className="text-green-400 text-xl text-center"><span className="text-bb-dark">{(earningsInDividend.toFixed(4))} BTC</span> (${numberWithCommas((earningsInDollars).toFixed(2))})<span className="ml-1 text-bb-black text-lg text-center">Per Day</span></p>
              </div>
              <div className="justify-center">
                <p className="text-green-400 text-xl text-center"><span className="text-bb-dark">{((earningsInDividend * 7).toFixed(4))} BTC</span> (${numberWithCommas((earningsInDollars * 7).toFixed(2))})<span className="ml-1 text-bb-black text-lg text-center">Per Week</span></p>
              </div>
              <div className="justify-center">
                <p className="text-green-400 text-xl text-center"><span className="text-bb-dark">{((earningsInDividend * 30).toFixed(4))} BTC</span> (${numberWithCommas((earningsInDollars * 30).toFixed(2))})<span className="ml-1 text-bb-black text-lg text-center">Per Month</span></p>
              </div>
              <div className="justify-center">
                <p className="text-green-400 text-xl text-center"><span className="text-bb-dark">{((earningsInDividend * 365).toFixed(4))} BTC</span> (${numberWithCommas((earningsInDollars * 365).toFixed(2))})<span className="ml-1 text-bb-black text-lg text-center">Per Year</span></p>
              </div>
            </div>
            <p className="text-gray-600 text-xl text-center flex-col mt-4">Dynamic estimations based on trading volume of ${numberWithCommas(tokenVolume.toFixed(0))}. For reference only.</p>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}


export default Dashboard
