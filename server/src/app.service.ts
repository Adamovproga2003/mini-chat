import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/message/create-message.dto';
import { ChatEntity } from './entities/chat.entity';
import { UsersService } from './users/users.service';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(ChatEntity)
    private chatRepository: Repository<ChatEntity>,
    private usersService: UsersService,
  ) {}
  async createMessage({
    text,
    username,
  }: CreateMessageDto): Promise<ChatEntity> {
    const user = await this.usersService.findOneBy(username);
    return await this.chatRepository.save({ text, user });
  }

  async getMessages(): Promise<ChatEntity[]> {
    return await this.chatRepository.find({ relations: ['user'] });
  }
}
