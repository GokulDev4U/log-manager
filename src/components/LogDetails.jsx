import React from 'react';
import { useLocation } from 'react-router-dom';


const LogDetails = () => {
    const location = useLocation();
    const data = location.state;
    return (
        <div className="container my-5">
            <ul class="list-group">
                <li class="list-group-item">SiteName: {data.siteName}</li>
                <li class="list-group-item">SiteUrl: {data.siteUrl}</li>
                <li class="list-group-item">Email: {data.email}</li>
                <li class="list-group-item">VisitedDate: {data.visitedDate}</li>
                <li class="list-group-item">VisitedTime: {data.visitedTime}</li>
            </ul>
        </div>
    );
};

export default LogDetails;