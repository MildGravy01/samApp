export interface IMeeting {
  type: {name: string};
  title: string;
  location: string;
  startTime: string;
  endTime: string;
  img?: string;
  description?: string;
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
