# IP Locator
A web application for displaying basic user network information and for mapping physical location of Internet Protocol version 4 addresses.

## Summary

If supported by the browser, the [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API) is used to collect basic user network connection information from the Navigator.connection property.

Uses [WebRTC API](https://webrtc.org/) to get the private IP for the device running the browser.

If Location Access is allowed and the browser supports it, user location is obtained through the [Geolocation API's](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/geolocation) Navigator.geolocation property.

[IP API](https://ipapi.co/api/#introduction) is used to map the users public IP and for mapping searches.

The [SHODAN API](https://developer.shodan.io/) is used for getting reverse-domain-names.

Mapping is accomplished via [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial).

## Screenshots
### Landing Page

![Landing Page](images/screenshots/ip-mapper-start.jpg)

### Radial Searching

![Radial Searching](images/screenshots/ip-mapper-radial.jpg)

### Traceroute Searching

![Traceroute Searching](images/screenshots/ip-mapper-traceroute.jpg)

## Built With

* HTML

* CSS

* JavaScript

* jQuery

## Example Input Test Data
```
1.1.1.1
1.2.3.4
8.8.8.8
91.121.134.23
104.25.209.99
205.134.192.90
216.117.2.180
```

## Link to IP Mapper
- [IP Mapper](https://craigpounds.github.io/ip-mapper/)

## Acknowledgements
Brandon Hinshaw