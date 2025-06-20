// components/ToggleAPI/ToggleAPI.jsx
import React, { useContext, useEffect } from "react";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import  CorporaContext  from "../../services/CorporaContext";
import  SettingsContext  from "../../services/SettingsContext"; 
import './ToggleAPI.css';
import { toggleAPI } from "../../services/api.js";
import { getLocalSettings } from "../../services/initialSettings.js";

export default function ToggleAPI() {
  const { corporas, updateCorporas } = useContext(CorporaContext);
  const { settings, updateSettings } = useContext(SettingsContext);

  const handleChange = (value) => {
    toggleAPI(value)
    updateSettings({...settings, api:value})
    corporas.corporas = {'attasidor': '8 Sidor', 'svt-2006': 'SVT Nyheter 2006'}
    updateCorporas({
      ...corporas,
      api: value
    });
    console.log("in toggle",corporas.corporas);
  };

  return (
    <>
      <ToggleButtonGroup
        type="radio"
        name="options"
        defaultValue={settings.api}  
        onChange={handleChange} 
      >
        <ToggleButton className="toggle-button me-2" id="api-toggle-button-1" value={1} >
          Språkbanken API
        </ToggleButton>
          <span className="vr border-start border-1 border-dark rounded-3"></span>
        <ToggleButton className="toggle-button ms-2" id="api-toggle-button-2" value={0}>
          Korpsearch
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
