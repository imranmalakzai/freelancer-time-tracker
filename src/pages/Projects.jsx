import React, { useState, useEffect } from 'react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [projectTag, setProjectTag] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [timers, setTimers] = useState({});
  const [tags, setTags] = useState({});
  const [intervalIds, setIntervalIds] = useState({});

  useEffect(() => {
    const storedProjects = JSON.parse(localStorage.getItem('freelancerProjects')) || [];
    const storedTimers = JSON.parse(localStorage.getItem('freelancerTimers')) || {};
    const storedTags = JSON.parse(localStorage.getItem('freelancerTags')) || {};

    setProjects(storedProjects);
    setTimers(storedTimers);
    setTags(storedTags);
  }, []);

  useEffect(() => {
    localStorage.setItem('freelancerProjects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('freelancerTimers', JSON.stringify(timers));
  }, [timers]);

  useEffect(() => {
    localStorage.setItem('freelancerTags', JSON.stringify(tags));
  }, [tags]);

  const handleAddOrUpdateProject = () => {
    if (projectName.trim() === '') return;

    const updatedTags = { ...tags };
    if (projectTag.trim()) {
      updatedTags[projectName] = projectTag;
      setTags(updatedTags);
    }

    if (editingIndex !== null) {
      const oldName = projects[editingIndex];
      const updated = [...projects];
      updated[editingIndex] = projectName;

      const updatedTimers = { ...timers };
      if (oldName !== projectName) {
        updatedTimers[projectName] = updatedTimers[oldName] || 0;
        delete updatedTimers[oldName];

        updatedTags[projectName] = updatedTags[oldName] || '';
        delete updatedTags[oldName];
      }

      setProjects(updated);
      setTimers(updatedTimers);
      setTags(updatedTags);
      setEditingIndex(null);
    } else {
      setProjects([...projects, projectName]);
    }

    setProjectName('');
    setProjectTag('');
  };

  const handleEdit = (index) => {
    const projName = projects[index];
    setProjectName(projName);
    setProjectTag(tags[projName] || '');
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const projectKey = projects[index];
    const updated = projects.filter((_, i) => i !== index);

    const updatedTimers = { ...timers };
    delete updatedTimers[projectKey];

    const updatedTags = { ...tags };
    delete updatedTags[projectKey];

    setProjects(updated);
    setTimers(updatedTimers);
    setTags(updatedTags);
  };

  const startTimer = (project) => {
    if (intervalIds[project]) return;
    const id = setInterval(() => {
      setTimers((prev) => ({
        ...prev,
        [project]: (prev[project] || 0) + 1,
      }));
    }, 1000);
    setIntervalIds((prev) => ({
      ...prev,
      [project]: id,
    }));
  };

  const pauseTimer = (project) => {
    clearInterval(intervalIds[project]);
    const updated = { ...intervalIds };
    delete updated[project];
    setIntervalIds(updated);
  };

  const resetTimer = (project) => {
    pauseTimer(project);
    setTimers((prev) => ({
      ...prev,
      [project]: 0,
    }));
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs}h ${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 to-white p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-xl p-8">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-indigo-700 tracking-wide select-none">
          🛠️ Project Time Logger
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            className="flex-grow p-3 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-600 transition"
            placeholder="Enter project name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <input
            type="text"
            className="flex-grow p-3 border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-600 transition"
            placeholder="Enter tag (e.g. react, bugfix)"
            value={projectTag}
            onChange={(e) => setProjectTag(e.target.value)}
          />
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleAddOrUpdateProject}
            disabled={!projectName.trim()}
          >
            {editingIndex !== null ? 'Update' : 'Add'}
          </button>
        </div>

        <ul className="space-y-6">
          {projects.map((proj, index) => (
            <li
              key={index}
              className="bg-indigo-50 border border-indigo-200 rounded-lg shadow-inner p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-0"
            >
              <div className="flex-1">
                <p className="font-semibold text-xl text-indigo-900">{proj}</p>
                <p className="text-sm text-indigo-700 mt-1">
                  ⏱️ Time: <span className="font-mono">{formatTime(timers[proj] || 0)}</span>
                </p>
                <p className="text-xs text-indigo-500 mt-1 italic">
                  🏷️ Tags: {(tags[proj] || 'None')}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 justify-end">
                <button
                  onClick={() => startTimer(proj)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
                  aria-label={`Start timer for ${proj}`}
                >
                  Start
                </button>
                <button
                  onClick={() => pauseTimer(proj)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow transition"
                  aria-label={`Pause timer for ${proj}`}
                >
                  Pause
                </button>
                <button
                  onClick={() => resetTimer(proj)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg shadow transition"
                  aria-label={`Reset timer for ${proj}`}
                >
                  Reset
                </button>
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition"
                  aria-label={`Edit project ${proj}`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition"
                  aria-label={`Delete project ${proj}`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
