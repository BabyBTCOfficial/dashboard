import React from 'react'

import {
  SearchIcon,
} from '../icons'

import { Input } from '@windmill/react-ui'

function CTA({ text, holdings, address, setAddress, tokenAddress }) {

  const addrFilledColorConditional = (text !== undefined && text !== '' && (text.substring(0, 3) === 'Wal')) ? 'bg-bb-dark' : 'bg-bb-primary';

  return (<>

    <div className="mt-10">
      <span
        className={`flex items-center justify-between px-1 py-2 md:p-2 mb-8 text-sm font-semibold text-black ${addrFilledColorConditional} rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple`}
      >
        <div className="flex items-center">
          <div className="flex justify-center">
            <div className="relative md:mr-6 w-88 sm:w-92 mx-auto focus-within:text-black">
              <div className="absolute inset-y-0 flex items-center pl-2">
                <SearchIcon className="w-4 h-4" aria-hidden="true" />
              </div>
              <Input
                className="pl-6 text-black bg-white dark:bg-white py-1"
                placeholder="Paste your wallet address here"
                aria-label="Search"
                value={address}
                onChange={e => {
                  setAddress(e.target.value)
                }}
              />
            </div>
          </div>
          <span className="hidden md:block">{(text !== undefined && text !== '' && (text.substring(0, 3) === 'Wal')) ? text : 'Enter your Wallet address on the left to see your BTC Rewards'}</span>
        </div>
      </span>
    </div>
  </>
  )
}

export default CTA
