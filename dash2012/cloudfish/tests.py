"""
This file demonstrates writing tests using the unittest module. These will pass
when you run "manage.py test".

Replace this with more appropriate tests for your application.
"""

from django.test import TestCase, Client
from auth.models import Account
from cloudfish.models import Cloud
from cloudfish import CLOUD_RACKSPACE
from django.core.signing import BadSignature


class KeyEncriptiontest(TestCase):
    def test_encode_decode_auth_data(self):
        """
        Tests that the auth_data is correctly signed
        """
        account = Account(username='daltonmatos', password='mypassword')
        cloud = Cloud(type=CLOUD_RACKSPACE, account=account)

        auth_data = {'user': 'username', 'key': 'my_api_key'}

        _data = cloud.add_auth_data(salt='mypassword', **auth_data)
        self.assertEquals(_data, cloud.auth_data)
        self.assertRaises(BadSignature, cloud.decode_auth_data, salt='worng-salt')
        self.assertEquals(auth_data, cloud.decode_auth_data(salt='mypassword'))


class EmailValidationTest(TestCase):
    def test_unique_email(self):
        account = Account(email="my@email.com", password="mypassword")
        account.save()
        client = Client()
        response = client.post("/register", {"email": "my@email.com", "password": "mypassword", "confirm-password": "mypassword"})

        self.assertIn("This email is already in use.", response.content)