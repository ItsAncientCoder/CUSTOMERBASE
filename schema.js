const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull,
} = require('graphql');

/*
//customers
const customers = [
    { id: '1', name: 'rajesh', email: 'rajesh@gmail.com', age: 25 },
    { id: '2', name: 'murthy', email: 'murthy@gmail.com', age: 35 },
    { id: '3', name: 'sreekanth', email: 'sreekanth@gmail.com', age: 45 }
];
*/

//Customer Type
const CustomerType = new GraphQLObjectType({
    name: 'Customer',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});


//Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        customer: {
            type: CustomerType,
            args: {
                id: { type: GraphQLString }
            },
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/customers/' + args.id)
                    .then(res => res.data);
            }
        },
        customers: {
            type: new GraphQLList(CustomerType),
            resolve(parentValue, args) {
                return axios.get('http://localhost:3000/customers')
                    .then(res => res.data);
            }
        },
        addCustomer: {
            type: CustomerType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                age: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parentValue, args) {
                return axios.post('http://localhost:3000/customers', {
                    name: args.name,
                    email: args.email,
                    age: args.age
                }).then(res => res.data);
            }
        },
        deleteCustomer: {
            type: CustomerType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parentValue, args) {
                return axios.delete('http://localhost:3000/customers/' + args.id)
                    .then(res => res.data);
            }
        },
        updateCustomer: {
            type: CustomerType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLString },
                email: { type: GraphQLString },
                age: { type: GraphQLInt }
            },
            resolve(parentValue, args) {
                return axios.patch('http://localhost:3000/customers/' + args.id, args)
                    .then(res => res.data);
            }
        },
        hello: {
            type: GraphQLString,
            resolve(parentValue, args) {
                return 'Hello world!';
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});