import {action, makeObservable, observable, runInAction} from 'mobx';
import {ISchedule, IWeek} from '../api/types';
import {scheduleService} from '../api/ScheduleService';
import {filterStore} from './FilterStore';
import {MarkedDates} from 'react-native-calendars/src/types';
import {getCalendarDateString} from 'react-native-calendars/src/services';

class ScheduleStore {
  selectedDate: Date = new Date();
  selectedWeekSchedule: ISchedule[] = [];
  availableWeeks: IWeek[] | null = null;
  activeDays: MarkedDates | null = null;
  isScheduleLoading: boolean = false;
  networkError: string | null = null;
  constructor() {
    makeObservable(this, {
      selectedDate: observable,
      selectedWeekSchedule: observable,
      availableWeeks: observable,
      activeDays: observable,
      isScheduleLoading: observable,
      networkError: observable,
      loadSchedule: action.bound,
      setSelectedDate: action.bound,
      setNetworkError: action,
    });
    this.loadSchedule();
  }

  async loadSchedule(setIsLoading = true) {
    try {
      runInAction(() => {
        this.isScheduleLoading = !!setIsLoading;
        this.setNetworkError(null);
      });
      const scheduleResult = (
        await scheduleService.getSchedule(
          this.selectedDate,
          filterStore.currentFilter.id,
        )
      ).data;
      const activeDays = scheduleResult.activeDays?.reduce(
        (a, v) => ({
          ...a,
          [getCalendarDateString(v)]: {marked: true, dotColor: 'red'},
        }),
        {},
      );
      runInAction(() => {
        this.availableWeeks = scheduleResult.availableWeeks;
        this.selectedWeekSchedule = scheduleResult.schedule;
        this.activeDays = activeDays;
      });
    } catch (err) {
      this.setNetworkError(
        'Не удалось загрузить расписание. Нет соединения с сервером, попробуйте позже.',
      );
    } finally {
      runInAction(() => {
        this.isScheduleLoading = false;
      });
    }
  }

  setSelectedDate(day: Date) {
    this.selectedDate = new Date(day.toUTCString());
    this.loadSchedule(false);
  }

  setNetworkError(error: string | null) {
    this.networkError = error;
  }
}

export const scheduleStore = new ScheduleStore();
