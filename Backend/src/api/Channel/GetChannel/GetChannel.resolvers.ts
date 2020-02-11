import { GetChannelsResponse } from './../../../types/graphql.d';
import { Resolvers } from '../../../types/resolvers';
import Channel from '../../../entities/Channel';

const resolvers: Resolvers = {
	Query: {
		GetChannels: async (_, __): Promise<GetChannelsResponse> => {
			try {
				const Channels = await Channel.find();
				if (!Channels) {
					return {
						ok: true,
						error: '존재하는 채널이 없습니다.',
						Channels: null
					};
				}
				return {
					ok: true,
					error: null,
					Channels
				};
			} catch (error) {
				return {
					ok: false,
					error: error.message,
					Channels: null
				};
			}
		}
	}
};

export default resolvers;
