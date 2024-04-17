from rest_framework.response import Response
from rest_framework import status
from rest_framework import views
from .serializers import *
from show_review.models import *

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