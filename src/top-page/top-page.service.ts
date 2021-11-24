import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { TopPageModel } from './top-page.model';

@Injectable()
export class TopPageService {
    constructor(@InjectModel(TopPageModel) private readonly topPageModel: ModelType<TopPageModel>) {}

    async create(dto: CreateTopPageDto) {
        return this.topPageModel.create(dto);
    }

    async findById(id: string){
        return this.topPageModel.findById(id).exec();
    }

    async deleteById(id: string){
        return this.topPageModel.findByIdAndRemove(id).exec();
    }

    async updateById(id: string, dto: CreateTopPageDto){
        return this.topPageModel.findByIdAndUpdate(id, dto, { new: true }).exec();
    }
}