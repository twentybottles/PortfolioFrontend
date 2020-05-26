import React, { useState } from 'react';
import { withFormik } from 'formik';
import moment from 'moment/moment'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LineChart, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Line } from 'recharts'

const ChartModal = (props) => {

  const {countryCode, countryName, countrySlug, className} = props;

  const [modal, setModal] = useState(false);

  const [item, setItem] = useState({data:[]});

  const searchCountry = () => {

    setModal(!modal);

    fetch('http://localhost:8080/covidSearchCountry?countrySlug=' + countrySlug, {
      method: 'GET',
      mode: 'cors',
      cache: "force-cache",
      headers: {
      "Content-Type": "application/json; charset=utf-8"
      },
    })
    .then(response => response.json())
    .then(json => setItem({data:json}))
    .catch(error => console.error('Error:サーバーが混み合っています', error));

  }

  return (
    <div>
      <span onClick={() => {searchCountry()}} className={"flag-icon-"+countryCode.toLowerCase()+ " flagIcon"}>&nbsp;</span>
      <Modal isOpen={modal} toggle={() => {setModal(!modal)}} className={className}>
        <ModalHeader toggle={() => {setModal(!modal)}}>COVID19 CHART(2020)：{countryName}</ModalHeader>
        <ModalBody>
          <LineChart width={780} height={500} data={item.data} margin={{top:5,right:30,left:5,bottom:5}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Date" angle={30} tickFormatter={(tickItem) => moment(tickItem).format('MM/DD')} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Confirmed" stroke="#8884d8" />
            <Line type="monotone" dataKey="Deaths" stroke="red" />
            <Line type="monotone" dataKey="Recovered" stroke="#82ca9d" />
          </LineChart>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => {setModal(!modal)}}>Close</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

const MyEnhancedForm = withFormik({})(ChartModal);

export default MyEnhancedForm;