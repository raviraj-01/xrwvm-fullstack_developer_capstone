
from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.contrib import messages
from datetime import datetime
from django.contrib.auth.models import User
from django.contrib.auth import logout, login, authenticate
import logging
import json
from django.views.decorators.csrf import csrf_exempt

# Get an instance of a logger
logger = logging.getLogger(__name__)


@csrf_exempt
def login_user(request):
    # Get username and password from request.POST dictionary
    data = json.loads(request.body)

    username = data['userName']
    password = data['password']

    # Check if provided credentials can be authenticated
    user = authenticate(username=username, password=password)

    data = {"userName": username}

    if user is not None:
        # Login current user
        login(request, user)
        data = {
            "userName": username,
            "status": "Authenticated"
        }

    return JsonResponse(data)


# Handle sign out request
def logout_request(request):
    logout(request)
    data = {"userName": ""}
    return JsonResponse(data)


# Handle sign up request
@csrf_exempt
def registration(request):
    data = json.loads(request.body)

    username = data['userName']
    password = data['password']
    first_name = data['firstName']
    last_name = data['lastName']
    email = data['email']

    username_exist = False

    try:
        User.objects.get(username=username)
        username_exist = True
    except User.DoesNotExist:
        logger.debug("{} is new user".format(username))

    if not username_exist:
        user = User.objects.create_user(
            username=username,
            first_name=first_name,
            last_name=last_name,
            password=password,
            email=email,
        )

        login(request, user)

        data = {
            "userName": username,
            "status": "Authenticated"
        }

        return JsonResponse(data)

    else:
        data = {
            "userName": username,
            "error": "Already Registered"
        }

        return JsonResponse(data)
