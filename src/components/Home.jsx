import { Link } from "react-router-dom";
import { useRef, useState } from 'react';
import configYaml from '../housing_laws/config.yaml';
import "./Home.css";

const ComboBox = ({ onChange }) => {
    const comboboxEl = useRef(null);
    let selectedTags = [];
    // Callback when new selection is made
    const comboBoxChanged = () => {
        const { current: { selectedItems } } = comboboxEl;
        selectedTags = selectedItems.map((item) => {
            return item.value;
        });
        if (onChange) {
            onChange(selectedTags);
        }
    };
    // Create unique list of defined tags
    const uniqTags = new Set();
    configYaml.forEach((config) => {
        const { tags } = config;
        if (tags) { uniqTags.add(...tags)}
    });
    const _items = Array.from(uniqTags).map((tag) => {
        return (
            <calcite-combobox-item
                key={tag}
                value={tag}
                heading={tag}
            />
        );
    });
    return (
        <calcite-combobox
            oncalciteComboboxChange={comboBoxChanged}
            placeholder="Filter by applicability"
            ref={comboboxEl}
        >
            {_items}
        </calcite-combobox>
    )
};

const Home = () => {
    const [selectedTags, setSelectedTags] = useState([]);
    const LawLinkCards = configYaml.map(({title, route, description, tags}) => {
        tags = tags ?? [];
        const hasMatch = selectedTags.length == 0 || tags.some(tag => selectedTags.includes(tag));
        return hasMatch ? (
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
        ) : null;
    });
    return(
        <div>
            <h1>Housing Law Library (draft)</h1>
            <section className="overview">
                <h2>Overview</h2>
                <p>
                    Hi brains mindless mortuis limbic cortex soulless creaturas optic nerve, 
                    imo evil braaiinns stalking monstra hypothalamus adventus resi 
                    hippocampus dentevil vultus brain comedat cerebella pitiutary gland 
                    viventium
                    
                </p>
            </section>
            <div className="filter">
                <ComboBox onChange={setSelectedTags} />
            </div>
            <div className="container">
                <calcite-card-group label="Housing Laws">
                    {LawLinkCards}
                </calcite-card-group>
            </div>
        </div>
    );
};

export default Home;