import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import GetBalanceService from './GetBalanceService';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: RequestDTO): Transaction {
    const verifyTypeString =
      type.includes('income') || type.includes('outcome');

    if (!verifyTypeString) {
      throw Error('Incorrect type of transaction');
    }
    if (value <= 0) {
      throw Error('Value of transaction is incorrect');
    }
    if (title.length <= 3) {
      throw Error('Title of transaction need to be at least 4 caracters');
    }
    if (
      type === 'outcome' &&
      this.transactionsRepository.balance.total - value < 0
    ) {
      throw Error('You dont have money for this');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    const getBalance = new GetBalanceService(this.transactionsRepository);
    const balance = getBalance.execute();

    this.transactionsRepository.setBalance(balance);

    return transaction;
  }
}

export default CreateTransactionService;
