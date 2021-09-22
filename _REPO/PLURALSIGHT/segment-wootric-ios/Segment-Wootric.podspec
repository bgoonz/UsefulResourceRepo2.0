Pod::Spec.new do |s|
  s.name             = "Segment-Wootric"
  s.module_name      = "SegmentWootric"
  s.version          = "0.1.5"
  s.summary          = "Wootric integration for Segment's analytics-ios library."

  s.description      = <<-DESC
                       This is the Wootric integration for the iOS Analytics library.
                       DESC

  s.homepage         = "https://www.wootric.com"
  s.license          = { :type => 'MIT', :file => 'LICENSE.md' }
  s.author           = { "Łukasz Cichecki" => "lukasz@copper.io" }
  s.source           = { :git => "https://github.com/Wootric/segment-wootric-ios.git", :tag => s.version.to_s }

  s.platform     = :ios, '8.0'
  s.requires_arc = true

  s.source_files = 'Segment-Wootric/*.{h,m,swift}'
  s.public_header_files = 'Segment-Wootric/SegmentWootric.h'

  s.dependency 'Analytics', '~> 3.0.1-alpha'
  s.dependency 'WootricSDK'
end
