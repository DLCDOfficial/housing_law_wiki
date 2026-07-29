import { Link } from "react-router-dom";
import { useRef, useState } from 'react';
import Markdown from 'react-markdown';
import configYaml from '../housing_laws/config.yaml';
import appYaml from '../app.yaml';
import "./Home.css";

const ComboBox = ({ onChange }) => {
    const comboboxEl = useRef(null);
    let selectedTags = [];
    // Callback when new selection is made
    const comboBoxChanged = () => {
        let { current: { selectedItems } } = comboboxEl;
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
    const LawLinkCards = configYaml.map(({title, route, description, development, tags}) => {
        tags = tags ?? [];
        const hasMatch = selectedTags.length == 0 || tags.some(tag => selectedTags.includes(tag));
        return hasMatch ? (
            <calcite-card key={route} label={title}>
                <span slot="heading">
                    {/* If the card is in development, don't link */}
                    {
                        development ?
                            title 
                            :
                            <Link to={`/laws/${route}`}>{title}</Link>
                    }
                </span>
                <p slot="description">
                    {description}
                    {
                        !development &&
                        <p>
                            <details>
                                <summary>applicability</summary>
                                <ul>
                                    {tags.map((tag) => {
                                        return <li>{tag}</li>
                                    })}
                                </ul>
                            </details>

                        </p>
                    }
                </p>

                <div slot="footer-end">
                    {
                        development ?
                            <calcite-chip value={`Go to ${title} page`} icon="wrench" scale="s">
                                Page in development
                            </calcite-chip>
                            :
                            <calcite-chip value={`Go to ${title} page`} icon="link" scale="s">
                                <Link to={`/laws/${route}`}>View</Link>
                            </calcite-chip>
                    }
                </div>
            </calcite-card>
        ) : null;
    });
    return(
        <div>
            <h1>{appYaml.title}</h1>
            <section className="overview">
                <h2>Overview</h2>
                <p>
                    <Markdown>
                        {appYaml.description}
                    </Markdown>
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