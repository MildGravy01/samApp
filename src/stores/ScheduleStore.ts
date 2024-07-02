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
    const delayedIsLoading = setTimeout(() => {
      runInAction(() => {
        this.isScheduleLoading = !!setIsLoading;
        this.setNetworkError(null);
      });
    }, 1000);
    try {
      const scheduleResult = (
        await scheduleService.getSchedule(
          this.selectedDate,
          filterStore.currentFilter.type,
        )
      ).data;
      const activeDays = scheduleResult.activeDays?.reduce(
        (a, v) => ({
          ...a,
          [getCalendarDateString(v)]: {
            marked: true,
            dotColor: 'red',
            disabled: false,
          },
        }),
        {},
      );
      runInAction(() => {
        const loadedWeeksSet = new Set<IWeek>();
        scheduleResult.availableWeeks.forEach(week => {
          if (new Date(week.weekEnd) >= new Date()) {
            loadedWeeksSet.add(week);
          }
        });

        if (this.selectedDate < new Date()) {
          const selectedWeek = scheduleResult.availableWeeks.find(
            week =>
              new Date(week.weekStart) <= this.selectedDate &&
              new Date(week.weekEnd) >= this.selectedDate,
          );
          if (selectedWeek) {
            loadedWeeksSet.add(selectedWeek);
          }
        }
        this.availableWeeks = Array.from(loadedWeeksSet).sort((a, b) => {
          if (new Date(a.weekStart) < new Date(b.weekStart)) {
            return -1;
          } else {
            return 1;
          }
        });
        this.selectedWeekSchedule = scheduleResult.schedule;
        this.activeDays = activeDays;
      });

      if (
        this.selectedWeekSchedule?.length === 0 &&
        this.availableWeeks &&
        Number(this.availableWeeks?.length) > 0
      ) {
        this.setSelectedDate(new Date(this.availableWeeks[0].weekStart));
      }
    } catch (err) {
      this.setNetworkError(
        'Не удалось загрузить расписание. Нет соединения с сервером, попробуйте позже.',
      );
    } finally {
      clearTimeout(delayedIsLoading);
      runInAction(() => {
        this.isScheduleLoading = false;
      });
    }
  }

  setSelectedDate(day: Date) {
    this.selectedDate = new Date(day.toUTCString());
    this.loadSchedule(true);
  }

  setNetworkError(error: string | null) {
    this.networkError = error;
  }
}

export const scheduleStore = new ScheduleStore();
