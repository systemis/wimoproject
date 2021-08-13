import React from 'react';
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { MDBDataTableV5 } from 'mdbreact';
import MaterialTable from 'material-table'
import AppHead from '../components/head';
import Router from 'next/router'

const Dashboard: NextPage = () => {
    const [userData, changeUserData] = React.useState([]);
    async function getData() {
        fetch('http://localhost:3290/api/', {
            method: 'GET', 
            headers: {
                "Access-Control-Allow-Origin": "*", 
                'Content-Type': 'application/json' 
        }})
            .then(response => response.json())
            .then(json => {
                changeUserData(json.data)

        }).catch(error => {
            console.log(error);
        })
    }

    React.useEffect(function() {
        getData();
    })
    return (
        <>
            <AppHead />
            <button style={{marginLeft: 20}} onClick={() => Router.push('/')}>
                <i style={{fontSize: 25}} className="bx bx-plus"></i>
            </button>
            <hgroup>
                <h1>Wimo Dashboard</h1>
            </hgroup>
            <div className='dashboardContainer' style={{
                width: '100%', 
            }}>
                <MaterialTable
                columns={[
                    { title: 'Name', field: 'first_name' },
                    { title: 'Last Name', field: 'last_name' },
                    { title: 'Mobile Phone', field: 'mobile_phone'},
                    { title: 'Email', field: 'email',  }
                ]}
                data={userData}
                title="User Table"
                />
            </div>
            <footer><a href="https://wimoapp.com" target="_blank"><img src="https://wimoapp.com/wp-content/uploads/2020/04/cropped-Group-48.png" /></a>
                <p>You Gotta Love <a href="https://wimoapp.com" target="_blank">Wimo</a></p>
            </footer>
        </>
    );
}

export default Dashboard
