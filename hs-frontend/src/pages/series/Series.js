import MyNavbar from '../../components/Navbar';
import NetflixContent from '../../components/NetflixContent';
import PrimeContent from '../../components/PrimeContent';

const Series = () => {
    return (
        <>
            <div className="home">
                    <MyNavbar /> 
                    <div id='content-container'>
                        <h1 className='text-highstreaming'>
                            Netflix
                        </h1>
                        <NetflixContent/>
                        <h1 className='text-highstreaming'>
                            Amazon Prime
                        </h1>
                        <PrimeContent/>
                    </div>
                </div>
        </>
        
    );
}

export default Series;