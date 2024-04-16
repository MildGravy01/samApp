import {instance} from './api.config';
import {IScheduleObject} from './types';

class ScheduleService {
  getSchedule(day: Date | null, filter?: string) {
    return instance.get<IScheduleObject>('/api/schedule', {
      params: {day, filterType: filter},
    });
  }
}
export const scheduleService = new ScheduleService();
