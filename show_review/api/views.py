from rest_framework.response import Response
from rest_framework import status
from rest_framework import views
from .serializers import *
from show_review.models import *

from django.views import View
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import io
from rest_framework.parsers import JSONParser
from django.http import JsonResponse

class ReviewApi(views.APIView):
    def get(self,request):
        company = CompanyName.objects.all()
        serializer = CompanyNameSerializer(company,many=True)
        review = Reviews.objects.all()
        s = ReviewSerializer(review,many=True)
        review_data = {
            "comapany" : serializer.data,
            "reviews" : s.data
        }
        return Response(review_data,status=status.HTTP_202_ACCEPTED)

@method_decorator(csrf_exempt,name='dispatch')
class SearchDataApi(View):
    def post(self,request,*args, **kwargs):
        json_data = request.body
        stream = io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        serializer = SearchDataSerializer(data=python_data)

        if serializer.is_valid():
            print(5)  #replace with the function
            response = {
                'title' : python_data,
                'status' : status.HTTP_302_FOUND
            }
            return JsonResponse(response,safe=False)
        return JsonResponse(serializer.errors,safe=False)