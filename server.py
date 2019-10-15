from concurrent import futures
import logging

import grpc

import coffefi_pb2
import coffefi_pb2_grpc

class CoffeFi(coffefi_pb2_grpc.CoffeFiServicer):

    def TemperatureSensor(self, request, context):
        return coffefi_pb2.Temperature(temperature=32)

    def Lamp(self, request, context):
        return coffefi_pb2.Power(power='ON' if request.switch else 'OFF')
    
    def CoffeMachine(self, request, context):
        return coffefi_pb2.Status(status='em espera')

def serve():
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    coffefi_pb2_grpc.add_CoffeFiServicer_to_server(CoffeFi(), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    server.wait_for_termination()


if __name__ == '__main__':
    logging.basicConfig()
    serve()