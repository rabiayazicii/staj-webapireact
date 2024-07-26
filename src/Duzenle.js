
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';



function Duzenle() {

    const params = useParams();
    const [values, setValues] = useState({
        tckimlikno: '',
        musteriad: '',
        musterisoyad: '',
        odemE_KD: 0,
        odemE_TTR: 0,
        odemE_TR: moment().format("YYYY-MM-DDTHH:mm"),
        odemE_ACK: ''
    })
    useEffect(() => {
        axios.get(`https://localhost:7275/api/v1/odemeler/Sorgula-odemeno?odemeno=${params.odemeno}`)
            .then((res) => {
                setValues(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err)
            });

    }, [])



    const handleDateChange = (e) => {
        const formattedDate = moment().format("DD.MM.YYYY HH:mm");
        setValues(prevValues => ({
            ...prevValues,
            odemE_TR: formattedDate,
        }));
    };
    const handleUpdate = (event) => {
        event.prevtDefault();


    }




    return (
        <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
            <div className='w-50 border bg-white shadow px-5 pb-3 pb-5 rounded'>
                <br></br>
                <br></br>
                <h1>Ödeme Düzenle</h1>



                <form onSubmit={handleUpdate}>
                    <div>
                        <label>Tc Kimlik Numarası: </label>
                        <input type='text' defaultValue={values.tckimlikno} onChange={e => setValues({ ...values, tckimlikno: e.target.value })} required name='tckimlikno' className='form-control' placeholder='Lütfen TC kimlik numarası giriniz...' ></input>

                    </div>
                    <div>
                        <label>Musteri Adı: </label>
                        <input type='text' defaultValue={values.musteriad} onChange={e => setValues({ ...values, musteriad: e.target.value })} required name='musteriad' className='form-control' placeholder='Lütfen müşteri adı giriniz...' ></input>

                    </div>
                    <div>
                        <label>Musteri Soyadı: </label>
                        <input type='text' defaultValue={values.musterisoyad} onChange={e => setValues({ ...values, musterisoyad: e.target.value })} required name='musterisoyad' className='form-control' placeholder='Lütfen müşteri adı giriniz...' ></input>

                    </div>
                    <div>
                        <label>Ödeme Kodu:</label>
                        <input type='number' defaultValue={values.odemE_KD} onChange={e => setValues({ ...values, odemE_KD: e.target.value })} required name='odemE_KD' className='form-control' placeholder='Lütfen ödeme kodu giriniz...' ></input>
                    </div>
                    <div>
                        <label>Ödeme Tutarı:</label>
                        <input type='number' defaultValue={values.odemE_TTR} onChange={e => setValues({ ...values, odeme_TTR: e.target.value })} required name='odemE_TTR' className='form-control' placeholder='Lütfen ödeme tutarı giriniz...' ></input>

                    </div>
                    <div>
                        <label>Ödeme Tarihi:</label>
                        <input type='datetime-local' defaultValue={moment().format("YYYY-MM-DDTHH:mm")}
                            onChange={handleDateChange} name='odemE_TR' className='form-control' placeholder='Lütfen ödeme tarihi giriniz...' ></input>



                    </div>
                    <div>
                        <label>Ödeme Açıklaması:</label>
                        <input type='text' defaultValue={values.odemE_ACK} onChange={e => setValues({ ...values, odemE_ACK: e.target.value })} required name='odemE_ACK' className='form-control' placeholder='Lütfen ödeme açıklaması giriniz...' ></input>

                    </div>



                    <button type='submit' className='btn btn-success'>Kaydet</button>
                    <Link to='/' className='btn btn-success'>Back</Link>
                </form>
            </div>
        </div>

    );
}
export default Duzenle;

