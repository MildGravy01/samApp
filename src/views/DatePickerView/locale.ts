import {LocaleConfig} from 'react-native-calendars';
export const initCalendarLocale = () => {
  LocaleConfig.locales.ru = {
    monthNames: [
      'Январь',
      'Февраль',
      'Март',
      'Апрель',
      'Май',
      'Июнь',
      'Июль',
      'Август',
    ],
    monthNamesShort: [
      'Янв',
      'Фев',
      'Март',
      'Апр',
      'Май',
      'Июнь',
      'Июль',
      'Авг',
    ],
    dayNames: [
      'Воскресенье',
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
    ],
    dayNamesShort: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    today: 'Сегодня',
  };
  LocaleConfig.defaultLocale = 'ru';
};
