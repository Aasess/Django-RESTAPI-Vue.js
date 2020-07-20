from django.shortcuts import render,redirect
from rest_framework.response import Response
from .models import TODO
from .serializers import TODOSerializer
from rest_framework.decorators import api_view

#----function based approach------------------------
# list all data
@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'List all Todo' : 'api/todo/',
        'Detail of Todo' : 'api/todo/<int:pk>',
        'Create new todo':'api/todo/create',
        'Update todo':'api/todo/<int:pk>/update',
        'Delete todo':'api/todo/<int:pk>/delete'
    }
    return Response(api_urls)



#listtodo
@api_view(['GET'])
def TODOView(request):
    todo = TODO.objects.all().order_by('-id')
    # serialize them
    serialize = TODOSerializer(todo,many=True) #return multiple json data
    #return JSON
    return Response(serialize.data)

#give detail of a single data
@api_view(['GET'])
def TODODetail(request,pk):
    todo = TODO.objects.get(id=pk)
    serialize = TODOSerializer(todo,many=False) #return single json data
    return Response(serialize.data)

#create newtodo
@api_view(['POST'])
def TODOCreate(request):
    serializer = TODOSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


#updatetodo
@api_view(['PUT'])
def TODOUpdate(request,pk):
    todo = TODO.objects.get(id=pk)
    serializer = TODOSerializer(todo,data=request.data)

    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

#deletetodo
@api_view(['DELETE'])
def TODODelete(request,pk):
    todo = TODO.objects.get(id=pk)
    todo.delete()

    return Response("Item sucessfully deleted!!!")