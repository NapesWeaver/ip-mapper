# IP Locator
A web application for mapping the location of Internet Protocol v4 addresses.

## Summary

Connection info is collected from navigator.connection

Uses Web RTC to get the private IP for the device running the browser.

If Location Access is allowed and the browser supports it, user location is obtained through navigator.geolocation.

IP Geolocation API is used to map the users public IP and for mapping searches.

The SHODAN web API is use for getting reverse-domain-names.

## Screenshots
### Landing Page

![Landing Page](images/screenshots/ip-mapper-start.jpg)

### Radial Searching

![Radial Searching](images/screenshots/ip-mapper-radial.jpg)

### Traceroute Searching

![Traceroute Searching](images/screenshots/ip-mapper-traceroute.jpg)

## Built With

HTML

CSS

JavaScript

jQuery

## Link to IP Mapper
- [IP Mapper](https://craigpounds.github.io/ip-mapper/)

## Acknowledgements
Brandon Hinshaw