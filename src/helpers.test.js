import { validURL, getCreatedTimeLabel } from './helpers';

describe('validURL', () => {
  test('https://google.com should be valid', () => {
    expect(validURL('https://google.com')).toBe(true);
  })
  test('https://subdomain.domain.com/image.png should be valid', () => {
    expect(validURL('https://subdomain.domain.com/image.png')).toBe(true);
  })
  test('🧉 should not be valid', () => {
    expect(validURL('🧉')).toBe(false);
  })
  test('empty string should not be valid', () => {
    expect(validURL('')).toBe(false);
  })
})

describe('getCreatedTimeLabel', () => {
  const AN_HOUR_IN_MS = 1000 * 60 * 60;

  test('should take input in secons, not ms', () => {
    const anHourAgo = +new Date() - AN_HOUR_IN_MS;
    expect(getCreatedTimeLabel(anHourAgo / 1000)).toBe('1 hour ago');
  })

  test('should return plural for more than an hour', () => {
    const twoHoursAgo = +new Date() - (2 * AN_HOUR_IN_MS);
    expect(getCreatedTimeLabel(twoHoursAgo / 1000)).toBe('2 hours ago');
  })
})