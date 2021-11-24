import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateTopPageDto } from './dto/create-top-page.dto';
import { FindTopPageDto } from './dto/find-top-page.dto';
import { NOT_FOUND_TOP_PAGE_ERROR } from './top-page.constants';
import { TopPageService } from './top-page.service';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) {
		
	}

	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const page = await this.topPageService.findById(id);
		if(!page){
			throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
		}
		return page;
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedPage = await this.topPageService.deleteById(id);
		if(!deletedPage){
			throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
		}
	}

	@Patch(':id')
	async patch(@Param('id') id: string, @Body() dto: CreateTopPageDto){
		const updatedPage = await this.topPageService.updateById(id, dto);
		if(!updatedPage){
			throw new NotFoundException(NOT_FOUND_TOP_PAGE_ERROR)
		}
		return updatedPage;
	}

	@HttpCode(200)
	@Post()
	async find(@Body() dto: FindTopPageDto){

	}
}
