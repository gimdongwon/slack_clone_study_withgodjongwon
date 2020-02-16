import { Resolvers } from "./../../../types/resolvers.d";
import {
  SendMessageMutationArgs,
  SendMessageResponse
} from "../../../types/graphql";
import Message from "../../../entities/Message";
import Channel from "../../../entities/Channel";

const resolvers: Resolvers = {
  Mutation: {
    SendMessage: async (
      _,
      args: SendMessageMutationArgs,
      { pubSub }
    ): Promise<SendMessageResponse> => {
      try {
        const { nickname, contents, thumbnail, innerChannelId } = args;

        const isExistChannel = await Channel.findOne({ id: innerChannelId });

        if (!isExistChannel) {
          return {
            ok: false,
            error: "채널이 존재하지 않습니다. "
          };
        }
        const newMessage = await Message.create({
          nickname,
          thumbnail,
          contents,
          innerChannelId
        }).save();

        pubSub.publish("newMessage", {
          CreateMessageSubscription: newMessage
        });
        return {
          ok: true,
          error: null
        };
      } catch (e) {
        return {
          ok: false,
          error: e.message
        };
      }
    }
  }
};

export default resolvers;
