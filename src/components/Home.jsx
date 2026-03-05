import { Link } from "react-router-dom";
import configYaml from '../housing_laws/config.yaml';

const Home = () => {
    const LawLinks = configYaml.map(({title, route}) => {
        console.log(title, route)
        return (
            <Link key={route} to={`/laws/${route}`}>{title}</Link>
        )
    });
    return(
        <div>
            <h1>Housing Law Wiki</h1>
            <nav>
                {LawLinks}
                {/* <Link to="/laws/accessory_dwelling_unit">Accessory Dwelling Unit</Link> */}
            </nav>
        </div>
    );
};

export default Home;