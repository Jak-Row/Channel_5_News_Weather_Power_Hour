import fs from 'node:fs/promises';
import path from 'path';

const __filename = new URL('', import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// TODO: Define a City class with name and id properties
class City {
  Name: String;
  id: String;

  constructor(Name: String, id: String) {
    this.Name = Name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  private filePath: string = path.join(__dirname, 'searchHistory.json');
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
        const data = await fs.readFile(this.filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading search history:', error);
        return [];
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> {
    try {
        await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2));
    } catch (error) {
        console.error('Error writing to search history:', error);
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return await this.read();
  }
  

  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(name: String): Promise<void> {
    const cities = await this.read();
    const newCity = new City(this.generateId(), name);
    cities.push(newCity);
    await this.write(cities);
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
    }


  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
}

export default new HistoryService();
