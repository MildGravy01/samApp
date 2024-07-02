import {instance} from './api.config';
import {IFilter, IScheduleObject} from './types';

class ScheduleService {
  getSchedule(day: Date | null, filter?: string) {
    return instance.get<IScheduleObject>('/api/schedule', {
      params: {day, filterType: filter},
    });
  }

  getFilters() {
    return instance.get<IFilter[]>('/api/filters');
  }
}
export const scheduleService = new ScheduleService();
