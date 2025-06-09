import { User } from '../types/types';
import { getRandomString } from './getRandomString';

export function getValidUser(): User {
  // Helper function to get random number within range
  const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  // Generate random phone number
  const generateRandomPhone = () => {
    return `${getRandomNumber(100, 999)}${getRandomNumber(100, 999)}${getRandomNumber(1000, 9999)}`;
  };

  //looks strange, no sense to use name lists here - FIX
  // List of sample first names and last names for randomization
  const firstNames = [
    'John',
    'Jane',
    'Michael',
    'Sarah',
    'Robert',
    'Emma',
    'David',
    'Olivia',
    'William',
    'Sophia',
  ];
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Miller',
    'Davis',
    'Garcia',
    'Rodriguez',
    'Wilson',
  ];

  // List of sample cities and states - OK
  const cities = [
    'New York',
    'Los Angeles',
    'Chicago',
    'Houston',
    'Phoenix',
    'Philadelphia',
    'San Antonio',
    'San Diego',
  ];
  const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'FL', 'OH', 'MI', 'GA'];
  const countries = ['US', 'CA', 'UK', 'IT', 'FR', 'DE', 'ES', 'JP'];

  // Random year between 1950 and 2000
  const randomYear = getRandomNumber(1950, 2000);
  const randomMonth = getRandomNumber(1, 12).toString().padStart(2, '0');
  const randomDay = getRandomNumber(1, 28).toString().padStart(2, '0');
  const payload = {
    //fix names insert just a string
    firstName: firstNames[getRandomNumber(0, firstNames.length - 1)],
    lastName: lastNames[getRandomNumber(0, lastNames.length - 1)],
    address: {
      street: `${getRandomNumber(100, 9999)} ${getRandomString(6)} St`,
      city: cities[getRandomNumber(0, cities.length - 1)],
      state: states[getRandomNumber(0, states.length - 1)],
      country: countries[getRandomNumber(0, countries.length - 1)],
      postal_code: `${getRandomNumber(10000, 99999)}`,
    },
    phone: generateRandomPhone(),
    dob: `${randomYear}-${randomMonth}-${randomDay}`,
    password: 'SuperSecure@123',
    email: `${getRandomString(10)}@example.com`,
  };

  return payload;
}
