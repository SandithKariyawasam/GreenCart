import React, { useState } from 'react';
import './support.css';

const Support = () => {
    const [tickets, setTickets] = useState([
        { id: 1, number: '#453', date: '25-09-2021', subject: 'Query about return & exchange', status: 'Pending', isChecked: false },
        { id: 2, number: '#453', date: '20-10-2021', subject: 'Query about return & exchange', status: 'Closed', isChecked: false },
        { id: 3, number: '#456', date: '30-01-2021', subject: 'Query about return & exchange', status: 'Pending', isChecked: false },
        { id: 4, number: '#456', date: '30-01-2021', subject: 'Query about return & exchange', status: 'Pending', isChecked: false },
        { id: 5, number: '#782', date: '02-04-2021', subject: 'Query about return & exchange', status: 'Closed', isChecked: false },
        { id: 6, number: '#214', date: '10-01-2021', subject: 'Query about return & exchange', status: 'Closed', isChecked: false },
        { id: 7, number: '#258', date: '26-07-2021', subject: 'Query about return & exchange', status: 'Pending', isChecked: false },
        { id: 8, number: '#634', date: '30-10-2020', subject: 'Query about return & exchange', status: 'Closed', isChecked: false },
        { id: 9, number: '#124', date: '09-08-2021', subject: 'Query about return & exchange', status: 'Pending', isChecked: false },
    ]);

    const [searchTerm, setSearchTerm] = useState('');

    const filteredTickets = tickets.filter(ticket =>
        ticket.number.includes(searchTerm) ||
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="support-page">
            <div className="page-header">
                <h3>Support Ticket</h3>
            </div>

            <div className="support-container">

                {/* Search Bar */}
                <div className="table-controls">
                    <div className="search-box">
                        <label>Search:</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="table-responsive">
                    <table className="support-table">
                        <thead>
                            <tr>
                                <th style={{ width: '50px' }}>
                                </th>
                                <th>Ticket Number</th>
                                <th>Date</th>
                                <th>Subject</th>
                                <th>Status</th>
                                <th>Options</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTickets.map((ticket) => (
                                <tr key={ticket.id}>
                                    <td>
                                        <input type="checkbox" defaultChecked={ticket.isChecked} />
                                    </td>
                                    <td className="t-number">{ticket.number}</td>
                                    <td className="t-date">{ticket.date}</td>
                                    <td className="t-subject">{ticket.subject}</td>
                                    <td>
                                        <span className={`status-badge ${ticket.status.toLowerCase()}`}>
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="action-icons">
                                            <button className="icon-btn edit"><i className="ri-pencil-line"></i></button>
                                            <button className="icon-btn delete"><i className="ri-delete-bin-line"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredTickets.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center">No tickets found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    )
}

export default Support;