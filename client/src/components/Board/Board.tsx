import styles from './Board.module.sass';

import $api from './../../http/index'

import { useState } from 'react'
import axios from 'axios'


$api.post('/game', {
    rows: 
})

const Board = () => {

    const [rows, setRows] = useState('');
    const [columns, setColumns] = useState('');

    const [statuette, setStatuette] = useState<string>('');

    function trackRows(event: React.ChangeEvent<HTMLInputElement>) {
        setRows(event.target.value);
    }

    function trackColumns(event: React.ChangeEvent<HTMLInputElement>) {
        setColumns(event.target.value);
    }

    function getSells() {
        let intRows = parseInt(rows);
        let intColumns = parseInt(columns);
        let sells;
        return sells = intRows * intColumns;
    }

    function showSells() {

        let sells = getSells()

        if (sells !== 0){
            for(let index = 0; index > sells; index++) {
                return <button onChange={(event) => checkWinPosition(event)} onClick={(event) => setStatuette(event)} value={statuette}></button>
            }
        }
        else {
            return <>Небыло заданно количество строчек или колонок</>
        }
    }

    function checkWinCondition(event: React.ChangeEvent<HTMLInputElement>) {
        checkWinCondition(event.target.value)
    )
    
    return (
        <>
            <input onChange={(event) => trackRows(event)} />
            <input onChange={(event) => trackRows(event)} />
            <button onClick={() => getSells()}></button>

            <div style={{gridTemplateColumns:`repeat(${columns}, 1fr)`}}>
                {showSells()}
            </div>
            
        </>
        
    )
    
}