import { Form, Button } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { Moon, Sun } from "react-bootstrap-icons";
import { Modal } from "react-bootstrap";
import SettingsContext from "../../services/SettingsContext.jsx";
import ToggleAPI from "../ToggleAPI/ToggleAPI.jsx"

import "./SettingsCard.css";

export default function SettingsCard(props) {
    const {settings, updateSettings} = useContext(SettingsContext);

    const [selectedView, setSelectedView] = useState("wide");
      
    const handleViewChange = (view) => {
        setSelectedView(view);
    };

    useEffect(() => {
        // We have to move this out somewhere else, maybe App?
        // Move when we store settings in 
        //  localStorage.setItem('settings', settings)
        document.querySelector('body').
            setAttribute('theme', settings.theme)
    }, [settings]);

    return (
       
            <Modal {...props}
                className="_settings-card" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Inställningar</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Results per page */}
                    <Form.Group className="mb-3">
                        <Form.Label>KORPUS PER SIDA: <span className="settings__description"> antal korpusar som visas per sida</span></Form.Label>
                        <Form.Select 
                            
                            onChange={(e) => {
                                updateSettings({
                                    ...settings,
                                    resultsPerPage: e.target.value
                                })}}
                                value={settings.resultsPerPage} >
                            {[1, 3, 5, 10].map((num) => (
                                <option key={num} value={num}>
                                    {num} {num === 1 ? "Korpus" : "Korpusar"}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    {/* Sample size */}
                    <Form.Group className="mb-3">
                        <Form.Label>PROVSTORLEK: <span className="settings__description"> antal resultat per korpus</span></Form.Label>
                        <div className="d-flex gap-2">
                            {/* <Form.Select defaultValue="Procent">
                                <option>Procent</option>
                                <option>Antal</option>
                            </Form.Select> */}
                            <Form.Control
                                type="number"
                                value={settings.sampleSize}
                                
                                onChange={(e) => updateSettings({...settings, sampleSize : e.target.value})}
                            />
                        </div>
                    </Form.Group>

                    {/* Context size */}
                    <Form.Group className="mb-3">
                        <Form.Label>MENINGSLÄNGD: <span className="settings__description"> antal ord som omger resultatet</span></Form.Label>
                        <Form.Control
                            type="number"
                            value={settings.contextSize}
                            
                            onChange={(e) => updateSettings({...settings, contextSize : e.target.value})}
                        />
                    </Form.Group>

                    {/* Theme selection */}
                    <Form.Group className="mb-3 settings">
                        <Form.Label>TEMA:</Form.Label>
                        <div className="theme-toggle">
                            <button
                                className="light-mode-button"
                                onClick={() => 
                                    updateSettings({
                                        ...settings,
                                        theme: 'light'
                                    })
                                }
                                active={settings.theme === "light" ? "true" : "false"}
                            >
                                <Sun />
                            </button>
                            <button
                                className="dark-mode-button"
                                onClick={() => 
                                    updateSettings({
                                        ...settings,
                                        theme: 'dark'
                                    })
                                }
                                active={settings.theme === "dark" ? "true" : "false"}
                            >
                                <Moon />
                            </button>
                        </div>
                    </Form.Group>

                    {/* View selection */}
                    <Form.Group className="mb-3 d-flex justify-content-around">
                        <Form.Check
                            type="checkbox"
                            label="Wide View"
                            checked={selectedView === "wide"}
                            onChange={() => handleViewChange("wide")
                            }
                        />
                        <Form.Check
                            type="checkbox"
                            label="Grid View"
                            checked={selectedView === "grid"}
                            onChange={() => handleViewChange("grid")
                            }
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>API:</Form.Label>
                        <div className=" d-flex align-items-center justify-content-center">
                            {/* Toggle API, logic in ToggleAPI.jsx */}
                            <ToggleAPI />   
                        </div>
                    </Form.Group>

                </Modal.Body>
                
                {/* Close button */}
                <Modal.Footer className="settingsFooter" onClick={props.onHide}>
                        <Button variant="danger" className="w-50 settingsCloseButton">STÄNG</Button>
                </Modal.Footer>
            </Modal>
    );
}