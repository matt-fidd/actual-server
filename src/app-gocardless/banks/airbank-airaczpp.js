import Fallback from './integration-bank.js';

/** @type {import('./bank.interface.js').IBank} */
export default {
  ...Fallback,

  institutionIds: ['AIRBANK_AIRACZPP'],

  normalizeTransaction(transaction, booked) {
    // this institution can sometimes round the amounts of pending transactions
    // to the nearest whole number which causes duplication when the transaction
    // is submitted as booked with a differing amount
    if (!booked) continue;

    return Fallback.normalizeTransaction(transaction, booked);
  },
};
