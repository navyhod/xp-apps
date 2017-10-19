//TODO Remove GraphQLSchemaSynchronizer for Enonic XP 6.13
Java.type('com.enonic.xp.app.users.GraphQLSchemaSynchronizer').sync(__.toScriptValue(function() {
    var graphQl = require('/lib/graphql');
    var graphQlSchema = require('./schema');

    var schema = graphQl.createSchema(graphQlSchema);

    exports.post = function(req) {
        var body = JSON.parse(req.body);
        var operation = body.query || body.mutation;
        if (!operation) {
            throw new Error('`query` or `mutation` param is missing.');
        }
        var result = graphQl.execute(schema, operation, body.variables);
        return {
            contentType: 'application/json',
            body: result
        };
    };
}));

