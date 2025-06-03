import { Endpoint } from 'payload/config';
import stats from './waitlist/stats';

export const customEndpoints: Endpoint[] = [
  {
    path: '/waitlist/stats',
    method: 'get',
    handler: stats,
  },
];

export default customEndpoints;
