import "./HelloKorpi.css"

import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

export default function HelloKorpi () {

    function handleClick () {
        console.log('clicked');
    }

    return(
        <div className="hello__korpi">
            <h1>Hello, Korpi!</h1>
            <Link to={"/results"}>
            </Link>
        </div>
    );
}