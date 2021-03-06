from django.http import HttpResponseRedirect
from django.shortcuts import render
from django.core.urlresolvers import reverse
from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from cloudfish.models import Cloud
from auth.models import Account


def login(r):
    c = {}
    if r.POST:
        username = r.POST['username']
        password = r.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            auth_login(r, user)
            if not Cloud.objects.filter(account=user).exists():
                r.session['passwd'] = password
                return HttpResponseRedirect(reverse('connect-view'))
            # If we have at least one cloud, put its data in the user session.
            r.session['clouds'] = {}

            account = Account.objects.filter(id=user.id)
            connected_clouds = Cloud.objects.filter(account=account)
            for cloud in connected_clouds:
                r.session['clouds'][cloud.type] = cloud.decode_auth_data(salt=password)

            r.session.modified = True
            return HttpResponseRedirect(reverse('myservers-view'))

        else:
            c['errors'] = "Login failed, please try again"

    return render(r, 'auth.html', c)


def logout(request):
    auth_logout(request)
    return HttpResponseRedirect(reverse('index-view'))

