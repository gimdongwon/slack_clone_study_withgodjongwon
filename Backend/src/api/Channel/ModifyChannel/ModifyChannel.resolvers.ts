import { Resolvers } from './../../../types/resolvers.d';
import { ModifyChannelResponse, ModifyChannelMutationArgs } from '../../../../src/types/graphql.d';
import Channel from '../../../entities/Channel';

const resolvers: Resolvers = {
	Mutation: {
		ModifyChannel: async (_, args: ModifyChannelMutationArgs): Promise<ModifyChannelResponse> => {
			try {
				const { id, nextName } = args;
				const ExistChannel = await Channel.findOne({ id });
				if (!ExistChannel) {
					return {
						ok: false,
						error: '존재하지 않는 채널입니다.',
						changedName: null
					};
				}

				ExistChannel.channelName = nextName;
				ExistChannel.save();

				// 재 조회
				const reExistChannel = await Channel.findOne({ id });

				if (!reExistChannel) {
					return {
						ok: false,
						error: null,
						changedName: null
					};
				}

				return {
					ok: true,
					error: null,
					changedName: reExistChannel.channelName
				};
			} catch (e) {
				return {
					ok: false,
					error: e.Message,
					changedName: null
				};
			}
		}
	}
};

export default resolvers;
