import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getAggregatedData() {
    try {
      const citiesPopulation = await this.databaseService.getCountOfCityMembers();
      const cityMembers = await this.databaseService.getCountOfMembersWithSameFirstName();
      return { citiesPopulation, cityMembers };
    } catch (error) {
      console.error('Помилка при отриманні зібранної інформації:', error);
      throw error;
    }
  }

  async getMembersByCityPartialConcidence(partialCityName: string) {
    try {
      return await this.databaseService.getFilteredCityMembersByCityPartialConcidence(partialCityName);
    } catch (error) {
      console.error('Помилка при отриманні жителів відфільтрованих по частковому співпадінню назви міста:', error);
      throw error;
    }
  }
}