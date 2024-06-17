import Fallback from './integration-bank.js';

/** @type {import('./bank.interface.js').IBank} */
export default {
  ...Fallback,

  institutionIds: ['SANTANDER_GB_ABBYGB2L'],

  accessValidForDays: 90,

  normalizeTransaction(transaction, booked) {
    if (!booked)
      return

    const name = transaction.creditorName || transaction.debtorName;

    transaction.creditorName = name;
    transaction.debtorName = name;

    return Fallback.normalizeTransaction(transaction, booked);
  },
};
