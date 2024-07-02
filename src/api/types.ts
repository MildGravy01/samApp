export interface IMeeting {
  type: {name: string};
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  imgUrl?: string;
  description?: string;
}

export interface IFilter {
  type: string;
  name: string;
  icon: string;
  color: string;
}

export interface IScheduleObject {
  availableWeeks: IWeek[];
  schedule: ISchedule[];
  activeDays: string[];
}
export interface IWeek {
  weekStart: string;
  weekEnd: string;
}
export interface ISchedule {
  title: string;
  data: IMeeting[];
}
