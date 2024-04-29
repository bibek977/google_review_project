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

from google_review_project.scraping_app.test import *
from google_review_project.scraping_app.company import Company

import time
from settings_review.models import *

from google_review_project.celery import fetch_review,fetch_review_all,fetch_search_place

class ReviewApi(views.APIView):
    def get(self,request):
        company = CompanyName.objects.all()
        serializer = CompanyNameSerializer(company,many=True)
        review = Reviews.objects.all()
        s = ReviewSerializer(review,many=True)
        review_data = {
            "company" : serializer.data,
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
            url = "https://www.google.com/maps/@27.6879306,85.3226581,14z?hl=en&entry=ttu"
            d = Driver(url=url)
            # data = d.get_search(python_data['title'])
            title = python_data['title']
            data = fetch_search_place(d,title)

            response = {
                'results' : data,
                'status' : status.HTTP_302_FOUND
            }
            return JsonResponse(response,safe=False)
        return JsonResponse(serializer.errors,safe=False)

@method_decorator(csrf_exempt,name='dispatch')
class SearchComapanyApi(View):
    def post(self,request,*args, **kwargs):
        json_data = request.body
        stream = io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        serializer = SearchCompanySerializer(data=python_data)

        if serializer.is_valid():
            c = Company(url=python_data['link'])
            old_company = CompanyName.objects.filter(company = c.getName()).delete()
            # company_details = {
            #     'image' : c.getPhoto(),
            #     'company' : c.getName(),
            #     'rating' : c.getRating(),
            #     'reviews' : c.getReviews(),
            #     'details' : c.getOfficeData()
            # }
            company_details = fetch_review(c)
            s = CompanyNameSerializer(data=company_details)
            if s.is_valid():
                s.save()
            time.sleep(5)
            company_id = CompanyName.objects.get(company = c.getName()).id
            # review_all = c.reviewRelevant(company_id)
            review_all = fetch_review_all(c,company_id)
            r = ReviewSerializer(data=review_all,many=True)
            c.quit()
            if r.is_valid():
                r.save()
            response = {
                'results' : s.data,
                'data' : r.data,
                'status' : status.HTTP_302_FOUND
            }
            return JsonResponse(response,safe=False)
        return JsonResponse(serializer.errors,safe=False)

class DisconnectCompanyApi(View):
    def get(self,request,*args, **kwargs):
        CompanyName.objects.all().delete()
        Preview.objects.all().delete()
        SettingsPreview.objects.all().delete()
        return JsonResponse({'message':"disconnected"},safe=False)