import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState, useEffect } from 'react';
import 'github-markdown-css';

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
        <div className="markdown-body">
            <Markdown remarkPlugins={[remarkGfm]}>
                {markdown}
            </Markdown>
        </div>
    );
};

export default HousingLaw;