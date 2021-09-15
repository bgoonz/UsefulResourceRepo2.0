//
//  ViewController.swift
//  LocalNotificationDemo
//
//  Created by Ashish Patel on 1/2/17.
//  Copyright © 2017 ashish.me. All rights reserved.
//

import UIKit
import UserNotifications

class ViewController: UIViewController {
    let center = UNUserNotificationCenter.current()
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        let options: UNAuthorizationOptions = [.alert, .sound];
        center.requestAuthorization(options: options) {
            (granted, error) in
            if !granted {
                print("Something went wrong")
            }
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func notifyMeBtnClick(_ sender: Any) {
        let content = UNMutableNotificationContent()
        content.title = "ashish.me"
        content.body = "Today is Ashish's birthday"
        content.sound = UNNotificationSound.default()
        let trigger = UNTimeIntervalNotificationTrigger(timeInterval: 10, repeats: false)
        let identifier = "UYLLocalNotification"
        let request = UNNotificationRequest(identifier: identifier,
                                            content: content, trigger: trigger)
        center.add(request, withCompletionHandler: { (error) in
            if let error = error {
                // Something went wrong
                print(error)
            }
        })

    }

}

