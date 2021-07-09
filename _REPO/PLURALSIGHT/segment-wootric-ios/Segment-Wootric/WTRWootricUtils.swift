//
//  WTRWootricUtils.swift
//  Segment-Wootric
//
//  Created by Dev Team on 2/3/16.
//  Copyright © 2016 Wootric. All rights reserved.
//

import Foundation

public struct WTRWootricUtils {
    public static func timestamp(createdAt: String?) -> NSNumber? {
        guard let createdAt = createdAt else {
            return nil
        }
        
        let numberFormatter = NSNumberFormatter()
        numberFormatter.numberStyle = .DecimalStyle
        
        if let timestamp = numberFormatter.numberFromString(createdAt) {
            return timestamp
        }
        
        let dateFormatter = NSDateFormatter()
        dateFormatter.dateFormat = "yyyy-MM-dd'T'HH:mm:ssZ"
        
        guard let createdAtDate = dateFormatter.dateFromString(createdAt) else {
            return nil
        }
        
        return NSNumber(double: createdAtDate.timeIntervalSince1970)
    }
}