from django.shortcuts import render,redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import employee
from .serializers import employeeSerializer
from rest_framework.decorators import api_view

# Create your views here.
# ----demo for class based approach------------
# class EmployeeView(APIView):
#     def get(self,request):
#         emp = employee.objects.all()
#         #serialize them
#         serialize = employeeSerializer(emp,many=True) #return multiple json data
#         #return JSON
#         return Response(serialize.data)

#----function based approach------------------------
# list all data

def home(request):
    return redirect("employeelist") #lets redirect root url to employee
@api_view(['GET'])
def EmployeeView(request):
    emp = employee.objects.order_by('-id')
    # serialize them
    serialize = employeeSerializer(emp,many=True) #return multiple json data
    #return JSON
    return Response(serialize.data)

#give detail of a single data
@api_view(['GET'])
def EmployeeDetail(request,pk):
    emp = employee.objects.get(id=pk)
    serialize = employeeSerializer(emp,many=False) #return single json data
    return Response(serialize.data)

#create new employee
@api_view(['POST'])
def EmployeeCreate(request):
    serializer = employeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


#update employee
@api_view(['PUT'])
def EmployeeUpdate(request,pk):
    emp = employee.objects.get(id=pk)
    serializer = employeeSerializer(emp,data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

#delete_employee
@api_view(['DELETE'])
def EmployeeDelete(request,pk):
    emp = employee.objects.get(id=pk)
    emp.delete()

    return Response("Item sucessfully deleted!!!")