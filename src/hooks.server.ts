import { SvelteKitAuth } from '@auth/sveltekit';
import Discord from '@auth/core/providers/discord';
import { DISCORD_ID, DISCORD_SECRET } from '$env/static/private';

export const handle = SvelteKitAuth({
	providers: [
		Discord({
			clientId: DISCORD_ID,
			clientSecret: DISCORD_SECRET,
			authorization: 'https://discord.com/api/oauth2/authorize?client_id=1195910180999798886&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5175%2Fauth%2Fcallback%2Fdiscord&scope=identify+messages.read',
		})
	],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session(obj) {
            if ('token' in obj) {
                // @ts-ignore
                obj.session.accessToken = obj.token.accessToken;
            }
            return obj.session;
        }
    }
});
