import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import './index.css';

const Home = () => {

    return (
        <div className="home-container">
            <div className="mill-card">
                <img src="https://res.cloudinary.com/dxy5ohowd/image/upload/v1717069888/factory-1639990_640_nrrdow.jpg" alt="industry" className='industry-image'/>
                <h1>Hari Priya Fried Grams</h1>
                <p>Fried grams are roasted chickpeas, rich in protein and fiber, used as a nutritious snack or ingredient in various culinary applications, offering a crunchy texture and nutty flavor.</p>
                <p><IoLocationSharp/> Siddipet, Telangana</p>
                <Link to="/products">
                    <button type="button">Shop Now</button>
                </Link>
            </div>
            <div className="mill-card">
                <img src="https://res.cloudinary.com/dxy5ohowd/image/upload/v1717093886/How-Do-Factories-Cause-Air-Pollution__mh2bns.webp" alt="industry" className='industry-image'/>
                <h1>Sai Venkateshwara Industries</h1>
                <p>Fried grams are roasted chickpeas, rich in protein and fiber, used as a nutritious snack or ingredient in various culinary applications, offering a crunchy texture and nutty flavor.</p>
                <p><IoLocationSharp/> Siddipet, Telangana</p>
                <Link to="/murmura-products">
                    <button type="button">Shop Now</button>
                </Link>
            </div>
        </div>
    );
};

export default Home;
