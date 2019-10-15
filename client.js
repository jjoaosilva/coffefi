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

function main() {
    var client = new coffefi_proto.CoffeFi('localhost:50051',grpc.credentials.createInsecure());
    
    client.temperatureSensor(null, (err, response) => {
        console.log('Temperatura: ', response.temperature, 'º');
    });

    client.lamp({switch: true}, (err, response) => {
        console.log('A luz está ', response.power);
    });

    client.coffeMachine(null, (err, response) => {
        console.log('A máquina de café está ', response.status);
    });
}

main();