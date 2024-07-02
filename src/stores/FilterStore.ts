import {action, makeObservable, observable, runInAction} from 'mobx';
import {
  faClock,
  faBars,
  faBook,
  faBookOpen,
} from '@fortawesome/free-solid-svg-icons';
import {scheduleStore} from './ScheduleStore';
import { IFilter } from '../api/types';
import {scheduleService} from '../api/ScheduleService';

export interface IFilterObject extends IFilter{
  isLoading?: boolean;
}
class FilterStore {
  public availableFilters: IFilterObject[] = [{type: 'all', name: 'Все мероприятия', icon: `fas/list`, color: '#FF0000'}];
  public currentFilter: IFilter = this.availableFilters[0];

  constructor() {
    makeObservable(this, {
      availableFilters: observable,
      currentFilter: observable,
      setFilter: action.bound,
      resetIsLoading: action.bound,
      setIsLoadingFilter: action,
    });
    this.loadFilters();
  }

  async loadFilters(){
    const filters = await scheduleService.getFilters();
    if(!filters.data){
      return;
    }
    this.availableFilters = [...this.availableFilters,...filters.data];
  }

  async setFilter(filterId: string) {
    const filter = this.availableFilters.find(item => item.type === filterId);
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

  setIsLoadingFilter(filter: IFilterObject, state: boolean) {
    const modifiedFilterObject: IFilterObject = {...filter, isLoading: state};
    this.availableFilters = this.availableFilters.map(filterObj => {
      if (filter.type === filterObj.type) {
        return modifiedFilterObject;
      }
      return filterObj;
    });
  }
}

export const filterStore = new FilterStore();
