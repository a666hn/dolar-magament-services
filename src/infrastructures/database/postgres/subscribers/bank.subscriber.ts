import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
} from 'typeorm';
import { BankEntity } from '../entities/bank.entity';

@EventSubscriber()
export class BankSubscriber implements EntitySubscriberInterface<BankEntity> {
    listenTo() {
        return BankEntity;
    }

    afterInsert(event: InsertEvent<BankEntity>) {
        const idToString = event.entity.id.toString();
        const ext = '000';
        const arrOfExt = ext.split('');

        arrOfExt.splice(
            arrOfExt.length - idToString.length,
            idToString.length,
            idToString,
        );

        const code = 'B-' + arrOfExt.join('');
        event.entity.bankCode = code;

        event.manager.save(event.entity);
    }
}
