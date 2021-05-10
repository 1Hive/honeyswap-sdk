import { ChainId, Fetcher, JSBI, Token } from '../src'
import { ZERO_ADDRESS } from '../src/constants'
import { rinkeby } from 'dxswap-core/.contracts.json'
import { getAddress } from '@ethersproject/address'
import { TEST_TOKENS } from './commons'
import { getNetwork } from '@ethersproject/networks'
import { getDefaultProvider } from '@ethersproject/providers'

describe('fees', () => {
  // skip because uses old implementations, update tests with new local deployment
  describe('fetchSwapFee', () => {
    it.skip('Get WETH-WEENUS rinkeby fee', async () => {
      const WETH_WEENUS_RINKEBY = await Fetcher.fetchPairData(
        Token.WETH[ChainId.RINKEBY],
        TEST_TOKENS.WEENUS[ChainId.RINKEBY]
      )
      const WETH_WEENUS_RINKEBY_FEE = await Fetcher.fetchSwapFee(WETH_WEENUS_RINKEBY.liquidityToken)
      expect(WETH_WEENUS_RINKEBY_FEE.fee).toEqual(JSBI.BigInt(10))
    })
  })

  describe('fetchSwapFees', () => {
    it.skip('Get WETH-WEENUS rinkeby fee', async () => {
      const WETH_WEENUS_RINKEBY = await Fetcher.fetchPairData(
        Token.WETH[ChainId.RINKEBY],
        TEST_TOKENS.WEENUS[ChainId.RINKEBY]
      )
      const WETH_XEENUS_RINKEBY = await Fetcher.fetchPairData(
        Token.WETH[ChainId.RINKEBY],
        TEST_TOKENS.XEENUS[ChainId.RINKEBY]
      )
      const fees = await Fetcher.fetchSwapFees([WETH_WEENUS_RINKEBY.liquidityToken, WETH_XEENUS_RINKEBY.liquidityToken])
      expect(fees[0].fee).toEqual(JSBI.BigInt(10))
      expect(fees[1].fee).toEqual(JSBI.BigInt(15))
    })
  })

  describe('fetchAllSwapFees', () => {
    it.skip('Get all rinkeby fees', async () => {
      const WETH_WEENUS_RINKEBY = await Fetcher.fetchPairData(
        Token.WETH[ChainId.RINKEBY],
        TEST_TOKENS.WEENUS[ChainId.RINKEBY]
      )
      const WETH_XEENUS_RINKEBY = await Fetcher.fetchPairData(
        Token.WETH[ChainId.RINKEBY],
        TEST_TOKENS.XEENUS[ChainId.RINKEBY]
      )
      const WEENUS_XEENUS_RINKEBY = await Fetcher.fetchPairData(
        TEST_TOKENS.WEENUS[ChainId.RINKEBY],
        TEST_TOKENS.XEENUS[ChainId.RINKEBY]
      )
      const fees = await Fetcher.fetchAllSwapFees(ChainId.RINKEBY)
      expect(fees[WETH_WEENUS_RINKEBY.liquidityToken.address].fee).toEqual(JSBI.BigInt(10))
      expect(fees[WETH_XEENUS_RINKEBY.liquidityToken.address].fee).toEqual(JSBI.BigInt(15))
      expect(fees[WEENUS_XEENUS_RINKEBY.liquidityToken.address].fee).toEqual(JSBI.BigInt(20))
    })

    it.skip('Get rinkeby fees with cache', async () => {
      const WETH_WEENUS_RINKEBY = await Fetcher.fetchPairData(
        Token.WETH[ChainId.RINKEBY],
        TEST_TOKENS.WEENUS[ChainId.RINKEBY]
      )
      const WETH_XEENUS_RINKEBY = await Fetcher.fetchPairData(
        Token.WETH[ChainId.RINKEBY],
        TEST_TOKENS.XEENUS[ChainId.RINKEBY]
      )
      const WEENUS_XEENUS_RINKEBY = await Fetcher.fetchPairData(
        TEST_TOKENS.WEENUS[ChainId.RINKEBY],
        TEST_TOKENS.XEENUS[ChainId.RINKEBY]
      )
      const fees = await Fetcher.fetchAllSwapFees(ChainId.RINKEBY, {
        [WETH_WEENUS_RINKEBY.liquidityToken.address]: {
          fee: JSBI.BigInt(10),
          owner: ZERO_ADDRESS
        },
        [WETH_XEENUS_RINKEBY.liquidityToken.address]: {
          fee: JSBI.BigInt(15),
          owner: ZERO_ADDRESS
        }
      })
      expect(fees[WETH_WEENUS_RINKEBY.liquidityToken.address].fee).toEqual(JSBI.BigInt(10))
      expect(fees[WETH_XEENUS_RINKEBY.liquidityToken.address].fee).toEqual(JSBI.BigInt(15))
      expect(fees[WEENUS_XEENUS_RINKEBY.liquidityToken.address].fee).toEqual(JSBI.BigInt(20))
    })
  })

  describe('fetchProtocolFee', () => {
    it('Get protocol fee on rinkeby', async () => {
      const protocolFee = await Fetcher.fetchProtocolFee(ChainId.RINKEBY)
      expect(protocolFee.feeDenominator).toEqual(5)
      expect(protocolFee.feeReceiver).toEqual(getAddress(rinkeby.feeReceiver))
    })
  })
})
