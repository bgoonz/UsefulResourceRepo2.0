//
//  DoctorTableVC.swift
//  FirebaseAnalyticsDemo
//
//  Created by Ashish Patel on 1/6/17.
//  Copyright © 2017 ashish.me. All rights reserved.
//

import UIKit
import FirebaseAnalytics

struct Doctors {
    static var doctorList: [String] = ["Dr. John Doe", "Dr. Jane Doe", "Dr. Anjali Doe"]
    static var doctorId: String? = ""
}

class DoctorTableVC: UIViewController {

    override func viewDidLoad() {
        super.viewDidLoad()
        
        //Set events
        FIRAnalytics.logEvent(withName: "viewedScreen", parameters: [
            "screen_name": "ViewController" as NSObject
            ])
        
        FIRAnalytics.logEvent(withName: "openedWebsite", parameters: [
            "content_type": "Website" as NSObject,
            "item_id": "visited_official_website" as NSObject
            ])
        
        FIRAnalytics.logEvent(withName: "sentEmail", parameters: [
            "email": "nitor@gmail.com" as NSObject,
            "content_type": "sedn_email_category" as NSObject,
            "item_id": "sendEmailAction" as NSObject
            ])
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}

extension DoctorTableVC: UITableViewDelegate, UITableViewDataSource {
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int{
        return Doctors.doctorList.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell{
        // Instantiate a cell
        let cell = UITableViewCell(style: .subtitle, reuseIdentifier: "ElementCell")
        
        // Adding the right informations
        cell.textLabel?.text = Doctors.doctorList[indexPath.row]
        
        // Returning the cell
        return cell
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        Doctors.doctorId = Doctors.doctorList[indexPath.row]
        if let resultController = self.storyboard!.instantiateViewController(withIdentifier: "PatientTableVC") as? PatientTableVC {
            self.navigationController?.pushViewController(resultController, animated: true)
        }
    }
    
}
