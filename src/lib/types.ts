import { Dayjs } from 'dayjs';

export type Todo = {
	id: number;
	text: string;
	completed: boolean;
	date: Dayjs | null;
};
