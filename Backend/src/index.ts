import { GraphQLServer, PubSub } from 'graphql-yoga';
import connection from './ormConfig';
import schema from './schema';

// const typeDefs = `
//     type Query{
//         sayHello : String!
//     }
// `;

// // 인자값과 리턴되는 값의 타입을 지정

// const resolvers = {
// 	Query: {
// 		sayHello: () => 'Hi there ㅇㅅㅇa'
// 	}
// };
// // 함수의 비즈니스 로직이 실제로 들어가는 부분

const pubSub = new PubSub();
const server = new GraphQLServer({ schema, context: { pubSub } });

connection.then(() => server.start(() => console.log('Hello GraphQL server')));
