import "./CorpusDropdown.css";
import Dropdown from "react-bootstrap/Dropdown";
import Tooltip from 'react-bootstrap/Tooltip';
import CircleButton from "../CircleButton/CircleButton";
import testdata from '../../services/testdata.json';
import { useContext, useEffect, useState } from "react";
import ChosenCorporas from "../ChosenCorporasButton/ChosenCorporasButton";
import CorporaContext from "../../services/CorporaContext.jsx";
import { CircleArrowRight, CircleArrowDown } from "lucide-react"

export default function CorpusDropDown({ colour, buttonLogo }) {
    const [selectedCorpora, setSelectedCorpora] = useState([]);
    const [expanded, setExpanded] = useState({});
    const { corporas, updateCorporas } = useContext(CorporaContext);

        const toggleExpanded = (title) => {
            setExpanded((prev) => ({
                ...prev,
                [title]: !prev[title],
            }));
        };


    const handleCorpusClick = (corpusId, event) => {
        event.stopPropagation(); 
        event.nativeEvent.stopImmediatePropagation(); 
        if (selectedCorpora.includes(corpusId)) {
            setSelectedCorpora(selectedCorpora.filter(c => c !== corpusId));
        } else {
            setSelectedCorpora([...selectedCorpora, corpusId]);
        }
    };

    const corpus_tip = (
        <Tooltip id="corpus_tooltip">
            <strong>Samlingar</strong>
        </Tooltip>
    );

    const renderCorpusSelector = (e) => {
        const title = e[0];
        const desc = e[1]?.swe || e[1] || '';
        const corpora = [];
        const subcorporaList = [];

        const testDict = {};

        if (e[2]) {
            Object.entries(e[2]).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    corpora.push(value[0]);
                    testDict[key] = value[0];
                } else {
                    corpora.push(value);
                    testDict[key] = value;
                }
            });
        }

        if (e[3]) {
            Object.values(e[3]).forEach((nested) => {
                Object.values(nested).forEach((sub) => {
                    const subId = crypto.randomUUID();
                    subcorporaList.push({
                        id: subId,
                        content: renderCorpusSelector(sub)
                    });
                });
            });
        }

        return (
            <>
                <Dropdown.Header 
                    onClick={() => toggleExpanded(title)} 
                    style={{ cursor: 'pointer' }}
                >
                    {expanded[title] ? <CircleArrowDown /> :  <CircleArrowRight />} {title}
                </Dropdown.Header>
        
                {expanded[title] && (
                    <>
                    {/*Kinda ugly with "No description displayed"?*/}
                        {desc !== "No description" && <div className="corpdesc px-3">{desc}</div>}
        
                        {Object.entries(testDict).map(([id, label]) => (
                            <Dropdown.Item
                                key={id}
                                onClick={(event) => handleCorpusClick(id, event)}
                                className="corpus__labels"
                                active={selectedCorpora.includes(id)}
                            >
                                {label}
                            </Dropdown.Item>
                        ))}
        
                        {subcorporaList.map(({id, content}) => (
                            <div key={id}>{content}</div>
                        ))}
                    </>
                )}
            </>
        );
        
    };

    useEffect(() => {
        console.log("Selected corpora: ", selectedCorpora);

        updateCorporas({
            ...corporas,
            corporas: selectedCorpora[0] //VET EJ HUR VI BYGGER URL QUERYN FÖR FLERA CORPUSAR.
        })
        console.log(corporas);
    }, [selectedCorpora]);

    return (
        <div className="corpus-dropdown-container">
       <ChosenCorporas
        selectedCorpora={selectedCorpora}
        onRemove={(corpusId) =>
            setSelectedCorpora((prev) => prev.filter((id) => id !== corpusId))
        }
        ></ChosenCorporas> 
        <Dropdown >
            <Dropdown.Toggle id="dropdown-basic">
                <CircleButton buttonColour={colour} buttonImage={buttonLogo} buttonToolTip={corpus_tip}/>
                {selectedCorpora.length > 0} {/* &&  ` ${selectedCorpora.length} valda`*/}
            </Dropdown.Toggle>

            <Dropdown.Menu id="dropdown-menu" className="dropdown-menu position-absolute start-50 translate-middle-x" 
                    style={{
                        top: "100%",
                        marginTop: "3rem",
                        minWidth: "250px"
                    }}>
                <div className="dropdown-header">
                    <button
                        className="btn btn-sm btn-light"
                        onClick={() => setSelectedCorpora([])}
                    >
                        Avmarkera alla
                    </button>
                </div>

                {Object.values(testdata).map((e, index) => renderCorpusSelector(e))}
            </Dropdown.Menu>
        </Dropdown>
        </div>
    );
}
