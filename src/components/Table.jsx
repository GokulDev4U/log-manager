import React, { useRef, useState } from 'react';
import { data } from '../data';
import Modal from './Modal';
import { Link } from 'react-router-dom';

const Table = () => {
    const [log, setLog] = useState(data);
    const [searchValue, setSearchValue] = useState('');
    const [tableFilter, setTableFilter] = useState([]);
    const [dialog, setDialog] = useState({
        message: "",
        isLoading: false,
        nameSite: ""
    });
    const idProductRef = useRef();


    const handleSearch = (e) => {
        if (e.target.value !== "") {
            setSearchValue(e.target.value);
            const filterData = log.filter(o => Object.keys(o).some(k => String(o[k]).toLowerCase().includes(e.target.value.toLowerCase())));
            setTableFilter([...filterData]);
        } else {
            setSearchValue(e.target.value);
            setLog([...log]);
        }
    };

    const handleDialog = (message, isLoading, nameSite) => {
        setDialog({
            message,
            isLoading,
            nameSite
        });
    };

    const handleDelete = (id) => {
        const index = data.findIndex((p) => p.id === id);
        handleDialog("Are you sure you want to delete?", true, data[index].siteName);
        idProductRef.current = id;
    };

    const areUSureDelete = (choose) => {
        if (choose) {
            setLog(log.filter((p) => p.id !== idProductRef.current));
            handleDialog("", false);
        } else {
            handleDialog("", false);
        }
    };

    return (
        <div className="container mt-5">
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search SiteName" aria-label="Username" aria-describedby="basic-addon1"
                    value={searchValue}
                    onChange={handleSearch}
                />
            </div>
            <table className="table table-dark table-striped">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">SiteName</th>
                        <th scope="col">SiteUrl</th>
                        <th scope="col">Event</th>
                    </tr>
                </thead>
                <tbody>
                    {searchValue.length > 0 ? tableFilter.map((data, index) => (
                        <tr key={data.id}>
                            <th scope="row">{data.id}</th>
                            <td>{data.siteName}</td>
                            <td>{data.siteUrl}</td>
                            <td>
                                <Link to="/view" state={data}>
                                    <button type="button" className="btn btn-primary me-2">View</button>
                                </Link>
                                <button type="button" onClick={() => handleDelete(data.id)} className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
                            </td>
                        </tr>
                    ))
                        : log.map((data, index) => (
                            <tr key={data.id}>
                                <th scope="row">{data.id}</th>
                                <td>{data.siteName}</td>
                                <td>{data.siteUrl}</td>
                                <td>
                                    <Link to="/view" state={data}>
                                        <button type="button" className="btn btn-primary me-2">View</button>
                                    </Link>
                                    <button type="button" onClick={() => handleDelete(data.id)} className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {dialog.isLoading && (
                <Modal
                    nameSite={dialog.nameSite}
                    onDialog={areUSureDelete}
                    message={dialog.message}
                />
            )}
        </div>
    );
};

export default Table;