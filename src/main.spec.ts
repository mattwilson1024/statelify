import { getGreeting } from './main';

describe('main', () => {
  it('should return a greeting', () => {
    expect(getGreeting()).toBe('Hello World');
  })
})
