import { useParams, useNavigate } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useState, useEffect } from 'react';
import 'github-markdown-css';
import "./HousingLaw.css";

const QuestionsAnswers = ({ items }) => {
    const accordionItems = items.map(({ question, answer, html }, index) => (
        <calcite-accordion-item heading={question} icon-start="question" key={index}>
            <calcite-notice open>
            {
                html ?
                    <div slot="message"dangerouslySetInnerHTML={{ __html: answer }}/>
                    :
                    <div slot="message">{answer}</div>

            }
            </calcite-notice>
        </calcite-accordion-item>
    ))
    return (
        <calcite-accordion selection-mode="single">
            {accordionItems}
        </calcite-accordion>
    )
}

const HousingLaw = () => {
    const { law } = useParams();
    const [markdown, setMarkdown] = useState();
    const [qa, setQa] = useState();
    const navigate = useNavigate();
    useEffect(() => {
        import(`../housing_laws/${law}/readme.md`)
            .then((result) => {
                const { default: md } = result;
                setMarkdown(md);
            })
            .catch(() => {
                navigate("/");
            });
        import(`../housing_laws/${law}/qa.yaml`)
            .then((result) => {
                const { default: yaml } = result;
                setQa(yaml);
            })
            .catch(() => {
                console.warn(`no qa config found for ${law}`);
            });
    }, []);
    return (
        <div className="markdown-body">
            <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {markdown}
            </Markdown>
	    	<h2>Questions and Answers</h2>
            {qa && (
                <details>
                    <summary>View FAQs</summary>
                    <QuestionsAnswers items={qa} />
                </details>
            )}
        </div>
    );
};

export default HousingLaw;
