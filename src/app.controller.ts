import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { AppService } from './services/dataaggregation.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppInterceptor } from './interceptors/logging.interceptor';

@ApiTags('app')
@Controller('app')
@UseInterceptors(AppInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Повертає зібрану інформацію.' })
  async getAggregatedData(@Query('partialCityName') partialCityName?: string) {
    if (partialCityName) {
      return await this.appService.getMembersByCityPartialConcidence(partialCityName);
    } else {
      return await this.appService.getAggregatedData();
    }
  }
}