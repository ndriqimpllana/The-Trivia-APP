import React, { useState } from 'react';

const Home = ({ onStartQuiz }) => {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        difficulty: '',
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.category || !formData.difficulty) {
            setError('All fields are required. Please fill them out.');
            return;
        }
        setError('');
        onStartQuiz(formData);
    };

    const categories = [
        { value: '9', label: 'General Knowledge' },
        { value: '21', label: 'Sports' },
        { value: '23', label: 'History' },
        { value: '27', label: 'Animals' },
    ];

    const difficulties = ['easy', 'medium', 'hard'];

    return (
        <>
            <main>
                <div className="form-card">
                    <h2>React Quiz Whiz 🧠</h2>
                    <div className="instructions">
                        <p>
                            <strong>Instructions:</strong> Welcome! Please enter your first name and
                            select a quiz category and difficulty. Click "Get Question" to begin.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">First Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            >
                                <option value="">Select a Category</option>
                                {categories.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="difficulty">Difficulty</label>
                            <select
                                id="difficulty"
                                name="difficulty"
                                value={formData.difficulty}
                                onChange={handleChange}
                            >
                                <option value="">Select Difficulty</option>
                                {difficulties.map((level) => (
                                    <option key={level} value={level}>
                                        {level.charAt(0).toUpperCase() + level.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" className="btn">Get Question</button>
                        {error && <p className="error-message">{error}</p>}
                    </form>
                </div>
            </main>
        </>
    );
};

export default Home;