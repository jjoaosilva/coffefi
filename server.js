var PROTO_PATH = __dirname + '/protos/coffefi.proto';

var grpc = require('grpc');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});
var coffefi_proto = grpc.loadPackageDefinition(packageDefinition).coffefi;

/**
* Implements the RPC methods.
*/
function temperatureSensor(call, callback) {
    callback(null, {temperature: 32});
}

function lamp(call, callback) {
    callback(null, {power: call.request.switch ? 'ON' : 'OFF'});
}

function coffeMachine(call, callback) {
    callback(null, {status: "EM ESPERA"});
}
/**
* Starts an RPC server that receives requests for the Greeter service at the
* sample server port
*/
function main() {
    var server = new grpc.Server();
    server.addService(coffefi_proto.CoffeFi.service, {
        temperatureSensor: temperatureSensor,
        lamp: lamp,
        coffeMachine: coffeMachine
    });
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}

main();