import { Link } from "react-router-dom";
import configYaml from '../housing_laws/config.yaml';
import "./Home.css";

const Home = () => {
    const LawLinkCards = configYaml.map(({title, route, description}) => {
        return (
            <calcite-card key={route} label={title}>
                <span slot="heading">
                    <Link to={`/laws/${route}`}>{title}</Link>
                </span>
                <p slot="description">{description}</p>
                <div slot="footer-end">
                    <calcite-chip value={`Go to ${title} page`} icon="link" scale="s">
                        <Link to={`/laws/${route}`}>View</Link>
                    </calcite-chip>
                </div>
            </calcite-card>
        )
    });
    return(
        <div>
            <h1>Housing Law Wiki (v1)</h1>
            <calcite-card-group label="Housing Laws">
                {LawLinkCards}
            </calcite-card-group>
        </div>
    );
};

export default Home;