import {action, makeObservable, observable, runInAction} from 'mobx';
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {
  faClock,
  faBars,
  faBook,
  faBookOpen,
} from '@fortawesome/free-solid-svg-icons';
import {scheduleStore} from './ScheduleStore';
export interface IFilter {
  id: string;
  name: string;
  icon: IconDefinition;
  color: string;
  isLoading?: boolean;
}
class FilterStore {
  public availableFilters: IFilter[] = [
    {id: 'all', name: 'Все мероприятия', icon: faBars, color: '#FF0000'},
    {id: 'lection', name: 'Лекции', icon: faBook, color: '#5AC8FA'},
    {id: 'film', name: 'Просмотр фильмов', icon: faClock, color: '#FF9500'},
    {id: 'meeting', name: 'Собрания', icon: faBookOpen, color: '#007AFF'},
  ];
  public currentFilter: IFilter = this.availableFilters[0];

  constructor() {
    makeObservable(this, {
      availableFilters: observable,
      currentFilter: observable,
      setFilter: action.bound,
      resetIsLoading: action.bound,
      setIsLoadingFilter: action,
    });
  }

  async setFilter(filterId: string) {
    const filter = this.availableFilters.find(item => item.id === filterId);
    if (filter) {
      this.setIsLoadingFilter(filter, true);
      runInAction(() => {
        this.currentFilter = filter;
      });
      await scheduleStore.loadSchedule(true);
    }
  }

  resetIsLoading() {
    if (this.availableFilters) {
      this.availableFilters = this.availableFilters.map(filter => {
        return {...filter, isLoading: false};
      });
    }
  }

  setIsLoadingFilter(filter: IFilter, state: boolean) {
    const modifiedFilterObject: IFilter = {...filter, isLoading: state};
    this.availableFilters = this.availableFilters.map(filterObj => {
      if (filter.id === filterObj.id) {
        return modifiedFilterObject;
      }
      return filterObj;
    });
  }
}

export const filterStore = new FilterStore();
