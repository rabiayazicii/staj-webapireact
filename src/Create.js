
import React, { useEffect, useState } from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { Form, Button } from 'semantic-ui-react'
import { Link } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


export default function Create() {

    const [values, setValues] = useState({
        tckimlikno: '',
        musteriad: '',
        musterisoyad: '',
        odemE_KD: 0,
        odemE_TTR: 0,
        odemE_TR: moment(Date()).format("YYYY-MM-DDTHH:mm"),
        odemE_ACK: ''
    })

    const navigate = useNavigate();




    const handleDateChange = (e) => {
        const formattedDate = moment().format("DD.MM.YYYY HH:mm");
        setValues(prevValues => ({
            ...prevValues,
            odemE_TR: formattedDate,
        }));
    };



    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post(`https://localhost:7275/api/v1/odemeler/Create`, values)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pb-3 pb-5 rounded'>
                <br></br>
                <br></br>
                <h1>Ödeme Ekle</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Tc Kimlik Numarası: </label>
                        <input type='text' required onChange={e => setValues({ ...values, tckimlikno: e.target.value })} name='tckimlikno' className='form-control' placeholder='Lütfen TC kimlik numarası giriniz...' ></input>

                    </div>
                    <div>
                        <label>Musteri Adı: </label>
                        <input type='text' required onChange={e => setValues({ ...values, musteriad: e.target.value })} name='musteriad' className='form-control' placeholder='Lütfen müşteri adı giriniz...' ></input>

                    </div>
                    <div>
                        <label>Musteri Soyadı: </label>
                        <input type='text' required onChange={e => setValues({ ...values, musterisoyad: e.target.value })} name='musterisoyad' className='form-control' placeholder='Lütfen müşteri adı giriniz...' ></input>

                    </div>
                    <div>
                        <label>Ödeme Kodu:</label>
                        <input type='number' required onChange={e => setValues({ ...values, odemE_KD: e.target.value })} name='odemE_KD' className='form-control' placeholder='Lütfen ödeme kodu giriniz...' ></input>
                    </div>
                    <div>
                        <label>Ödeme Tutarı:</label>
                        <input type='number' required onChange={e => setValues({ ...values, odemE_TTR: e.target.value })} name='odemE_TTR' className='form-control' placeholder='Lütfen ödeme tutarı giriniz...' ></input>

                    </div>
                    <div>
                        <label>Ödeme Tarihi:</label>
                        <input type='datetime-local' disabled value={moment().format("YYYY-MM-DDTHH:mm")}
                            onChange={handleDateChange} name='odemE_TR' className='form-control' placeholder='Lütfen ödeme tarihi giriniz...' ></input>


                    </div>
                    <div>
                        <label>Ödeme Açıklaması:</label>
                        <input type='text' required onChange={e => setValues({ ...values, odemE_ACK: e.target.value })} name='odemE_ACK' className='form-control' placeholder='Lütfen ödeme açıklaması giriniz...' ></input>

                    </div>



                    <button type='submit' className='btn btn-success'>Kaydet</button>
                    <Link to='/' className='btn btn-success'>Back</Link>
                </form>
            </div>
        </div>

    );
}
