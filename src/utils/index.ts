import moment from 'moment';

export const formattedDate = (date: number | string | null | undefined = Date.now()) => moment(date).format('MM/DD/YYYY');

export const getRundomColor = () => `#${(`${Math.random().toString(16)}000000`).substring(2,8).toUpperCase()}`