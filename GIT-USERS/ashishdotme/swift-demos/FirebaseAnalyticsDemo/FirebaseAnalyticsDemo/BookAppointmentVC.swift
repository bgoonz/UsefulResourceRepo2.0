//
//  BookAppointmentVC.swift
//  FirebaseAnalyticsDemo
//
//  Created by Ashish Patel on 1/6/17.
//  Copyright © 2017 ashish.me. All rights reserved.
//

import UIKit
import FirebaseDatabase

class BookAppointmentVC: UIViewController {

    @IBOutlet weak var diseaseTextField: UITextField!
    @IBOutlet weak var ageTextField: UITextField!
    @IBOutlet weak var nameTextField: UITextField!
    @IBOutlet weak var doctorListPicker: UIPickerView!
    var doctorSelected: String? = ""
    var ref: FIRDatabaseReference!
    var bookedDate: String? = ""

    override func viewDidLoad() {
        super.viewDidLoad()
        
        //set picker
        doctorListPicker.delegate = self
        doctorListPicker.dataSource = self
        doctorSelected = Doctors.doctorList[0]
        bookedDate = Date().simpleDateKey()
        //firebase ref
        ref = FIRDatabase.database().reference()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
        
    }
    
    
    @IBAction func bookAddBtnClick(_ sender: AnyObject) {
        let name = nameTextField.text
        let age = ageTextField.text
        let disease = diseaseTextField.text
        let bookingDate: String? = bookedDate
        let details: Dictionary = ["name":name!, "age":age!, "disease":disease!, "bookingDate": bookingDate!]
        self.ref.child("appointments").child("\(doctorSelected!.toBase64())").child(name!.toBase64()).setValue(details) { (error, ref) -> Void in
            let alertController = UIAlertController(title: "Success", message: "Added patient data successfully", preferredStyle: .alert)
            let action = UIAlertAction(title: "Done", style: .default, handler: nil)
            alertController.addAction(action)
            self.present(alertController, animated: true, completion: nil)
        }
    }

    @IBAction func bookingDateChanged(_ sender: UIDatePicker) {
        bookedDate = sender.date.simpleDateKey()
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

extension BookAppointmentVC: UIPickerViewDelegate, UIPickerViewDataSource {
    
    // The number of columns of data
    func numberOfComponents(in pickerView: UIPickerView) -> Int {
        return 1
    }
    
    // The number of rows of data
    func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int {
        return Doctors.doctorList.count
    }
    
    // The data to return for the row and component (column) that's being passed in
    func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
        return Doctors.doctorList[row]
    }
    
    func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
        doctorSelected = Doctors.doctorList[row]
    }

}

extension String {
    
    func fromBase64() -> String? {
        guard let data = Data(base64Encoded: self) else {
            return nil
        }
        
        return String(data: data, encoding: .utf8)
    }
    
    func toBase64() -> String {
        return Data(self.utf8).base64EncodedString()
    }
}
