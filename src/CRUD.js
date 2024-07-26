import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import moment from 'moment';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


const CRUD = () => {


    const [odemE_KD, setodemE_KD] = useState('');

    const [data, setData] = useState([]);
    const [records, setRecords] = useState(data);
    const navigate = useNavigate();
    const handleClick = async (odemeno, tckn) => {
        console.log('Bağlantıya çift tıklandı.');


        try {

            if (window.confirm("Ödeme İşlemini Onaylıyor Musunuz?")) {
                const response = await axios.post(`https://localhost:7275/api/v1/odemeler/OdemeYap?tckn=${tckn}&odemeno=${odemeno}`);
                if (response.data.success == true) {
                    alert("Başarılı");
                }

                else if (response.data.success == false) {
                    window.alert("Ödeme tarihi gelmemiş veya ödeme yapılmış");

                }


                //confirm ekle
            }
            getData();//tekrar sayfayı yenilememe gerek kalmaması için

        } catch (error) {
            console.log('API Hatası:', error);

        }
    };




    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        axios.get('https://localhost:7275/api/v1/odemeler/Read')
            .then((result) => {
                console.log('API Response:', result.data);
                setData(result.data);
                setRecords(result.data)
                console.log('Data state:', data);

            })
            .catch((error) => {
                console.log('API Error:', error);
            });
    }


    //const Filter = (event) => {
    //  setRecords(data.filter(f => f.tckimlikno.toLowerCase().includes(event.target.value)))
    // }


    const handleDelete = (odemeno) => {
        const confirm = window.confirm("Silmek istediğinize emin misiniz?");
        if (confirm) {
            axios.delete(`https://localhost:7275/api/v1/odemeler/Delete/` + odemeno)
                .then(res => {
                    navigate('/');
                    getData();
                })
                .catch(err => console.log(err));
        }
        getData();
    }


    const [value, setValue] = useState("");
    const handleSearch = (event) => {

        const response = axios.get(`https://localhost:7275/api/v1/odemeler/Sorgula-Sosyal-Odeme?tckn=${value}`)
            .then((response) => {
                setData(response.data);
                setRecords(data.filter(f => f.tckimlikno.toLowerCase().includes(event.target.value)))
                if (data.filter("")) {
                    setData(response.data);
                }
            })
            .catch((err) => console.log(err));
    };
    const handleReset = () => {
        getData();
    }

    return (
        <Fragment>
            <br></br>
            <h2>NYO Sosyal Yardım</h2>
            <br></br>


            <h5>TC Kimlik Numarasına Göre Sorgula</h5>
            <input type="text" className="form-control" placeholder="tckn giriniz..." value={value} onChange={(e) => setValue(e.target.value)}></input>
            <Button onClick={handleSearch}>Sorgula</Button>
            <Button onClick={() => handleReset()}>Reset</Button>


            <br></br><br></br>
            <Link to="/create" className="btn btn-success"  >Ödeme Ekle</Link>


            <br></br><br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>SıraNo</th>
                        <th>ODEMENO</th>
                        <th>TCKIMLIKNO</th>
                        <th>MUSTERIAD</th>
                        <th>MUSTERISOYAD</th>
                        <th>ODEME_KD</th>
                        <th>ODEME_TTR</th>
                        <th>ODEME_TR</th>
                        <th>ODEME_ACK</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data.length > 0 ?
                            records.map((item, index) => {
                                return (
                                    <tr key={index} onDoubleClick={() => handleClick(item.odemeno, item.tckimlikno)}>
                                        <td>{index + 1}</td>

                                        <td>{item.odemeno}</td>
                                        <td>{item.tckimlikno}</td>
                                        <td>{item.musteriad}</td>
                                        <td>{item.musterisoyad}</td>
                                        <td>{item.odemE_KD}</td>
                                        <td>{item.odemE_TTR}</td>
                                        <td>{moment(item.odemE_TR).format("DD.MM.YYYY HH:mm")}</td>
                                        <td>{item.odemE_ACK}</td>
                                        <td colSpan={2}>
                                            <Link to={`/duzenle/${item.odemeno}`} className="btn btn-primary" >Duzenle</Link>&nbsp;
                                            <button className="btn btn-danger" onClick={(e) => handleDelete(item.odemeno)}>Sil</button>
                                        </td>
                                    </tr>
                                );
                            })
                            : <tr><td colSpan="8">Loading...</td></tr>
                    }
                </tbody>
            </Table>

        </Fragment>
    );
}

export default CRUD;
