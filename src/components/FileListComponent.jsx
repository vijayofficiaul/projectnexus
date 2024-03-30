import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const FileListComponent = () => {
    const [files, setFiles] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate hook

    useEffect(() => {
        fetchFiles();
        const handleBackButton = () => {
            navigate('/'); // Redirect to home page
        };
        window.addEventListener('popstate', handleBackButton);
        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchFiles = () => {
        axios.get('http://localhost:8080/api/files')
            .then(response => {
                setFiles(response.data);
            })
            .catch(error => {
                console.error('Error fetching files:', error);
                alert('Failed to fetch files. Please try again.');
            });
    };

    const handleDownload = (fileId, fileName) => {
        axios.get(`http://localhost:8080/api/download/${fileId}`, { responseType: 'blob' })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
            .catch(error => {
                console.error('Error downloading file:', error);
                alert('Failed to download file. Please try again.');
            });
    };

    const handleDelete = (fileId) => {
        axios.delete(`http://localhost:8080/api/delete-file/${fileId}`)
            .then(response => {
                alert('File deleted successfully');
                fetchFiles(); // Fetch updated file list after deletion
            })
            .catch(error => {
                console.error('Error deleting file:', error);
                alert('Failed to delete file. Please try again.');
            });
    };

    const handleLogout = () => {
        // Clear any stored credentials
        localStorage.removeItem('isLoggedIn');
        // Logout logic here
        // For now, simply navigate to the home page
        navigate('/');
        // Disable forward and backward browser buttons
        window.history.pushState(null, null, '/');
        window.history.forward();
        window.history.go(-1);
    };

    return (
        <div>
            <h2>Uploaded Files</h2>
            {/* Add logout button */}
            <button onClick={handleLogout}>Logout</button>
            <ul>
                {files.map(file => (
                    <li key={file.id}>
                        <div>
                            <strong>File Name:</strong> {file.fileName}
                        </div>
                        <div>
                            <strong>Project Name:</strong> {file.projectName}
                        </div>
                        <div>
                            <strong>Description:</strong> {file.description}
                        </div>
                        <div>
                            <strong>Requirements:</strong> {file.requirements}
                        </div>
                        <button onClick={() => handleDownload(file.id, file.fileName)}>Download</button>
                        <button onClick={() => handleDelete(file.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileListComponent;
