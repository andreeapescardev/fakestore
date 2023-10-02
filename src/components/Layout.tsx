import React, {ReactNode} from 'react';
import Header from './Header';
import Footer from './Footer';
import '../App.css';

interface LayoutProps {
    children: ReactNode;
}

function Layout({children}: LayoutProps) {
    return (
        <div className="App">
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    );
}

export default Layout;
