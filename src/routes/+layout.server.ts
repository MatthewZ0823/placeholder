import { getToken } from '@auth/core/jwt';

export const load = async (event) => {
	return {
		session: await event.locals.getSession()
	};
};
