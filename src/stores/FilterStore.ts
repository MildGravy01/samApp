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
    });
  }

  async setFilter(filterId: string) {
    const filter = this.availableFilters.find(item => item.id === filterId);
    if (filter) {
      runInAction(() => {
        this.currentFilter = filter;
      });
      await scheduleStore.loadSchedule(true);
    }
  }
}

export const filterStore = new FilterStore();
