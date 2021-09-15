// import BaseLayout from '../components/layout/BaseLayout'
// import BasePage from '../components/layout/BasePage'
// import withAuth from '../components/hoc/withAuth'

// import { getSecretData, getSecretDataServer } from '../actions/index'

import { Component } from "react";

class Secret extends Component {}

export default Secret;

// class Secret extends Component {
//     static async getInitialProps({req}) {
//         const pupp1 = 'Azaleah'
//         const sc2 = await getSecretData(req)

//         return { sc2 }
//     }

//     state = {
//         secretData: []
//     }

//     async componentDidMount() {
//         const secretData = await getSecretData()

//         this.setState({ secretData })
//     }

//     displaySecretData(){
//         const {secretData} = this.state;

//         if (secretData && secretData.length > 0) {
//             return secretData.map((data, index) => {
//                 return (
//                     <div key={index}>
//                         <p>{data.status}</p>
//                         <p>{data.message}</p>
//                     </div>
//                 )
//             })
//         }

//         return null;
//     }

//     render() {
//         return (
//             <BaseLayout {...this.props.auth}>
//                 <BasePage>
//                     <h1>I Love Puppies</h1>
//                 </BasePage>
//             </BaseLayout>
//         )
//     }
// }

// export default withAuth()(Secret)
