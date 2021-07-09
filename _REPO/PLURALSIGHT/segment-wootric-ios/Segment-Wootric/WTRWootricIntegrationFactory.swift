//
//  WTRWootricIntegrationFactory.swift
//  Segment-Wootric
//
//  Created by Dev Team on 2/3/16.
//  Copyright © 2016 Wootric. All rights reserved.
//

import Foundation
import Analytics

public class WTRWootricIntegrationFactory: NSObject, SEGIntegrationFactory {
    
    private static let sharedInstance = WTRWootricIntegrationFactory()
    
    public static func instance() -> WTRWootricIntegrationFactory {
        return sharedInstance
    }
    
    public func createWithSettings(settings: [NSObject : AnyObject]!, forAnalytics analytics: SEGAnalytics!) -> SEGIntegration! {
        guard let settings = settings as? WTRWootricIntegration.Settings else {
            return WTRWootricIntegration(settings: [:])
        }
        
        return WTRWootricIntegration(settings: settings)
    }
    
    public func key() -> String {
        return "Wootric"
    }
    
}