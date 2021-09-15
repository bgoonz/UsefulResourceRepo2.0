import React from 'react';
import './folder.css';

const Headers = ({ titles, currentTab, selectTab }) => {



    const handleClick = (e) => {
        const idx = parseInt(e.target.id, 10);

        selectTab(idx);
    }

    const tabs = titles.map((title, idx) => {
        const headerClass = (idx === currentTab) ? 'active' : '';
        return (

            <li key={idx} id={idx} className={headerClass} onClick={handleClick}>
                {title}
            </li>
        );
    });

    return (
        <ul className='tab-header'>
            {tabs}
        </ul>
    );
}


class Folder extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            currentTab: 0,
            selectTab: 0
        }

    }

    selectTab = (idx) => {
        console.log(idx);
        this.setState( { currentTab: idx} );
    }


    render () {
        const folder = this.props.folders[this.state.currentTab];
        const titles = this.props.folders.map( (folder) => { return folder.title });
        return (
            <div>
                <h1>Folder</h1>
                    <div className='tabs'>
                        {/* TODO: render folder titles  */}
                        <Headers
                            titles={titles}
                            currentTab={this.state.currentTab}
                            selectTab={this.selectTab}/>
                        <div className='tab-content'>
                            {folder.content}
                        </div>
                    </div>
            </div>
        );
    };
};

Folder.defaultProps = {

}
export default Folder;
