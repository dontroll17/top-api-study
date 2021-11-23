import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTopPage } from './dto/create-top-page.dto';
import { TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {
    constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {}

    async create(dto: CreateTopPage) {
        return this.topPageModel.create(dto);
    }
}
