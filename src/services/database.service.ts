import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(private readonly connection: Connection) {}

  async getCountOfCityMembers() {
    const query = `
      SELECT city, COUNT(*) AS count
      FROM residents
      GROUP BY city
      ORDER BY count DESC
    `;
    return this.connection.query(query);
  }

  async getCountOfMembersWithSameFirstName() {
    const query = `
      SELECT city, first_name, COUNT(*) AS count
      FROM residents
      GROUP BY city, first_name
    `;
    return this.connection.query(query);
  }

  async getFilteredCityMembersByCityPartialConcidence(partialCityName: string) {
    const query = `
      SELECT *
      FROM residents
      WHERE city LIKE :partialCityName
    `;
    return this.connection.query(query, { partialCityName: `%${partialCityName}%`} as any);
  }
}