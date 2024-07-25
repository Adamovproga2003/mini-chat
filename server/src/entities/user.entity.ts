import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatEntity } from './chat.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: ObjectId;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => ChatEntity, (chat) => chat.user)
  messages: ChatEntity[];
}
