import { User } from '@prisma/client';
import { GQLContext } from '../../app';
import { builder } from '../schemaBuilder';
import { ActionEvent, ActionEventGqlType, ActionType } from './types';

// TODO move to db
const rooms: { [room: string]: User[] } = {};

const withOnUnsubscribe = (
  asyncIterator: AsyncIterator<unknown, any, undefined>,
  onUnsubscribe: () => void,
) => {
  const asyncReturn = asyncIterator.return;

  asyncIterator.return = () => {
    onUnsubscribe();
    return asyncReturn
      ? asyncReturn.call(asyncIterator)
      : Promise.resolve({ value: undefined, done: true });
  };

  return asyncIterator as any;
};

export const webRtcSubscription = builder.subscriptionField('webRTC', (t) =>
  t.field({
    authScopes: {
      public: true,
    },
    type: ActionEventGqlType,
    args: {
      roomId: t.arg.string({ required: true }),
    },
    subscribe: (_, { roomId }, ctx) => {
      // need to wait until the new client subscribes (after current finction returns)
      setTimeout(() => {
        addPeerEventHandler(ctx, roomId);
        console.log(`User ${ctx.user?.login} joined the room ${roomId}`);
      });
      return withOnUnsubscribe(ctx.pubsub.asyncIterator(roomId), () => {
        removePeerEventHandler(ctx, roomId);
        console.log(`User ${ctx.user?.login} leaved the room ${roomId}`);
      });
    },
    resolve: (payload) => payload as ActionEvent,
  }),
);

export const broadcastWebRTCEvent = (ctx: GQLContext, event: ActionEvent) => {
  const roomEntry = Object.entries(rooms).find((e) =>
    e[1].find((u) => u.id === ctx.user?.id),
  ); // later can get from user

  if (roomEntry) {
    const roomId = roomEntry[0];
    ctx.pubsub.publish(roomId, event);
  }
};

const addPeerEventHandler = (ctx: GQLContext, roomId: string) => {
  const user = ctx.user;

  if (!rooms[roomId]) {
    rooms[roomId] = [];
  }

  if (user) {
    rooms[roomId].push(user);

    const to = rooms[roomId]
      .map((u) => u?.id)
      .filter((id) => id && id !== user.id);

    if (to.length !== 0) {
      broadcastWebRTCEvent(ctx, {
        actionType: ActionType.ADD_PEER,
        data: JSON.stringify({
          offerCreator: user.id,
          to,
        }),
      });
    }
  }
};

const removePeerEventHandler = (ctx: GQLContext, roomId: string) => {
  const user = ctx.user;

  if (user && rooms[roomId]) {
    broadcastWebRTCEvent(ctx, {
      actionType: ActionType.REMOVE_PEER,
      data: JSON.stringify({
        disconnected: user.id,
      }),
    });

    rooms[roomId] = rooms[roomId].filter((u) => u?.id !== ctx.user?.id);
  }
};
