import { Controller } from '@nestjs/common';
import { ReviewModel } from './rewiew.model';

@Controller('review')
export class ReviewController {
	
	@Post('create')
	async create(@Body() dto: Omit<ReviewModel, '_id'>) {

	}

	@Delete(':id')
	async delete(@Param('id') id: string) {

	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') productId: string){

	}
}
