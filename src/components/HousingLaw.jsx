import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import { useState, useEffect } from 'react';

const HousingLaw = () => {
    const { law } = useParams();
    const [markdown, setMarkdown] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        import(`../housing_laws/${law}/readme.md`)
            .then((result) => {
                const { default: md } = result;
                setMarkdown(md);
            })
            .catch(() => {
                // Invalid route (no md file by that name)
                // Route back to root /
                navigate("/");
            });
    }, []);
    return (
        <div>
            <Markdown>
                {markdown}
            </Markdown>
        </div>
    );
};

export default HousingLaw;