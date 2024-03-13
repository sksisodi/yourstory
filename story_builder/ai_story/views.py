from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
import openai
import os
from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return render(request, 'index.html')

@csrf_exempt
@require_http_methods(["POST"])
def generate_story(request):
    # Load your API key from an environment variable or Django settings
    openai.api_key = os.getenv('API_KEY')
    print(os.getenv('API_KEY'))

    # data = json.loads(request.body)
    # prompt = data.get('prompt', '')

    # if request.method == 'OPTIONS':
    #     # Respond to the OPTIONS preflight with appropriate headers
    #     response = JsonResponse({'message': 'OPTIONS request allowed'})
    #     response['Access-Control-Allow-Origin'] = '*'
    #     response['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
    #     response['Access-Control-Allow-Headers'] = 'Content-Type'
    #     return response
    # elif  request.method == 'POST':
    #     try:
    #         response = openai.chat.completions.create(
    #           model="gpt-3.5-turbo",
    #                 messages=[
    #                     {"role": "system", "content": "You are a story writer."},
    #                       {"role": "user", "content": prompt}
    #                 ],
    #                 temperature=0.7  # You can adjust this as needed
    #             )
    #         print("Response type:", type(response))

    #         gpt_response = response.choices[0].message.content

    #         return JsonResponse({'message': 'Text received successfully', 'gpt_response': gpt_response})
    #     except Exception as e:
    #         return JsonResponse({'error': str(e)}, status=500)
    # else:
    #     return JsonResponse({'error': 'This method is not allowed'}, status=405)
    return JsonResponse({})