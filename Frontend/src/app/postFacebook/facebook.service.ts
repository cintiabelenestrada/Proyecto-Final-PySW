import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FacebookService {

  constructor() { }
}
/* 
appId: 991305839326090
key-Secret: 5c06e5b1f79f73a4731630f9e372aa88
tokenAcces. EAAOFlmBqs4oBO37yQFv1zzwS69xbqsKvOPYXM8PtYunFUD8XjxSZCfWRbXZBpLky3Pmv4MclCS8y3BpdZB6o79Ff9wLlBn89BApmc0n5fqZAvbOk3zECxIk8yZBQspto3xknl9cwZCBs2Ctdv9ojZBZAzX9Yeo76rFh5kijTaJE0I4JHNhg36vnwdgMUcwa6P5ZC37yHDTQN8CVZBIPDbY12iS4PZAfO49caw2SygMZD

FB.api(
  '/me',
  'GET',
  {"fields":"id,name"},
  function(response) {
      // Insert your code here
  }
);

*/