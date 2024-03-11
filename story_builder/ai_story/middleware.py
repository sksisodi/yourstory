def simple_middleware(get_response):
    def middleware(request):
        print(f"Received request: {request.method} {request.path}")
        response = get_response(request)
        return response
    return middleware