import './Films.css';
import MyNavbar from '../../components/navbar/Navbar'
import NetflixContent from '../../components/films/NetflixContent';
import PrimeContent from '../../components/films/PrimeContent';


const Films = () => {
    return (
        <>
            <div className="home">
                <MyNavbar /> 
                <div id='content-container'>
                    {/* TODO: implement content fetch from server and loading */}
                    <h1 className='text-highstreaming-netflix'>
                        Netflix
                    </h1>
                    <NetflixContent/>
                    <h1 className='text-highstreaming-prime'>
                        Amazon Prime
                    </h1>
                    <PrimeContent/>
                </div>
            </div>
        </>
        
    );
}

export default Films;