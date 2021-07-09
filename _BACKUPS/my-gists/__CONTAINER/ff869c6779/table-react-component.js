import { Component } from "react"
import './Table.css';

class TableComponent extends Component{
    render(){
        return(
            <div>
                <table>
                    <tr>
                        <th>Company</th>
                        <th>Contact</th>
                        <th>Country</th>
                    </tr>
                    <tr>
                        <td>Dell</td>
                        <td>Abhi Agarwal</td>
                        <td>India</td>
                    </tr>
                    <tr>
                        <td>Accenture</td>
                        <td>Abhishek Singh</td>
                        <td>India</td>
                    </tr>
                    <tr>
                        <td>Ericsson</td>
                        <td>Abhishek Patel</td>
                        <td>India</td>
                    </tr>
                    <tr>
                        <td>Uber</td>
                        <td>Sukesh Kumar</td>
                        <td>US</td>
                    </tr>
                    <tr>
                        <td>Zomato</td>
                        <td>Anant Gupta</td>
                        <td>India</td>
                    </tr>
                    <tr>
                        <td>TCS</td>
                        <td>Ankit Jitani</td>
                        <td>US</td>
                    </tr>
                </table>
            </div>
        );
    }
}


export default TableComponent;