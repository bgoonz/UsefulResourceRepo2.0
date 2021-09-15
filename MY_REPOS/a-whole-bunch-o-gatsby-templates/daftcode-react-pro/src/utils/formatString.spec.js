import { toHHMMSS } from './formatString';

describe('FormatString', () => {
  it('should convet seconds to HH:MM:SS', () => {
    expect(toHHMMSS(98)).toEqual('01:38:00');
    expect(toHHMMSS(0)).toEqual('00:00:00');
    expect(toHHMMSS(120)).toEqual('02:00:00');
  });
});
