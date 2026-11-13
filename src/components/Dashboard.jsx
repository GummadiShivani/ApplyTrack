
import { useState } from 'react';

function Dashboard({ applications, onDeleteApplication, onEditApplication }) {
    const [editingId, setEditingId] = useState(null);
    const [editCompany, setEditCompany] = useState('');
    const [editRole, setEditRole] = useState('');
    const [editStatus, setEditStatus] = useState('Applied');
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    function saveEdit(app) {
        if (!editCompany.trim() || !editRole.trim()) {
            alert('Please fill in all fields.');
            return;
        }

        onEditApplication({
            ...app,
            companyName: editCompany.trim(),
            role: editRole.trim(),
            status: editStatus
        });

        setEditingId(null);
    }

    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <p>Manage your job applications</p>

            <div className="stats">
                <div className="stat-card">
                    <h2>Total Applications</h2>
                    <p>{applications.length}</p>
                </div>

                <div className="stat-card">
                    <h2>Interviews</h2>
                    <p>{applications.filter(app => app.status === 'Interviewing').length}</p>
                </div>

                <div className="stat-card">
                    <h2>Offers</h2>
                    <p>{applications.filter(app => app.status === 'Offer Received').length}</p>
                </div>

                <div className="stat-card">
                    <h2>Rejections</h2>
                    <p>{applications.filter(app => app.status === 'Rejected').length}</p>
                </div>
            </div>

            <h2>My Applications</h2>
            <input type="text" placeholder="Search by company or role" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}>
                                    
                    <option value="All">All Applications</option>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer Received">Offer Received</option>
                    <option value="Rejected">Rejected</option>
            </select>
            {applications.length === 0 ? (
                <p>No applications yet.</p>
            ) : (
                applications.filter((app) => {
                    const matchesSearch = 
                    
                        app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        app.role.toLowerCase().includes(searchTerm.toLowerCase())
                    const matchesFilter = filterStatus === 'All' || app.status === filterStatus;
                    return matchesSearch && matchesFilter;
                }).map((app) => (

                    <div key={app.id} className="stat-card">
                        {editingId === app.id ? (
                            <>
                                <select
                                    value={editStatus}
                                    onChange={(e) => setEditStatus(e.target.value)}>
                                    <option value="Applied">Applied</option>
                                    <option value="Interviewing">Interviewing</option>
                                    <option value="Offer Received">Offer Received</option>
                                    <option value="Rejected">Rejected</option>
                                </select>
                                <input
                                    type="text"
                                    value={editCompany}
                                    onChange={(e) => setEditCompany(e.target.value)}
                                    placeholder="Company Name"
                                />

                                <input
                                    type="text"
                                    value={editRole}
                                    onChange={(e) => setEditRole(e.target.value)}
                                    placeholder="Role"
                                />

                    

                                <button onClick={() => saveEdit(app)}>
                                    Save
                                </button>

                                <button onClick={() => setEditingId(null)}>
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>  
                                <h3>{app.companyName}</h3>
                                <p>Role: {app.role}</p>
                                <p>Status: {app.status}</p>
                                
                                <button onClick={() => {
                                    setEditingId(app.id);
                                    setEditCompany(app.companyName);
                                    setEditRole(app.role);
                                    setEditStatus(app.status);
                                }}>
                                    Edit
                                </button>

                                <button onClick={() => onDeleteApplication(app.id)}>
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}

export default Dashboard;
