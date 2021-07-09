//
//  WTRWootricIntegration.swift
//  Segment-Wootric
//
//  Created by Dev Team on 2/3/16.
//  Copyright © 2016 Wootric. All rights reserved.
//

import Foundation
import WootricSDK
import Analytics

public class WTRWootricIntegration: NSObject, SEGIntegration {
    
    public typealias Settings = [String: String]
    
    public static func showSurvey(inViewController viewController: UIViewController) {
        Wootric.showSurveyInViewController(viewController)
    }
    
    public init(settings: Settings) {
        let clientID = settings["clientId"]
        let clientSecret = settings["clientSecret"]
        let accountToken = settings["accountToken"]
        Wootric.configureWithClientID(clientID, clientSecret: clientSecret, accountToken: accountToken)
    }
    
    public func identify(payload: SEGIdentifyPayload?) {
        guard let payload = payload else {
            return
        }
        
        guard let traits = payload.traits as? Settings else {
            return
        }
        
        let email = traits["email"]
        let dateString = traits["createdAt"]
        var endUserProperties = traits
        let timestamp = WTRWootricUtils.timestamp(dateString)
        
        endUserProperties.removeValueForKey("email")
        endUserProperties.removeValueForKey("createdAt")
        Wootric.setEndUserEmail(email)
        Wootric.setEndUserCreatedAt(timestamp)
        Wootric.setEndUserProperties(endUserProperties)
    }
    
}