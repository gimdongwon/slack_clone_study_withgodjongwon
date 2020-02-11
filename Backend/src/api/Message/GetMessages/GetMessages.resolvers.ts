import { GetMessagesQueryArgs, GetMessagesResponse } from './../../../types/graphql.d';
import { Resolvers } from './../../../types/resolvers.d';
import Message from '../../../../src/entities/Message';
const resolvers: Resolvers = {
	Query: {
		GetMessages: async (_, args: GetMessagesQueryArgs): Promise<GetMessagesResponse> => {
			// logic start
			try {
				const { innerChannelId } = args;
				// == const innerChannelId = args.innerChannelId

				const messages = await Message.find({ innerChannelId });
				return {
					ok: true,
					error: null,
					messages: messages
				};
			} catch (error) {
				return {
					ok: false,
					error: error.message,
					messages: null
				};
			}
		}
	}
};

export default resolvers;
