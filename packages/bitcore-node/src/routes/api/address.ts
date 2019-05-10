import express = require('express');
import bch = require("bitcore-lib-cash");
const router = express.Router({ mergeParams: true });
import { ChainStateProvider } from '../../providers/chain-state';

router.get('/:address/txs',  function(req, res) {
  let { address, chain, network } = req.params;

  if (chain.toLowerCase() === "bch") {
    let bch_address = bch.Address.fromString(address);
    address = bch_address.toCashAddress().replace(/^(bchtest|bitcoincash):/, "")
  }

  let { unspent, limit = 10, since } = req.query;
  let payload = {
    chain,
    network,
    address,
    req,
    res,
    args: { unspent, limit, since }
  };
  ChainStateProvider.streamAddressTransactions(payload);
});

router.get('/:address',  function(req, res) {
  let { address, chain, network } = req.params;
  let { unspent, limit = 10, since } = req.query;

  if (chain.toLowerCase() === "bch") {
    let bch_address = bch.Address.fromString(address);
    address = bch_address.toCashAddress().replace(/^(bchtest|bitcoincash):/, "")
  }

  let payload = {
    chain,
    network,
    address,
    req,
    res,
    args: { unspent, limit, since }
  };
  ChainStateProvider.streamAddressUtxos(payload);
});

router.get('/:address/balance',  async function(req, res) {
  let { address, chain, network } = req.params;

  if (chain.toLowerCase() === "bch") {
    let bch_address = bch.Address.fromString(address);
    address = bch_address.toCashAddress().replace(/^(bchtest|bitcoincash):/, "")
  }

  try {
    let result = await ChainStateProvider.getBalanceForAddress({
      chain,
      network,
      address
    });
    return res.send(result || { confirmed: 0, unconfirmed: 0, balance: 0 });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = {
  router: router,
  path: '/address'
};
