import React from 'react';
import Home from './pages/Home';
import Navbar from 'ashishdotme-ui/components/navbar';
import Footer from 'ashishdotme-ui/components/footer';

const App = () => {
    return (
        <div>
            <Navbar className="bg-blue" />
            <section className="has-background-link-light hero is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns">
                            <div className="column is-half is-offset-one-quarter">
                                <Home />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default App;
