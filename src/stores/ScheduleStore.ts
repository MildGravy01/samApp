import {action, makeObservable, observable, runInAction} from 'mobx';
import {ISchedule, IWeek} from '../api/types';
import {scheduleService} from '../api/ScheduleService';
import {filterStore} from './FilterStore';
import {MarkedDates} from 'react-native-calendars/src/types';
import {getCalendarDateString} from 'react-native-calendars/src/services';

class ScheduleStore {
  selectedDate: Date = new Date();
  selectedWeekSchedule: ISchedule[] | null = null;
  availableWeeks: IWeek[] | null = null;
  activeDays: MarkedDates | null = null;
  isScheduleLoading: boolean = false;
  constructor() {
    makeObservable(this, {
      selectedDate: observable,
      selectedWeekSchedule: observable,
      availableWeeks: observable,
      activeDays: observable,
      isScheduleLoading: observable,
      loadSchedule: action.bound,
      setSelectedDate: action.bound,
    });
    this.loadSchedule();
  }

  async loadSchedule() {
    try {
      runInAction(() => {
        this.isScheduleLoading = true;
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
        if (
          scheduleResult.schedule.length === 0 &&
          scheduleResult.availableWeeks?.length > 0
        ) {
          this.selectedDate = new Date(
            scheduleResult.availableWeeks[0].weekStart,
          );
          this.loadSchedule();
          return;
        }
        this.availableWeeks = scheduleResult.availableWeeks;
        this.selectedWeekSchedule = scheduleResult.schedule;
        this.activeDays = activeDays;
      });
    } catch (err) {
      console.error(err);
    } finally {
      runInAction(() => {
        this.isScheduleLoading = false;
      });
    }
  }

  setSelectedDate(day: Date) {
    this.selectedDate = day;
    this.loadSchedule();
  }
}

export const scheduleStore = new ScheduleStore();
