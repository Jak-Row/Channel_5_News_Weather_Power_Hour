import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  const city = req.body;

  try {
    // TODO: GET weather data from city name
    const weatherData = await WeatherService.getWeatherForCity(city);

    // TODO: save city to search history
    await HistoryService.addCity(city);

    res.status(200).json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve weather data or save city.' });
  }
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  console.log(req);
  try {
    const history = await HistoryService.getCities();
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({error: 'Failed to retrieve search history.'})
  }
});

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req, res) => {});

export default router;
