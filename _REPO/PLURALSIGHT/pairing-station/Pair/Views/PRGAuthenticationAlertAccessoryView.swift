//
//  PRGAuthenticationAlertAccessoryView.swift
//  Pair
//
//  Created by Dev Team on 6/4/15.
//  Copyright (c) 2015 Button. All rights reserved.
//

import Cocoa
import AppKit

class PRGAuthenticationAlertAccessoryView: NSView {

    @IBOutlet weak var emailField: NSTextField!
    @IBOutlet weak var passwordField: NSTextField!
    @IBOutlet weak var twoFactorField: NSTextField!
    
    @IBAction func twoFactorClicked(sender: NSView) {
        sender.hidden = true
        twoFactorField.hidden = false
        twoFactorField.becomeFirstResponder()
    }
}
