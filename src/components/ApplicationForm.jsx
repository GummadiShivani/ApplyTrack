import { useState } from 'react';
function ApplicationForm({ onAddApplication }) {
    const [companyName, setCompanyName] = useState('');
    const [role, setRole] = useState('');
    const [status, setStatus] = useState('Applied');
    return(
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                const newApplication = {
                    id: Date.now(),
                    companyName, role, status
                }
                onAddApplication(newApplication);
                setCompanyName('');
                setRole('');
                setStatus('Applied');
            }}>
            <input type="text" placeholder="Company Name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Applied">Applied</option>
                <option value="Interviewing">Interviewing</option>
                <option value="Offer Received">Offer Received</option>
                <option value="Rejected">Rejected</option>
            </select>
            <button type="submit">Submit</button>
            </form>
            <div className="form-preview">
                <p>Company Name: {companyName}</p>
                <p>Role: {role}</p>
                <p>Status: {status}</p>
            </div>
        </div>
    )
}
export default ApplicationForm;