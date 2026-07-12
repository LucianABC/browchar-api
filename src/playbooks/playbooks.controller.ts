import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlaybooksService } from './playbooks.service';
import { ListPlaybooksQueryDto } from './playbook.schemas';

@Controller('playbooks')
export class PlaybooksController {
  constructor(private readonly playbooksService: PlaybooksService) {}

  @Get()
  findAll(@Query() query: ListPlaybooksQueryDto) {
    return this.playbooksService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playbooksService.findOne(id);
  }
}
