import TransactionsRepository from '../repositories/TransactionsRepository';
import Balance from '../models/Balance';

interface BalanceDTO {
  income: number;
  outcome: number;
  total: number;
}

class GetBalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): BalanceDTO {
    const transactions = this.transactionsRepository.all();

    let income = 0;
    let outcome = 0;
    let total = 0;

    transactions.forEach(transaction => {
      switch (transaction.type) {
        case 'income': {
          income += transaction.value;
          break;
        }
        case 'outcome': {
          outcome += transaction.value;
          break;
        }
        default: {
          break;
        }
      }
    });

    total = income - outcome;

    const balance = new Balance({ income, outcome, total });

    return balance;
  }
}

export default GetBalanceService;
