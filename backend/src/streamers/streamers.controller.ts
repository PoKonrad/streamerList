import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { updateStreamerUpvoteDto } from './dto/update-steamer-upvote.dto';

@Controller('streamers')
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @Post()
  create(@Body(new ValidationPipe()) createStreamerDto: CreateStreamerDto) {
    return this.streamersService.create(createStreamerDto);
  }

  @Get()
  findAll() {
    return this.streamersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.streamersService.findOne(+id);
  }

  @HttpCode(204)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateStreamerUpvote: updateStreamerUpvoteDto,
  ) {
    console.log(updateStreamerUpvote);
    return this.streamersService.updateUpvotes(id, updateStreamerUpvote);
  }
}
