"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pubsub = void 0;
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const schema_1 = require("@graphql-tools/schema");
const http_1 = require("http");
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const schema_2 = require("./schema");
const resolvers_1 = __importDefault(require("./resolvers"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
exports.pubsub = new graphql_subscriptions_1.PubSub();
const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: schema_2.typeDefs, resolvers: resolvers_1.default });
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
// WebSocket server for subscriptions
const wsServer = new ws_1.WebSocketServer({
    server: httpServer,
    path: "/graphql",
});
// GraphQL over WebSocket
const serverCleanup = (0, ws_2.useServer)({
    schema,
    context: async () => {
        return { pubsub: exports.pubsub };
    },
}, wsServer);
// Apollo Server
const server = new server_1.ApolloServer({
    schema,
    plugins: [
        (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
        {
            async serverWillStart() {
                return {
                    async drainServer() {
                        await serverCleanup.dispose();
                    },
                };
            },
        },
    ],
});
async function start() {
    await server.start();
    app.use("/graphql", (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(server, {
        context: async ({ req }) => {
            const viewerId = req?.headers["x-player-id"] || null;
            return { viewerId, pubsub: exports.pubsub };
        },
    }));
    const PORT = 4000;
    httpServer.listen(PORT, () => {
        console.log(`🚀 Server running at: http://localhost:${PORT}/graphql`);
        console.log(`🔗 Subscriptions at: ws://localhost:${PORT}/graphql`);
    });
}
start().catch((err) => {
    console.error("Server start failed:", err);
    process.exit(1);
});
//# sourceMappingURL=index.js.map