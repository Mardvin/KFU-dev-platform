import asyncio

from django.http import JsonResponse
from django.shortcuts import render

from kfu_dev_platform.service.task_tracker.task_tracker import get_issues


def home(request):
    return render(request, 'home.html')


def issues_view(request):
    issues = asyncio.run(get_issues())
    return JsonResponse({'issues': [issue for issue in issues]})



