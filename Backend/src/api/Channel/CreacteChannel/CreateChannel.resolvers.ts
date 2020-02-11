import { CreateChannelMutationArgs, CreateChannelResponse } from './../../../types/graphql.d';
import { Resolvers } from './../../../types/resolvers.d';
import Channel from '../../../entities/Channel';
const resolvers: Resolvers = {
	Mutation: {
		CreateChannel: async (_, args: CreateChannelMutationArgs, pubSub): Promise<CreateChannelResponse> => {
			try {
				const { channelName } = args;
				const existChannel = await Channel.findOne({ channelName });
				if (existChannel) {
					return {
						ok: false,
						error: '이미 존재하는 채널입니다.'
					};
				}
				const newChannel = await Channel.create({ channelName }).save();
				pubSub.publish('newChannel', {
					CreateChannelSubscription: newChannel
				});
				return {
					ok: true,
					error: null
				};
			} catch (e) {
				return {
					ok: false,
					error: e.Message
				};
			}
		}
	}
};

export default resolvers;
