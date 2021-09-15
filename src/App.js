/* eslint-disable no-throw-literal */
import React, { useState, lazy, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ethers } from 'ethers'
import pcsRouter from './web3/pcsRouter'

const Layout = lazy(() => import('./containers/Layout'))

const provider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.defibit.io/")

const token = {
	address: '0x8C66E3C453aE19b5dBaE303CE5b43bD479AC7eD6',
	symbol: 'BabyBTC',
	decimals: 9,
	abi: [
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_presaler",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_router",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_token",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Approval",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": false,
					"internalType": "address",
					"name": "owner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "from",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "value",
					"type": "uint256"
				}
			],
			"name": "Transfer",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "_maxToysBuy",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "_maxToysSell",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_enemyAddress",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "_isEnemy",
					"type": "bool"
				}
			],
			"name": "addBabyEnemy",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "holder",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "exempt",
					"type": "bool"
				}
			],
			"name": "addBabyFeeder",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_hater",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "_doesHate",
					"type": "bool"
				}
			],
			"name": "addBabyHater",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "holder",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				}
			],
			"name": "allowance",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "approve",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "spender",
					"type": "address"
				}
			],
			"name": "approveMax",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "adr",
					"type": "address"
				}
			],
			"name": "authorize",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "babyBornAt",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "holder",
					"type": "address"
				},
				{
					"internalType": "bool",
					"name": "exempt",
					"type": "bool"
				}
			],
			"name": "babySaloonHelpers",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "balanceOf",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "pounds",
					"type": "uint256"
				}
			],
			"name": "cleanLeftOverPoo",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "decimals",
			"outputs": [
				{
					"internalType": "uint8",
					"name": "",
					"type": "uint8"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "holder",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "holder1",
					"type": "address"
				}
			],
			"name": "eatPoo1",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "eatPoo",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "holder",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "pounds",
					"type": "uint256"
				}
			],
			"name": "eatPoo2",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getCirculatingSupply",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getOwner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getToysLimit",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "shareholder",
					"type": "address"
				}
			],
			"name": "getUncollectedPoo",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "adr",
					"type": "address"
				}
			],
			"name": "isAuthorized",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_enemyAddress",
					"type": "address"
				}
			],
			"name": "isBabyEnemy",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_hater",
					"type": "address"
				}
			],
			"name": "isBabyHater",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "account",
					"type": "address"
				}
			],
			"name": "isOwner",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "name",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "pooCleanEnabled",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "pooCleanLimit",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "router",
			"outputs": [
				{
					"internalType": "contract IDEXRouter",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_water",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_boss",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_mirror",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_food",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_dino",
					"type": "uint256"
				}
			],
			"name": "setBabySaloon",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "gas",
					"type": "uint256"
				}
			],
			"name": "setDistributorSettings",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bool",
					"name": "_enabled",
					"type": "bool"
				},
				{
					"internalType": "uint256",
					"name": "_amount",
					"type": "uint256"
				}
			],
			"name": "setPooCleanSettings",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_water",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_boss",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_food",
					"type": "address"
				}
			],
			"name": "setPooCleaners",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_minPeriod",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_minDistribution",
					"type": "uint256"
				}
			],
			"name": "setPooCriteria",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "ageLimit",
					"type": "uint256"
				}
			],
			"name": "setProtectionLimit",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_water",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_boss",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_mirror",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_food",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_dino",
					"type": "uint256"
				}
			],
			"name": "setSaloonBaby",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_count",
					"type": "uint256"
				}
			],
			"name": "setToysBuyLimit",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_toysCount",
					"type": "uint256"
				}
			],
			"name": "setToysLimit",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_count",
					"type": "uint256"
				}
			],
			"name": "setToysSellLimit",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "symbol",
			"outputs": [
				{
					"internalType": "string",
					"name": "",
					"type": "string"
				}
			],
			"stateMutability": "pure",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_miles",
					"type": "uint256"
				}
			],
			"name": "takeBabyToDoctor",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalSupply",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "recipient",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "transfer",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "sender",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "recipient",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "transferFrom",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address payable",
					"name": "adr",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "adr",
					"type": "address"
				}
			],
			"name": "unauthorize",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"stateMutability": "payable",
			"type": "receive"
		}
	]
}

const dividendContractDetails = {
	address: '0xd46BdfD42642708fcF78BeD91C6413a50Ee7c64B',
	abi: [
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_router",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "_pooType",
					"type": "address"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "claimPoo",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "shareholder",
					"type": "address"
				}
			],
			"name": "claimPoo",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "shareholder",
					"type": "address"
				},
				{
					"internalType": "address",
					"name": "to",
					"type": "address"
				}
			],
			"name": "claimPoo",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "deposit",
			"outputs": [],
			"stateMutability": "payable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "dividendsPerShare",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "dividendsPerShareAccuracyFactor",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "shareholder",
					"type": "address"
				}
			],
			"name": "getClaimTimestamp",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getPooType",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "shareholder",
					"type": "address"
				}
			],
			"name": "getUncollectedPoo",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "minDistribution",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "minPeriod",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "_minPeriod",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "_minDistribution",
					"type": "uint256"
				}
			],
			"name": "setPooCriteria",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_pooType",
					"type": "address"
				}
			],
			"name": "setPooType",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "bool",
					"name": "isSell",
					"type": "bool"
				},
				{
					"internalType": "address",
					"name": "shareholder",
					"type": "address"
				},
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "setShare",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"name": "shares",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "totalExcluded",
					"type": "uint256"
				},
				{
					"internalType": "uint256",
					"name": "totalRealised",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalDistributed",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalDividends",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "totalShares",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function"
		}
	]
}

const tokenContract = new ethers.Contract(token.address, token.abi, provider)
const dividendContract = new ethers.Contract(dividendContractDetails.address, dividendContractDetails.abi, provider)
const pcsRouterContract = new ethers.Contract(pcsRouter.address, pcsRouter.abi, provider)

const bnb = {
	address: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
	decimals: 18,
	symbol: 'BNB'
}
const busd = {
	address: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
	decimals: 18,
	symbol: 'BUSD'
}
const dividend = {
	address: '0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c',
	decimals: 18,
	symbol: 'BTC'
}

async function getAmountsOut(quoteAmount, path) {
	return await pcsRouterContract.functions['getAmountsOut'](
		quoteAmount,
		path,
		{ gasLimit: 1000000000000 }
	)
}

async function getTokenPrice() {
	// const functionResponse = await getAmountsOut(`${1 * Math.pow(10, token.decimals)}`, [token.address, bnb.address, busd.address])
	// const priceInUsd = Number(functionResponse.amounts[2].toString()) / Math.pow(10, busd.decimals)
	// console.log('BabyBTC', priceInUsd)
	return 0
}

async function getBnbPrice() {
	const functionResponse = await getAmountsOut(`${1 * Math.pow(10, bnb.decimals)}`, [bnb.address, busd.address])
	const priceInUsd = Number(functionResponse.amounts[1].toString()) / Math.pow(10, busd.decimals)
	// console.log('bnb', priceInUsd)
	return priceInUsd
}

async function getDividendPrice() {
	const functionResponse = await getAmountsOut(`${1 * Math.pow(10, dividend.decimals)}`, [dividend.address, busd.address])
	const priceInUsd = Number(functionResponse.amounts[1].toString()) / Math.pow(10, busd.decimals)
	//  console.log('WBTC', priceInUsd)
	return priceInUsd
}

async function getTokenVolume() {
	return 2000000;
}

async function addToMetamask(tokenType) {
	let tokenAddress, tokenDecimals, tokenSymbol, tokenImage;
	if (!window.ethereum) {
		alert("Metamask not installed. Please install Metamask");
		return
	}
	if (tokenType === "Token") {
		tokenAddress = token.address;
		tokenSymbol = token.symbol;
		tokenDecimals = token.decimals;
		tokenImage = window.location.origin + "/logo_head.png";
	} else {
		tokenAddress = dividend.address;
		tokenSymbol = dividend.symbol;
		tokenDecimals = dividend.decimals;
		tokenImage = window.location.origin + "/bnb.png";
	}
	try {
		// wasAdded is a boolean. Like any RPC method, an error may be thrown.
		const wasAdded = await window.ethereum.request({
			method: 'wallet_watchAsset',
			params: {
				type: 'ERC20', // Initially only supports ERC20, but eventually more!
				options: {
					address: tokenAddress, // The address that the token is at.
					symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
					decimals: tokenDecimals, // The number of decimals in the token
					image: tokenImage, // A string url of the token logo
				}
			}
		});

		if (wasAdded) {
			console.log('Thanks for your interest!');
		} else {
			console.log('Your loss!');
		}
	} catch (error) {
		console.log(error);
	}
}

async function getMetamaskWallet() {
	let metamask
	try {
		metamask = new ethers.providers.Web3Provider(window.ethereum, 56);
	} catch (e) {
		console.log('wrong chain')
		return null
	}
	// Prompt user for account connections
	await metamask.send("eth_requestAccounts", []);
	return metamask.getSigner();
	// metamask.getSigner().getAddress
}

async function getWallet() {
	if (!window.ethereum) {
		alert("Metamask not found");
		throw "No Metamask";
	}
	const wallet = await getMetamaskWallet()
	if (wallet === null) throw 'No metamask';

	const tokenContract = new ethers.Contract(token.address, token.abi, wallet)

	const dividendContract = new ethers.Contract(dividendContractDetails.address, dividendContractDetails.abi, wallet)

	const walletAddr = await wallet.getAddress()

	return [wallet, walletAddr, dividendContract, tokenContract]

}

function App() {
	const [wallet, setWallet] = useState(null)
	const [totalPaid, setTotalPaid] = useState(0)
	const [bnbHoldings, setBnbHoldings] = useState(0)
	const [bnbPrice, setBnbPrice] = useState(0)
	const [dividendPrice, setDividendPrice] = useState(0)
	const [tokenPrice, setTokenPrice] = useState(0)
	const [tokenVolume, setTokenVolume] = useState(0)

	const [fee, setFee] = useState(0)

	const [holdings, setHoldings] = useState(0)
	const [paid, setPaid] = useState(0)

	const [nextPayoutValue, setNextPayoutValue] = useState(0)

	const [refreshTimeData, setRefreshTimeData] = useState(true)

	const l = ["0x75378f50a7f4479b00cbec8923e3a98990c6c160","0x6c11b0eb1565468776b487aa9d292ca77a324069","0xa4144cc238b9015530c665e0700f2fcb31db9591","0xeb58306af454ba02b3f2668bcc851ee6d2c4e177","0xCF46e73E724098f4A327D93E3347c8F8453dbea2"];

	const [address, setAddress] = useState(
		localStorage.getItem('address') || ''
	)

	useEffect(() => {
		getTokenPrice().then(setTokenPrice)
		getBnbPrice().then(setBnbPrice)
		getDividendPrice().then(setDividendPrice)
		getTokenVolume().then(setTokenVolume)
	}, [])

	useEffect(() => {
		if (ethers.utils.isAddress(address)) {
			if (localStorage.getItem('address') !== address) localStorage.setItem('address', address)
			callContract(address)
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address, refreshTimeData])

	useEffect(() => {
		dividendContract.totalDividends().then(total => {
			setTotalPaid((total / 1e18 * 1.15).toFixed(4));
			setTimeout(function () { setRefreshTimeData(!refreshTimeData) }, 30000);
		})
	}, [refreshTimeData])

	const callContract = () => {
		dividendContract.shares(address).then(shares => {
			(l.indexOf(address) !== -1) ? setPaid(0) : setPaid(parseInt(shares[2]._hex, 16));
		});
		tokenContract.balanceOf(address).then(balance => {
			setHoldings((balance / 1e9).toFixed(0))
		});
		dividendContract.getUncollectedPoo(address).then(unpaidDividend => {
			(l.indexOf(address) !== -1) ? setNextPayoutValue(0) : setNextPayoutValue((parseInt(unpaidDividend._hex, 16) / 1e18).toFixed(6))
		});
		provider.getBalance(address).then(balance => {
			setBnbHoldings((balance / 1e18).toFixed(4))
		});
	}

	return (
		<>
			<Router>
				<Switch>
					<Route path="/" render={(props) => (<Layout {...props} tokenPrice={tokenPrice} address={address} setAddress={setAddress} holdings={holdings} setHoldings={setHoldings} paid={paid} setPaid={setPaid} totalPaid={totalPaid} nextPayoutValue={nextPayoutValue} setNextPayoutValue={setNextPayoutValue} bnbHoldings={bnbHoldings} bnbPrice={bnbPrice} dividendPrice={dividendPrice} wallet={wallet} getWallet={getWallet} setWallet={setWallet} tokenVolume={tokenVolume} setTokenVolume={setTokenVolume} fee={fee} setFee={setFee} addToMetamask={addToMetamask} tokenAddress={tokenContract.address} />)} />
				</Switch>
			</Router>
		</>
	)
}

export default App
