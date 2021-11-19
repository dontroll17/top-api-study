import { Injectable } from '@nestjs/common';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { InjectModel } from 'nestjs-typegoose';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductModel } from './product.model';

@Injectable()
export class ProductService {
    constructor(@InjectModel(ProductModel) private readonly productModel: ModelType<ProductModel>) {}

    async create(dto: CreateProductDto){
        return this.productModel.create(dto);
    }

    async findByid(id: string){
        return this.productModel.findById(id).exec();
    }

    async deleteById(id: string){
        return this.productModel.findByIdAndDelete(id).exec();
    }

    async updateById(id: string, dto: CreateProductDto){
        return this.productModel.findByIdAndUpdate(id, dto, { new: true}).exec();
    }
}
