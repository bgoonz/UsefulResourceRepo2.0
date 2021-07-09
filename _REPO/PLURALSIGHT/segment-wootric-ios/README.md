Wootric integration for analytics-ios.

## Installation

Segment-Wootric is available through [CocoaPods](http://cocoapods.org). To install
it, simply add the following line to your `Podfile`:

```ruby
pod "Segment-Wootric"
```

## Usage

(It is advised to read [WootricSDK docs](https://github.com/Wootric/WootricSDK-iOS) first.)

First of all you need to provide values for account token, clientID and client secret in Segment's dashboard for Wootric integration, then import Segment-Wootric:

```objective-c
#import <SegmentWootric/SegmentWootric.h>
```

you can now init the Analytics with Wootric integration:

```objective-c
SEGAnalyticsConfiguration *config = [SEGAnalyticsConfiguration configurationWithWriteKey:@"YOUR_WRITE_KEY"];
WTRWootricIntegrationFactory *wootricFactory = [WTRWootricIntegrationFactory instance];
[config use:wootricFactory];
[SEGAnalytics setupWithConfiguration:config];
```

Wootric integration responds to ```identify``` call, to read more about it, visit [Segment identify method documentation](https://segment.com/docs/libraries/ios/#identify).
In identify call ```traits``` dictionary is set as ```endUserProperties``` in WootricSDK,  except keys ```email``` and ```createdAt``` which are set as ```endUserEmail``` and ```endUserCreatedAt``` respectively.

For custom configuration you can use ```SEGWootric``` class instance, to get it, call:
```objectivec
[WTRWootricIntegration wootric];
```
For all available methods (being instace methods for SEGWootric instead of class methods) please refer to WootricSDK [docs](https://github.com/Wootric/WootricSDK-iOS).

Finally to show the survey:

```objectivec
[WTRWootricIntegration showSurveyInViewController:<VIEW_CONTROLLER>];
```

## License

```
The MIT License (MIT)

Copyright (c) 2015 Wootric

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

