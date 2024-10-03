import { ObjectId } from 'mongodb';
import { ROLE_TYPE } from 'src/constants/user.enum';
import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ type: 'varchar', length: 255 })
  firstname: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastname?: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: ROLE_TYPE, default: ROLE_TYPE.USER })
  type: ROLE_TYPE;

  // Virtual field to map `_id` to `id`
  get id(): string {
    return this._id.toHexString();  // Converts ObjectID to string
  }
}
