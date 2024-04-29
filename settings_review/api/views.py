from django.http import JsonResponse
from django.views import View
from settings_review.models import *
from .serializer import *
import io
from rest_framework.parsers import JSONParser
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.db import connection

@method_decorator(csrf_exempt,name='dispatch')
class PreviewApi(View):
    def get(self,request):
        preview = Preview.objects.all()
        s = PreviewSerializer(preview,many=True)
        return JsonResponse({'preview_id':s.data})
    
    def post(self,request,*args, **kwargs):
        json_data = request.body
        stream = io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        Preview.objects.all().delete()
        sequence_name = f"{Preview._meta.db_table}_id_seq"
        with connection.cursor() as cursor:
            cursor.execute(f"ALTER SEQUENCE {sequence_name} RESTART WITH 1;")
        serializer = PreviewSerializer(data=python_data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'preview_id':serializer.data})

        return JsonResponse({'error':serializer.data})

    def patch(self,request,*args, **kwargs):
        json_data = request.body
        stream = io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        s_id = Preview.objects.get(id=1)
        s = PreviewSerializer(s_id,data=python_data,partial=True)
        if s.is_valid():
            s.save()
            return JsonResponse({'messsage': s.data})
        return JsonResponse({'error':s.data})

@method_decorator(csrf_exempt,name='dispatch')
class SettingsApi(View):
    def get(self,request):
        settings = SettingsPreview.objects.all()
        s = SettingsSerializer(settings,many=True)
        return JsonResponse({'settings_data':s.data})
    
    def post(self,request,*args, **kwargs):
        json_data = request.body
        stream = io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        SettingsPreview.objects.all().delete()
        sequence_name = f"{SettingsPreview._meta.db_table}_id_seq"
        with connection.cursor() as cursor:
            cursor.execute(f"ALTER SEQUENCE {sequence_name} RESTART WITH 1;")
        serializer = SettingsSerializer(data=python_data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse({'settings_data':serializer.data})

        return JsonResponse({'error':serializer.data})

    def patch(self,request,*args, **kwargs):
        json_data = request.body
        stream = io.BytesIO(json_data)
        python_data = JSONParser().parse(stream)
        s_id = SettingsPreview.objects.get(id=1)
        s = SettingsSerializer(s_id,data=python_data,partial=True)
        if s.is_valid():
            s.save()
            return JsonResponse({'settings_data': s.data})
        return JsonResponse({'error':s.errors})


