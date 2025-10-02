import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function CreateRoadmapPage() {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('Beginner');
  const [steps, setSteps] = useState([{ title: '', description: '', resources: [{ name: '', url: '' }] }]);
  
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user === undefined) return;
    if (!user) navigate('/login');
  }, [user, navigate]);

  const handleStepChange = (index, event) => {
    const newSteps = [...steps];
    newSteps[index][event.target.name] = event.target.value;
    setSteps(newSteps);
  };

  const addStep = () => {
    setSteps([...steps, { title: '', description: '', resources: [{ name: '', url: '' }] }]);
  };

  const removeStep = (index) => {
    const newSteps = [...steps];
    newSteps.splice(index, 1);
    setSteps(newSteps);
  };

  const handleResourceChange = (stepIndex, resourceIndex, event) => {
    const newSteps = [...steps];
    newSteps[stepIndex].resources[resourceIndex][event.target.name] = event.target.value;
    setSteps(newSteps);
  };

  const addResource = (stepIndex) => {
    const newSteps = [...steps];
    newSteps[stepIndex].resources.push({ name: '', url: '' });
    setSteps(newSteps);
  };

  const removeResource = (stepIndex, resourceIndex) => {
    const newSteps = [...steps];
    newSteps[stepIndex].resources.splice(resourceIndex, 1);
    setSteps(newSteps);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const newRoadmap = { topic, category, description, difficulty, steps };
      
      await axios.post(`${import.meta.env.VITE_API_URL}/api/roadmaps`, newRoadmap, config);
      
      if (user.isAdmin) {
        navigate('/admin/roadmaps');
      } else {
        navigate('/my-roadmaps');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to create roadmap.');
    }
  };

  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">Create a New Roadmap</h1>
      <form onSubmit={submitHandler} className="space-y-6 bg-white dark:bg-slate-800 p-8 shadow-md rounded-lg">
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Topic</label>
            <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} required className="w-full p-2 border rounded-md bg-gray-50 dark:bg-slate-700"/>
          </div>
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full p-2 border rounded-md bg-gray-50 dark:bg-slate-700"/>
          </div>
          <div>
            <label className="block mb-1 font-medium">Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="w-full p-2 border rounded-md bg-gray-50 dark:bg-slate-700">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 font-medium">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="3" className="w-full p-2 border rounded-md bg-gray-50 dark:bg-slate-700"></textarea>
          </div>
        </div>
        <hr className="border-slate-300 dark:border-slate-600"/>
        <h2 className="text-2xl font-semibold">Steps</h2>
        <div className="space-y-4">
          {steps.map((step, stepIndex) => (
            <div key={stepIndex} className="p-4 border rounded-md bg-slate-50 dark:bg-slate-700 dark:border-slate-600">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold">Step {stepIndex + 1}</h3>
                <button type="button" onClick={() => removeStep(stepIndex)} className="text-red-500 hover:text-red-700 font-bold">Remove</button>
              </div>
              <div className="space-y-2">
                <input type="text" name="title" placeholder="Step Title" value={step.title} onChange={e => handleStepChange(stepIndex, e)} required className="w-full p-2 border rounded-md bg-white dark:bg-slate-600"/>
                <textarea name="description" placeholder="Step Description" value={step.description} onChange={e => handleStepChange(stepIndex, e)} required rows="2" className="w-full p-2 border rounded-md bg-white dark:bg-slate-600"></textarea>
                <h4 className="text-sm font-medium pt-2">Resources:</h4>
                <div className="space-y-2">
                  {step.resources.map((resource, resourceIndex) => (
                    <div key={resourceIndex} className="flex gap-2">
                      <input type="text" name="name" placeholder="Resource Name" value={resource.name} onChange={e => handleResourceChange(stepIndex, resourceIndex, e)} className="w-1/2 p-2 border rounded-md bg-white dark:bg-slate-600"/>
                      <input type="url" name="url" placeholder="https://example.com" value={resource.url} onChange={e => handleResourceChange(stepIndex, resourceIndex, e)} className="w-1/2 p-2 border rounded-md bg-white dark:bg-slate-600"/>
                      <button type="button" onClick={() => removeResource(stepIndex, resourceIndex)} className="text-red-500 p-2">X</button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => addResource(stepIndex)} className="text-sm text-cyan-600 hover:text-cyan-700 mt-2">+ Add Resource</button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addStep} className="w-full border-2 border-dashed border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400 p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700">+ Add Step</button>
        <hr className="border-slate-300 dark:border-slate-600"/>
        <button type="submit" className="w-full bg-cyan-600 text-white p-3 rounded-md hover:bg-cyan-700 font-bold">Save Roadmap</button>
      </form>
    </div>
  );
}
export default CreateRoadmapPage;