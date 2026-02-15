import React, { useState } from 'react';

export default function ServiceManager({ services, onAddService, onDeleteService }) {
    const [newService, setNewService] = useState({ name: '', price: '', duration: '', category: 'Hair' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newService.name || !newService.price) return;
        onAddService(newService);
        setNewService({ name: '', price: '', duration: '', category: 'Hair' });
    };

    return (
        <div className="service-manager">
            <form onSubmit={handleSubmit} className="add-service-form">
                <h3>Add New Service</h3>
                <div className="form-grid">
                    <input
                        placeholder="Service Name"
                        value={newService.name}
                        onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                        className="form-input"
                    />
                    <input
                        placeholder="Price ($)"
                        type="number"
                        value={newService.price}
                        onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                        className="form-input"
                    />
                    <input
                        placeholder="Duration (min)"
                        type="number"
                        value={newService.duration}
                        onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                        className="form-input"
                    />
                    <select
                        value={newService.category}
                        onChange={(e) => setNewService({ ...newService, category: e.target.value })}
                        className="form-input"
                    >
                        <option value="Hair">Hair</option>
                        <option value="Spa">Spa</option>
                        <option value="Nails">Nails</option>
                        <option value="Makeup">Makeup</option>
                    </select>
                </div>
                <button type="submit" className="btn-add">
                    Add Service
                </button>
            </form>

            <div className="services-grid">
                {services.map((service) => (
                    <div key={service._id} className="service-card">
                        <div className="service-info">
                            <strong>{service.name}</strong>
                            <p>{service.category} • {service.duration} min</p>
                            <span className="price">${service.price}</span>
                        </div>
                        <button
                            onClick={() => onDeleteService(service._id)}
                            className="btn-delete"
                            title="Delete service"
                        >
                            ✕
                        </button>
                    </div>
                ))}
            </div>

            <style jsx>{`
                .add-service-form {
                    margin-bottom: 30px;
                    padding: 20px;
                    background-color: #f9fafb;
                    border-radius: 12px;
                    border: 1px solid var(--border);
                }
                .form-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    gap: 12px;
                    margin-bottom: 15px;
                }
                .form-input {
                    padding: 10px;
                    border-radius: 8px;
                    border: 1px solid var(--border);
                    font-size: 14px;
                }
                .btn-add {
                    width: 100%;
                    padding: 12px;
                    background-color: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 14px;
                    transition: opacity 0.2s;
                }
                .btn-add:hover {
                    opacity: 0.9;
                }
                .services-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                    gap: 20px;
                }
                .service-card {
                    padding: 20px;
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    transition: transform 0.2s, box-shadow 0.2s;
                }
                .service-card:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }
                .service-info p {
                    margin: 5px 0;
                    color: var(--text-muted);
                    font-size: 13px;
                }
                .price {
                    color: #059669;
                    font-weight: 700;
                    font-size: 1.1rem;
                }
                .btn-delete {
                    background: none;
                    border: none;
                    color: #ef4444;
                    cursor: pointer;
                    font-size: 18px;
                    padding: 5px;
                    line-height: 1;
                    opacity: 0.6;
                    transition: opacity 0.2s;
                }
                .btn-delete:hover {
                    opacity: 1;
                }
                @media (max-width: 480px) {
                    .form-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
}
