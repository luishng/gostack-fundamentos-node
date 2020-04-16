import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

interface CreateTrasactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  public balance: Balance;

  constructor() {
    const income = 0;
    const outcome = 0;
    const total = 0;
    this.transactions = [];
    this.balance = new Balance({ income, outcome, total });
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public setBalance(balance: Balance): void {
    this.balance = balance;
  }

  public getBalance(): Balance {
    return this.balance;
  }

  public create({ title, value, type }: CreateTrasactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
